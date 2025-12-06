import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { Button } from "../components/ui/Button";

interface WhatHappenedPageProps {
  onBack: () => void;
  onNext: () => void;
}

const CheckIcon = () => (
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
);

export function WhatHappenedPage({ onBack, onNext }: WhatHappenedPageProps) {
  const [whatHappened, setWhatHappened] = useState<Set<string>>(new Set());
  const [knowsWhoPosted, setKnowsWhoPosted] = useState<string | null>(null);
  const [whoPosted, setWhoPosted] = useState<Set<string>>(new Set());

  const handleWhatHappenedChange = (value: string) => {
    const newSet = new Set(whatHappened);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
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
      <div className="flex flex-col gap-[20px] w-full">
        {/* What happened? */}
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            What happened?
          </h2>
          <div className="flex flex-col gap-0 w-full">
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("postedWithoutConsent")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("postedWithoutConsent")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("postedWithoutConsent")}
                role="checkbox"
              >
                {whatHappened.has("postedWithoutConsent") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Images/videos posted without consent
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("threatsExtortion")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("threatsExtortion")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("threatsExtortion")}
                role="checkbox"
              >
                {whatHappened.has("threatsExtortion") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Threats/extortion (sextortion)
              </span>
            </div>
            <div className="bg-gray-900/20 flex items-center gap-2 px-4 py-3 rounded-lg w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("coercionGrooming")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("coercionGrooming")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("coercionGrooming")}
                role="checkbox"
              >
                {whatHappened.has("coercionGrooming") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Coercion, grooming, blackmail
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("hiddenCamera")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("hiddenCamera")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("hiddenCamera")}
                role="checkbox"
              >
                {whatHappened.has("hiddenCamera") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Hidden camera, spyware
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("revengeAbuse")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("revengeAbuse")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("revengeAbuse")}
                role="checkbox"
              >
                {whatHappened.has("revengeAbuse") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Revenge abuse by partner/ex
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("sexTrafficking")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("sexTrafficking")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("sexTrafficking")}
                role="checkbox"
              >
                {whatHappened.has("sexTrafficking") && <CheckIcon />}
              </button>
              <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                Sex trafficking
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("hackedStolen")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("hackedStolen")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("hackedStolen")}
                role="checkbox"
              >
                {whatHappened.has("hackedStolen") && <CheckIcon />}
              </button>
              <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                Hacked or stolen images
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("deepfakeAbuse")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("deepfakeAbuse")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("deepfakeAbuse")}
                role="checkbox"
              >
                {whatHappened.has("deepfakeAbuse") && <CheckIcon />}
              </button>
              <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                Deepfake abuse
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("federalCase")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("federalCase")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("federalCase")}
                role="checkbox"
              >
                {whatHappened.has("federalCase") && <CheckIcon />}
              </button>
              <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                Known federal case: Please describe briefly (text)
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleWhatHappenedChange("other")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  whatHappened.has("other")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={whatHappened.has("other")}
                role="checkbox"
              >
                {whatHappened.has("other") && <CheckIcon />}
              </button>
              <span className="flex-1 text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
                Other: Type text
              </span>
            </div>
          </div>
        </div>

        {/* Do you know who posted or shared the content? */}
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25]">
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("exPartner")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("exPartner")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("currentPartner")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("currentPartner")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("familyMember")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("familyMember")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("friendAcquaintance")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("friendAcquaintance")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("professionalColleague")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("professionalColleague")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("stranger")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("coercedThreatened")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("coercedThreatened")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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
              <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => handleWhoPostedChange("notSure")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                    whoPosted.has("notSure")
                      ? "bg-[#b894ee]"
                      : "bg-transparent border-[1.3px] border-white rounded-md"
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

      {/* Navigation buttons */}
      <div className="flex items-center justify-between w-full">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </FormContainer>
  );
}
