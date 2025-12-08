import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { Button } from "../components/ui/Button";

interface ConsentsPageProps {
  onBack: () => void;
  onSubmit: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
}

export function ConsentsPage({
  onBack,
  onSubmit,
  isLoading = false,
  error,
}: ConsentsPageProps) {
  const [consents, setConsents] = useState({
    accurateInfo: false,
    hashingAnalysis: false,
    takedownRequests: false,
  });

  const allConsentsChecked =
    consents.accurateInfo &&
    consents.hashingAnalysis &&
    consents.takedownRequests;

  const handleSubmit = () => {
    if (allConsentsChecked) {
      onSubmit({
        consents: {
          accurate_info: consents.accurateInfo,
          hashing_analysis: consents.hashingAnalysis,
          takedown_requests: consents.takedownRequests,
        },
      });
    }
  };

  return (
    <FormContainer title="Start your case" currentStep={5} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* Consents section */}
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25]">
            Consents
          </h2>
          <p className="text-white/80 text-xs font-normal leading-[1.25]">
            Please review and confirm the permissions we need to begin helping
            you.
          </p>
        </div>

        {/* Required to begin */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-white text-sm font-semibold leading-[1.25]">
            Required to begin
          </h3>
          <div className="flex flex-col gap-2 w-full">
            <div className="border border-transparent hover:border-white/20 flex gap-2 items-start px-4 py-3 rounded-2xl w-full transition-colors">
              <button
                type="button"
                onClick={() =>
                  setConsents((prev) => ({
                    ...prev,
                    accurateInfo: !prev.accurateInfo,
                  }))
                }
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
                  consents.accurateInfo
                    ? "bg-[#b894ee]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-checked={consents.accurateInfo}
                role="checkbox"
              >
                {consents.accurateInfo && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                I confirm the information I provided is accurate and authorize
                NCVIC to review it to create and support my case.
              </span>
            </div>
            <div className="border border-transparent hover:border-white/20 flex gap-2 items-start px-4 py-3 rounded-2xl w-full transition-colors">
              <button
                type="button"
                onClick={() =>
                  setConsents((prev) => ({
                    ...prev,
                    hashingAnalysis: !prev.hashingAnalysis,
                  }))
                }
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
                  consents.hashingAnalysis
                    ? "bg-[#b894ee]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-checked={consents.hashingAnalysis}
                role="checkbox"
              >
                {consents.hashingAnalysis && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1 flex flex-col gap-2.5">
                <span className="text-sm font-semibold leading-[1.25] text-white whitespace-pre-wrap">
                  I consent to NCVIC hashing and securely analyzing my uploads
                  to search for matching content.
                </span>
                <span className="text-xs font-normal leading-[1.25] text-white/80 whitespace-pre-wrap">
                  Hashing lets us identify exact copies of your images without
                  storing them openly.
                </span>
              </div>
            </div>
            <div className="border border-transparent hover:border-white/20 flex gap-2 items-start px-4 py-3 rounded-2xl w-full transition-colors">
              <button
                type="button"
                onClick={() =>
                  setConsents((prev) => ({
                    ...prev,
                    takedownRequests: !prev.takedownRequests,
                  }))
                }
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
                  consents.takedownRequests
                    ? "bg-[#b894ee]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-checked={consents.takedownRequests}
                role="checkbox"
              >
                {consents.takedownRequests && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1 flex flex-col gap-2.5">
                <span className="text-sm font-semibold leading-[1.25] text-white whitespace-pre-wrap">
                  I authorize NCVIC to send takedown requests on my behalf.
                </span>
                <span className="text-xs font-normal leading-[1.25] text-white/80 whitespace-pre-wrap">
                  This allows us to contact websites, hosts, and registrars to
                  request removal.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="text-white/80 text-xs font-normal leading-[1.25] w-full whitespace-pre-wrap">
        <p className="mb-0">
          By submitting, you agree your consent is recorded with a timestamp
        </p>
        <p>
          and IP address. You may revoke consent at any time by emailing{" "}
          <a
            href="mailto:help@ncvic.org"
            className="text-[#8be784] underline cursor-pointer hover:opacity-80 transition-opacity"
          >
            help@ncvic.org
          </a>
        </p>
      </div>

      {/* Error message */}
      {error && <div className="text-red-400 text-sm mt-4">{error}</div>}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-2 w-full mt-4">
        <Button
          onClick={onBack}
          className="flex-1 lg:flex-none"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          variant="primary"
          disabled={!allConsentsChecked || isLoading}
          className="flex-1 lg:flex-none"
        >
          {isLoading ? "Submitting..." : "Submit & Create Case"}
        </Button>
      </div>
    </FormContainer>
  );
}
