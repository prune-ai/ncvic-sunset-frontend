import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { FormNavigation } from "../components/layout/FormNavigation";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { CheckboxOption } from "../components/ui/CheckboxOption";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useSetHandler } from "../hooks/useSetHandler";

interface WhatHappenedPageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
  initialData?: Record<string, unknown>;
}

export function WhatHappenedPage({
  onBack,
  onNext,
  isLoading = false,
  error,
  initialData,
}: WhatHappenedPageProps) {
  const [whatHappened, setWhatHappened] = useState<Set<string>>(
    new Set((initialData?.what_happened as string[]) || []),
  );
  const [federalCaseDescription, setFederalCaseDescription] = useState<string>(
    (initialData?.federal_case_description as string) || "",
  );
  const [otherWhatHappened, setOtherWhatHappened] = useState<string>(
    (initialData?.other_what_happened as string) || "",
  );
  const [knowsWhoPosted, setKnowsWhoPosted] = useState<string | null>(
    (initialData?.knows_who_posted as string) || null,
  );
  const [whoPosted, setWhoPosted] = useState<Set<string>>(
    new Set((initialData?.who_posted as string[]) || []),
  );

  const handleWhatHappenedChange = useSetHandler(
    whatHappened,
    setWhatHappened,
  );
  const handleWhoPostedChange = useSetHandler(whoPosted, setWhoPosted);

  return (
    <FormContainer title="Start your case" currentStep={2} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* What happened? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="What happened?" />
          <div className="flex flex-col gap-0 w-full">
            <CheckboxOption
              label="Images/videos posted without consent"
              checked={whatHappened.has("postedWithoutConsent")}
              onChange={handleWhatHappenedChange("postedWithoutConsent")}
            />
            <CheckboxOption
              label="Threats/extortion (sextortion)"
              checked={whatHappened.has("threatsExtortion")}
              onChange={handleWhatHappenedChange("threatsExtortion")}
            />
            <CheckboxOption
              label="Coercion, grooming, blackmail"
              checked={whatHappened.has("coercionGrooming")}
              onChange={handleWhatHappenedChange("coercionGrooming")}
            />
            <CheckboxOption
              label="Hidden camera, spyware"
              checked={whatHappened.has("hiddenCamera")}
              onChange={handleWhatHappenedChange("hiddenCamera")}
            />
            <CheckboxOption
              label="Revenge abuse by partner/ex"
              checked={whatHappened.has("revengeAbuse")}
              onChange={handleWhatHappenedChange("revengeAbuse")}
            />
            <CheckboxOption
              label="Sex trafficking"
              checked={whatHappened.has("sexTrafficking")}
              onChange={handleWhatHappenedChange("sexTrafficking")}
            />
            <CheckboxOption
              label="Hacked or stolen images"
              checked={whatHappened.has("hackedStolen")}
              onChange={handleWhatHappenedChange("hackedStolen")}
            />
            <CheckboxOption
              label="Deepfake abuse"
              checked={whatHappened.has("deepfakeAbuse")}
              onChange={handleWhatHappenedChange("deepfakeAbuse")}
            />
            <CheckboxOption
              label="Known federal case"
              checked={whatHappened.has("federalCase")}
              onChange={handleWhatHappenedChange("federalCase")}
              showInput={true}
              inputValue={federalCaseDescription}
              onInputChange={setFederalCaseDescription}
              inputPosition="below"
            />
            <CheckboxOption
              label="Other"
              checked={whatHappened.has("other")}
              onChange={handleWhatHappenedChange("other")}
              showInput={true}
              inputValue={otherWhatHappened}
              onInputChange={setOtherWhatHappened}
              inputPosition="below"
            />
          </div>
        </div>

        {/* Do you know who posted or shared the content? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="Do you know who posted or shared the content?" />
          <ButtonGroup
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "notSure", label: "I'm not sure" },
            ]}
            value={knowsWhoPosted}
            onChange={setKnowsWhoPosted}
          />

          {/* Conditional checkboxes if Yes is selected */}
          {knowsWhoPosted === "yes" && (
            <div className="flex flex-col gap-0 w-full mt-4">
              <CheckboxOption
                label="Ex-partner"
                checked={whoPosted.has("exPartner")}
                onChange={handleWhoPostedChange("exPartner")}
              />
              <CheckboxOption
                label="Current partner"
                checked={whoPosted.has("currentPartner")}
                onChange={handleWhoPostedChange("currentPartner")}
              />
              <CheckboxOption
                label="Family member"
                checked={whoPosted.has("familyMember")}
                onChange={handleWhoPostedChange("familyMember")}
              />
              <CheckboxOption
                label="Friend or acquaintance"
                checked={whoPosted.has("friendAcquaintance")}
                onChange={handleWhoPostedChange("friendAcquaintance")}
              />
              <CheckboxOption
                label="Professional colleague or connection"
                checked={whoPosted.has("professionalColleague")}
                onChange={handleWhoPostedChange("professionalColleague")}
              />
              <CheckboxOption
                label="Stranger / someone online"
                checked={whoPosted.has("stranger")}
                onChange={handleWhoPostedChange("stranger")}
              />
              <CheckboxOption
                label="Someone who coerced or threatened me"
                checked={whoPosted.has("coercedThreatened")}
                onChange={handleWhoPostedChange("coercedThreatened")}
              />
              <CheckboxOption
                label="I'm not sure / prefer not to say"
                checked={whoPosted.has("notSure")}
                onChange={handleWhoPostedChange("notSure")}
              />
            </div>
          )}
        </div>
      </div>

      <ErrorMessage message={error} />

      <FormNavigation
        onBack={onBack}
        onNext={() => {
          onNext({
            what_happened: Array.from(whatHappened),
            federal_case_description: federalCaseDescription || null,
            other_what_happened: otherWhatHappened || null,
            knows_who_posted: knowsWhoPosted,
            who_posted:
              knowsWhoPosted === "yes" ? Array.from(whoPosted) : null,
          });
        }}
        isLoading={isLoading}
        disabled={whatHappened.size === 0 || !knowsWhoPosted}
      />
    </FormContainer>
  );
}
