interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex gap-[6px] items-center w-[130px]">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-[7px] rounded-[31px] ${
              index < currentStep - 1
                ? "bg-[#8be784]"
                : index === currentStep - 1
                  ? "bg-gray-900"
                  : "bg-gray-700 opacity-10"
            }`}
          />
        ))}
      </div>
      <div className="text-white text-xs font-medium leading-[1.45] text-center whitespace-pre-wrap w-full">
        Step {currentStep}
      </div>
    </div>
  );
}
