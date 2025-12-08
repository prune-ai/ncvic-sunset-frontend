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
    <div className="backdrop-blur-[50px] backdrop-filter bg-gray-900/20 flex flex-col rounded-[12px] w-full">
      <div className="flex flex-col gap-6 lg:gap-[32px] p-4 lg:p-[32px] pb-4 lg:pb-[32px]">
        <div className="flex items-center justify-between gap-2 w-full shrink-0">
          <h1 className="text-white text-xl lg:text-2xl font-semibold leading-[1.45] text-left lg:text-center whitespace-nowrap flex-1 lg:flex-none">
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
