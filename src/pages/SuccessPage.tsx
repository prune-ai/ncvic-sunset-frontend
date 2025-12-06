import { Button } from "../components/ui/Button";

interface SuccessPageProps {
  onGoToPortal?: () => void;
  onAddMoreEvidence?: () => void;
  onCopyCaseId?: () => void;
  caseId?: string;
}

export function SuccessPage({
  onGoToPortal,
  onAddMoreEvidence,
  onCopyCaseId,
  caseId = "CASE-12345", // Placeholder until backend integration
}: SuccessPageProps) {
  const handleCopyCaseId = () => {
    navigator.clipboard.writeText(caseId);
    onCopyCaseId?.();
  };

  return (
    <div className="backdrop-blur-[50px] backdrop-filter bg-gray-900/20 flex flex-col gap-6 lg:gap-[32px] items-center p-4 lg:p-[32px] rounded-[12px] w-full">
      {/* Success icon and text */}
      <div className="flex flex-col gap-3 lg:gap-[12px] items-center w-full">
        {/* Checkmark icon */}
        <div className="h-[60px] w-[69px] flex items-center justify-center relative">
          {/* Radiating dots effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer ring */}
            <div className="absolute w-16 h-16 rounded-full bg-blue-500/20"></div>
            {/* Middle ring */}
            <div className="absolute w-12 h-12 rounded-full bg-blue-500/30"></div>
            {/* Inner circle with checkmark */}
            <div className="relative w-[34px] h-[34px] rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 5L7.5 13.5L4 10"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-white text-xl lg:text-2xl font-semibold leading-[1.45] text-center">
          Your case is created.
        </h1>

        {/* Description */}
        <p className="text-white text-xs font-medium leading-[1.45] text-center max-w-md px-2">
          You can now track takedowns, add evidence, upload more images, or
          request escalation.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 lg:gap-[8px] items-start w-full">
        {/* Primary button */}
        <Button onClick={onGoToPortal} variant="primary" className="w-full">
          Go to your portal
        </Button>

        {/* Secondary buttons */}
        <div className="flex gap-2 lg:gap-[8px] items-start w-full">
          <Button
            onClick={onAddMoreEvidence}
            variant="secondary"
            className="flex-1"
          >
            Add more evidence
          </Button>
          <Button
            onClick={handleCopyCaseId}
            variant="secondary"
            className="flex-1"
          >
            Copy case ID
          </Button>
        </div>
      </div>
    </div>
  );
}
