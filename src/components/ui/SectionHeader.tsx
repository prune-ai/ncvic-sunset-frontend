interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
        {title}
      </h2>
      {description && (
        <p className="text-white/80 text-xs font-medium leading-[1.25] whitespace-pre-wrap">
          {description}
        </p>
      )}
    </div>
  );
}

