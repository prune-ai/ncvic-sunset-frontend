import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { Button } from "../components/ui/Button";
import { CheckboxOption } from "../components/ui/CheckboxOption";

interface WhatHappenedPageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
}

export function WhatHappenedPage({
  onBack,
  onNext,
  isLoading = false,
  error,
}: WhatHappenedPageProps) {
  const [whatHappened, setWhatHappened] = useState<Set<string>>(new Set());
  const [knowsWhoPosted, setKnowsWhoPosted] = useState<string | null>(null);
  const [whoPosted, setWhoPosted] = useState<Set<string>>(new Set());

  const handleWhatHappenedChange = (value: string) => (checked: boolean) => {
    const newSet = new Set(whatHappened);
    if (checked) {
      newSet.add(value);
    } else {
      newSet.delete(value);
    }
    setWhatHappened(newSet);
  };

  const handleWhoPostedChange = (value: string) => {
    const newSet = new Set(whoPosted);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setWhoPosted(newSet);
  };

  return (
    <FormContainer title="Start your case" currentStep={2} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* What happened? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            What happened?
          </h2>
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
              label="Known federal case: Please describe briefly (text)"
              checked={whatHappened.has("federalCase")}
              onChange={handleWhatHappenedChange("federalCase")}
            />
            <CheckboxOption
              label="Other: Type text"
              checked={whatHappened.has("other")}
              onChange={handleWhatHappenedChange("other")}
            />
          </div>
        </div>

        {/* Do you know who posted or shared the content? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25]">
            Do you know who posted or shared the content?
          </h2>
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
              <div
                onClick={() => handleWhoPostedChange("exPartner")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("exPartner");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("exPartner") ? "bg-[#b894ee]" : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("exPartner")}
                  role="checkbox"
                >
                  {whoPosted.has("exPartner") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Ex-partner
                </span>
              </div>
              <div
                onClick={() => handleWhoPostedChange("currentPartner")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("currentPartner");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("currentPartner")
                      ? "bg-[#b894ee]"
                      : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("currentPartner")}
                  role="checkbox"
                >
                  {whoPosted.has("currentPartner") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Current partner
                </span>
              </div>
              <div
                onClick={() => handleWhoPostedChange("familyMember")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("familyMember");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("familyMember")
                      ? "bg-[#b894ee]"
                      : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("familyMember")}
                  role="checkbox"
                >
                  {whoPosted.has("familyMember") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Family member
                </span>
              </div>
              <div
                onClick={() => handleWhoPostedChange("friendAcquaintance")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("friendAcquaintance");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("friendAcquaintance")
                      ? "bg-[#b894ee]"
                      : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("friendAcquaintance")}
                  role="checkbox"
                >
                  {whoPosted.has("friendAcquaintance") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Friend or acquaintance
                </span>
              </div>
              <div
                onClick={() => handleWhoPostedChange("professionalColleague")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("professionalColleague");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("professionalColleague")
                      ? "bg-[#b894ee]"
                      : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("professionalColleague")}
                  role="checkbox"
                >
                  {whoPosted.has("professionalColleague") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Professional colleague or connection
                </span>
              </div>
              <div className="bg-gray-900/20 flex items-center gap-2 px-4 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("stranger")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
                    whoPosted.has("stranger")
                      ? "bg-[#b894ee]"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  aria-checked={whoPosted.has("stranger")}
                  role="checkbox"
                >
                  {whoPosted.has("stranger") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Stranger / someone online
                </span>
              </div>
              <div
                onClick={() => handleWhoPostedChange("coercedThreatened")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("coercedThreatened");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("coercedThreatened")
                      ? "bg-[#b894ee]"
                      : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("coercedThreatened")}
                  role="checkbox"
                >
                  {whoPosted.has("coercedThreatened") && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  Someone who coerced or threatened me
                </span>
              </div>
              <div
                onClick={() => handleWhoPostedChange("notSure")}
                className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhoPostedChange("notSure");
                  }}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                    whoPosted.has("notSure") ? "bg-[#b894ee]" : "bg-white/10"
                  }`}
                  aria-checked={whoPosted.has("notSure")}
                  role="checkbox"
                >
                  {whoPosted.has("notSure") && <CheckIcon />}
                </button>
                <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                  I'm not sure / prefer not to say
                </span>
              </div>
            </div>
          )}
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
              what_happened: Array.from(whatHappened),
              knows_who_posted: knowsWhoPosted,
              who_posted:
                knowsWhoPosted === "yes" ? Array.from(whoPosted) : null,
            });
          }}
          className="flex-1 lg:flex-none"
          disabled={isLoading || whatHappened.size === 0 || !knowsWhoPosted}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </FormContainer>
  );
}
