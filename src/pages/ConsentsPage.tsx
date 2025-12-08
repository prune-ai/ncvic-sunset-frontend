import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { FormNavigation } from "../components/layout/FormNavigation";
import { CheckboxOption } from "../components/ui/CheckboxOption";
import { CheckboxWithDescription } from "../components/ui/CheckboxWithDescription";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { SectionHeader } from "../components/ui/SectionHeader";

interface ConsentsPageProps {
  onBack: () => void;
  onSubmit: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
  initialData?: Record<string, unknown>;
}

export function ConsentsPage({
  onBack,
  onSubmit,
  isLoading = false,
  error,
  initialData,
}: ConsentsPageProps) {
  const savedConsents = (initialData?.consents as {
    accurate_info?: boolean;
    hashing_analysis?: boolean;
    takedown_requests?: boolean;
  }) || {};
  const [consents, setConsents] = useState({
    accurateInfo: savedConsents.accurate_info || false,
    hashingAnalysis: savedConsents.hashing_analysis || false,
    takedownRequests: savedConsents.takedown_requests || false,
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
        <SectionHeader
          title="Consents"
          description="Please review and confirm the permissions we need to begin helping you."
        />

        {/* Required to begin */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-white text-sm font-semibold leading-[1.25]">
            Required to begin
          </h3>
          <div className="flex flex-col gap-2 w-full">
            <CheckboxOption
              label="I confirm the information I provided is accurate and authorize NCVIC to review it to create and support my case."
              checked={consents.accurateInfo}
              onChange={(checked) =>
                setConsents((prev) => ({ ...prev, accurateInfo: checked }))
              }
            />
            <CheckboxWithDescription
              title="I consent to NCVIC hashing and securely analyzing my uploads to search for matching content."
              description="Hashing lets us identify exact copies of your images without storing them openly."
              checked={consents.hashingAnalysis}
              onChange={(checked) =>
                setConsents((prev) => ({ ...prev, hashingAnalysis: checked }))
              }
            />
            <CheckboxWithDescription
              title="I authorize NCVIC to send takedown requests on my behalf."
              description="This allows us to contact websites, hosts, and registrars to request removal."
              checked={consents.takedownRequests}
              onChange={(checked) =>
                setConsents((prev) => ({
                  ...prev,
                  takedownRequests: checked,
                }))
              }
            />
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

      <ErrorMessage message={error} />

      <FormNavigation
        onBack={onBack}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        disabled={!allConsentsChecked}
      />
    </FormContainer>
  );
}
