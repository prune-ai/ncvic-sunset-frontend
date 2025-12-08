import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { FormNavigation } from "../components/layout/FormNavigation";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { RadioOption } from "../components/ui/RadioOption";
import { CheckboxOption } from "../components/ui/CheckboxOption";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useSetHandler } from "../hooks/useSetHandler";

interface StartCasePageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
  initialData?: Record<string, unknown>;
}

export function StartCasePage({
  onBack,
  onNext,
  isLoading = false,
  error,
  initialData,
}: StartCasePageProps) {
  const [over18, setOver18] = useState<string | null>(
    initialData?.over_18 === true ? "yes" : initialData?.over_18 === false ? "no" : null,
  );
  const [ageInContent, setAgeInContent] = useState<string>(
    (initialData?.age_in_content as string) || "",
  );
  const [reportingFor, setReportingFor] = useState<Set<string>>(
    new Set((initialData?.reporting_for as string[]) || []),
  );
  const [sexualContent, setSexualContent] = useState<Set<string>>(
    new Set((initialData?.sexual_content as string[]) || []),
  );
  const [otherSexualHarm, setOtherSexualHarm] = useState<string>(
    (initialData?.other_sexual_harm as string) || "",
  );

  const handleReportingForChange = useSetHandler(reportingFor, setReportingFor);
  const handleSexualContentChange = useSetHandler(
    sexualContent,
    setSexualContent,
  );

  return (
    <FormContainer title="Start your case" currentStep={1} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* Are you over 18? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="Are you over 18?" />
          <ButtonGroup
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            value={over18}
            onChange={setOver18}
          />
        </div>

        {/* How old were you in the images/videos? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="How old were you in the images/videos?" />
          <div className="flex flex-col gap-2 w-full">
            <RadioOption
              label="Under 18"
              value="under18"
              selected={ageInContent === "under18"}
              onChange={setAgeInContent}
              name="ageInContent"
            />
            <RadioOption
              label="18 or over"
              value="over18"
              selected={ageInContent === "over18"}
              onChange={setAgeInContent}
              name="ageInContent"
            />
            <RadioOption
              label="Unsure"
              value="unsure"
              selected={ageInContent === "unsure"}
              onChange={setAgeInContent}
              name="ageInContent"
            />
            <RadioOption
              label="The content is a deepfake of me"
              value="deepfake"
              selected={ageInContent === "deepfake"}
              onChange={setAgeInContent}
              name="ageInContent"
            />
          </div>
        </div>

        {/* Who are you reporting for? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="Who are you reporting for?" />
          <div className="flex flex-col gap-0 w-full">
            <CheckboxOption
              label="I am reporting for myself"
              checked={reportingFor.has("myself")}
              onChange={handleReportingForChange("myself")}
            />
            <CheckboxOption
              label="I am reporting for my child"
              checked={reportingFor.has("child")}
              onChange={handleReportingForChange("child")}
            />
            <CheckboxOption
              label="I am reporting for another minor"
              checked={reportingFor.has("anotherMinor")}
              onChange={handleReportingForChange("anotherMinor")}
            />
            <CheckboxOption
              label="I am reporting for an adult who needs help"
              checked={reportingFor.has("adult")}
              onChange={handleReportingForChange("adult")}
            />
            <CheckboxOption
              label="I am helping someone report but do not want to identify myself"
              checked={reportingFor.has("anonymous")}
              onChange={handleReportingForChange("anonymous")}
            />
          </div>
        </div>

        {/* Is the content sexual or sexualized? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="Is the content sexual or sexualized?" />
          <div className="flex flex-col gap-0 w-full">
            <CheckboxOption
              label="Nude or partially nude images"
              checked={sexualContent.has("nude")}
              onChange={handleSexualContentChange("nude")}
            />
            <CheckboxOption
              label="Sexual acts"
              checked={sexualContent.has("sexualActs")}
              onChange={handleSexualContentChange("sexualActs")}
            />
            <CheckboxOption
              label="Hidden camera, spyware"
              checked={sexualContent.has("hiddenCamera")}
              onChange={handleSexualContentChange("hiddenCamera")}
            />
            <CheckboxOption
              label="Sexualized deepfake or AI-generated image"
              checked={sexualContent.has("deepfake")}
              onChange={handleSexualContentChange("deepfake")}
            />
            <CheckboxOption
              label="Blackmail / extortion (sextortion)"
              checked={sexualContent.has("blackmail")}
              onChange={handleSexualContentChange("blackmail")}
            />
            <CheckboxOption
              label="Other sexual harm"
              checked={sexualContent.has("other")}
              onChange={handleSexualContentChange("other")}
              showInput={true}
              inputValue={otherSexualHarm}
              onInputChange={setOtherSexualHarm}
              inputPosition="below"
            />
            <CheckboxOption
              label="None of the above"
              checked={sexualContent.has("none")}
              onChange={handleSexualContentChange("none")}
            />
          </div>
        </div>
      </div>

      <ErrorMessage message={error} />

      <FormNavigation
        onBack={onBack}
        onNext={() => {
          onNext({
            over_18: over18 === "yes" ? true : over18 === "no" ? false : null,
            age_in_content: ageInContent,
            reporting_for: Array.from(reportingFor),
            sexual_content: Array.from(sexualContent),
            other_sexual_harm: otherSexualHarm || null,
          });
        }}
        isLoading={isLoading}
        disabled={
          !ageInContent ||
          reportingFor.size === 0 ||
          sexualContent.size === 0
        }
      />
    </FormContainer>
  );
}
