import type { ReactNode } from "react";

interface FormPageProps {
  title: string;
  description?: string;
  sectionTitle?: string;
  children: ReactNode;
}

export function FormPage({
  title,
  description,
  sectionTitle,
  children,
}: FormPageProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-nowrap">
          {title}
        </h2>
        {description && (
          <p className="text-white/80 text-xs font-normal leading-[1.25] whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>
      {sectionTitle && (
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-white text-sm font-semibold leading-[1.25] whitespace-nowrap">
            {sectionTitle}
          </h3>
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">{children}</div>
    </div>
  );
}
