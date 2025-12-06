import type { ReactNode } from "react";
import { ProgressIndicator } from "../ui/ProgressIndicator";

interface FormContainerProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  children: ReactNode;
}

export function FormContainer({
  title,
  currentStep,
  totalSteps,
  children,
}: FormContainerProps) {
  return (
    <div className="backdrop-blur-[50px] backdrop-filter bg-gray-900/20 flex flex-col rounded-[12px] w-full max-h-[calc(100vh-200px)] overflow-hidden">
      <div className="flex flex-col gap-[32px] p-[32px] pb-[32px] overflow-y-auto flex-1 custom-scrollbar">
        <div className="flex items-center justify-between w-full shrink-0">
          <h1 className="text-white text-2xl font-semibold leading-[1.45] text-center whitespace-nowrap">
            {title}
          </h1>
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
