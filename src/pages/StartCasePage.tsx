import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { RadioOption } from "../components/ui/RadioOption";
import { Button } from "../components/ui/Button";
import { CheckboxOption } from "../components/ui/CheckboxOption";

interface StartCasePageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
}

export function StartCasePage({
  onBack,
  onNext,
  isLoading = false,
  error,
}: StartCasePageProps) {
  const [over18, setOver18] = useState<string | null>(null);
  const [ageInContent, setAgeInContent] = useState<string>("");
  const [reportingFor, setReportingFor] = useState<Set<string>>(new Set());
  const [sexualContent, setSexualContent] = useState<Set<string>>(new Set());
  const [otherSexualHarm, setOtherSexualHarm] = useState<string>("");

  const handleReportingForChange = (value: string) => (checked: boolean) => {
    const newSet = new Set(reportingFor);
    if (checked) {
      newSet.add(value);
    } else {
      newSet.delete(value);
    }
    setReportingFor(newSet);
  };

  const handleSexualContentChange = (value: string) => (checked: boolean) => {
    const newSet = new Set(sexualContent);
    if (checked) {
      newSet.add(value);
    } else {
      newSet.delete(value);
    }
    setSexualContent(newSet);
  };

  return (
    <FormContainer title="Start your case" currentStep={1} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* Are you over 18? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25]">
            Are you over 18?
          </h2>
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
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25]">
            How old were you in the images/videos?
          </h2>
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
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            Who are you reporting for?
          </h2>
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
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            Is the content sexual or sexualized?
          </h2>
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
          onClick={() => {
            onNext({
              over_18: over18 === "yes" ? true : over18 === "no" ? false : null,
              age_in_content: ageInContent,
              reporting_for: reportingFor,
              sexual_content: sexualContent,
              other_sexual_harm: otherSexualHarm || null,
            });
          }}
          className="flex-1 lg:flex-none"
          disabled={
            isLoading ||
            !ageInContent ||
            reportingFor.size === 0 ||
            sexualContent.size === 0
          }
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </FormContainer>
  );
}
