import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { RadioOption } from "../components/ui/RadioOption";
import { CheckboxOption } from "../components/ui/CheckboxOption";
import { Button } from "../components/ui/Button";

interface StartCasePageProps {
  onBack: () => void;
  onNext: () => void;
}

export function StartCasePage({ onBack, onNext }: StartCasePageProps) {
  const [over18, setOver18] = useState<string | null>(null);
  const [ageInContent, setAgeInContent] = useState<string>("");
  const [reportingFor, setReportingFor] = useState<Set<string>>(new Set());
  const [sexualContent, setSexualContent] = useState<Set<string>>(new Set());
  const [otherSexualHarm, setOtherSexualHarm] = useState<string>("");

  const handleReportingForChange = (value: string) => {
    const newSet = new Set(reportingFor);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setReportingFor(newSet);
  };

  const handleSexualContentChange = (value: string) => {
    const newSet = new Set(sexualContent);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setSexualContent(newSet);
  };

  return (
    <FormContainer title="Start your case" currentStep={1} totalSteps={5}>
      <div className="flex flex-col gap-[20px] w-full">
        {/* Are you over 18? */}
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25]">
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
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25]">
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
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            Who are you reporting for?
          </h2>
          <div className="flex flex-col gap-0 w-full">
            <div className="bg-gray-900/20 flex items-center gap-2 px-4 py-3 rounded-lg w-full">
              <button
                type="button"
                onClick={() => handleReportingForChange("myself")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  reportingFor.has("myself")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={reportingFor.has("myself")}
                role="checkbox"
              >
                {reportingFor.has("myself") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                I am reporting for myself
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleReportingForChange("child")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  reportingFor.has("child")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={reportingFor.has("child")}
                role="checkbox"
              >
                {reportingFor.has("child") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                I am reporting for my child
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleReportingForChange("anotherMinor")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  reportingFor.has("anotherMinor")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={reportingFor.has("anotherMinor")}
                role="checkbox"
              >
                {reportingFor.has("anotherMinor") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                I am reporting for another minor
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleReportingForChange("adult")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  reportingFor.has("adult")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={reportingFor.has("adult")}
                role="checkbox"
              >
                {reportingFor.has("adult") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                I am reporting for an adult who needs help
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleReportingForChange("anonymous")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  reportingFor.has("anonymous")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={reportingFor.has("anonymous")}
                role="checkbox"
              >
                {reportingFor.has("anonymous") && (
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
                I am helping someone report but do not want to identify myself
              </span>
            </div>
          </div>
        </div>

        {/* Is the content sexual or sexualized? */}
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            Is the content sexual or sexualized?
          </h2>
          <div className="flex flex-col gap-0 w-full">
            <div className="bg-gray-900/20 flex items-center gap-2 px-4 py-3 rounded-lg w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("nude")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("nude")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("nude")}
                role="checkbox"
              >
                {sexualContent.has("nude") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                Nude or partially nude images
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("sexualActs")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("sexualActs")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("sexualActs")}
                role="checkbox"
              >
                {sexualContent.has("sexualActs") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                Sexual acts
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("hiddenCamera")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("hiddenCamera")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("hiddenCamera")}
                role="checkbox"
              >
                {sexualContent.has("hiddenCamera") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                Hidden camera, spyware
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("deepfake")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("deepfake")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("deepfake")}
                role="checkbox"
              >
                {sexualContent.has("deepfake") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                Sexualized deepfake or AI-generated image
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("blackmail")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("blackmail")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("blackmail")}
                role="checkbox"
              >
                {sexualContent.has("blackmail") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                Blackmail / extortion (sextortion)
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("other")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("other")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("other")}
                role="checkbox"
              >
                {sexualContent.has("other") && (
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
              <span className="text-sm font-medium leading-[1.25] text-white">
                Other sexual harm:{" "}
              </span>
              {sexualContent.has("other") && (
                <input
                  type="text"
                  value={otherSexualHarm}
                  onChange={(e) => setOtherSexualHarm(e.target.value)}
                  placeholder="Type here"
                  className="flex-1 bg-gray-900/20 px-3 py-2 rounded-lg text-xs font-medium text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
                />
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl w-full">
              <button
                type="button"
                onClick={() => handleSexualContentChange("none")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
                  sexualContent.has("none")
                    ? "bg-[#b894ee]"
                    : "bg-transparent border-[1.3px] border-white rounded-md"
                }`}
                aria-checked={sexualContent.has("none")}
                role="checkbox"
              >
                {sexualContent.has("none") && (
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
                None of the above
              </span>
            </div>
          </div>
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
