/**
 * API client for NCVIC Sunset Backend
 */

// Use environment variable if set, otherwise default to production
const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "https://nc-aa1a0762ed8b46afb47bd598909d279e.ecs.us-west-2.on.aws";

export interface ApiError {
  detail: string;
}

export class ApiClientError extends Error {
  status: number;
  detail?: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.detail = detail;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorDetail: string;
    try {
      const errorData = (await response.json()) as ApiError;
      errorDetail =
        errorData.detail || (errorData as { message?: string }).message || response.statusText;
    } catch {
      errorDetail = response.statusText;
    }
    throw new ApiClientError(
      `API request failed: ${errorDetail}`,
      response.status,
      errorDetail
    );
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export interface StartIntakeRequest {
  over_18: boolean | null;
  age_in_content: string;
  reporting_for: string[];
  sexual_content: string[];
  other_sexual_harm?: string | null;
}

export interface IntakeFormResponse {
  id: string;
  survivor_id: string;
  form_status: string;
  created_at: string;
  updated_at: string;
}

export interface SubmitIntakeResponse {
  case_id: string;
  case_number: string;
  survivor_id: string;
}

export interface EvidenceResponse {
  id: string;
  intake_form_id: string;
  evidence_type: string;
  action_type: string;
  file_path: string | null;
  file_name: string | null;
  url: string | null;
  text_content: string | null;
  thumbnail_path: string | null;
  created_at: string;
}

export const api = {
  /**
   * Start a new intake form (Page 1)
   */
  async startIntake(data: StartIntakeRequest): Promise<IntakeFormResponse> {
    const response = await fetch(`${API_BASE_URL}/api/intake/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse<IntakeFormResponse>(response);
  },

  /**
   * Save page data (Pages 1-5)
   */
  async savePage(
    formId: string,
    pageNumber: number,
    pageData: Record<string, unknown>
  ): Promise<IntakeFormResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/intake/${formId}/page/${pageNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_number: pageNumber,
          page_data: pageData,
        }),
      }
    );

    return handleResponse<IntakeFormResponse>(response);
  },

  /**
   * Get intake form by ID
   */
  async getIntakeForm(formId: string): Promise<IntakeFormResponse> {
    const response = await fetch(`${API_BASE_URL}/api/intake/${formId}`);

    return handleResponse<IntakeFormResponse>(response);
  },

  /**
   * Submit complete intake form
   */
  async submitIntake(formId: string): Promise<SubmitIntakeResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/intake/${formId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse<SubmitIntakeResponse>(response);
  },

  /**
   * Upload a file as evidence
   */
  async uploadEvidenceFile(
    formId: string,
    file: File,
    actionType: "remove" | "search"
  ): Promise<EvidenceResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("action_type", actionType);

    const response = await fetch(
      `${API_BASE_URL}/api/intake/${formId}/evidence/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    return handleResponse<EvidenceResponse>(response);
  },

  /**
   * Create URL evidence
   */
  async createUrlEvidence(
    formId: string,
    urls: string[],
    actionType: "remove" | "search" = "remove"
  ): Promise<EvidenceResponse[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/intake/${formId}/evidence/urls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls,
          action_type: actionType,
        }),
      }
    );

    return handleResponse<EvidenceResponse[]>(response);
  },

  /**
   * Create text/keyword evidence
   */
  async createTextEvidence(
    formId: string,
    keywords: string[],
    actionType: "remove" | "search" = "search"
  ): Promise<EvidenceResponse[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/intake/${formId}/evidence/text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords,
          action_type: actionType,
        }),
      }
    );

    return handleResponse<EvidenceResponse[]>(response);
  },
};
