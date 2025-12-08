interface RadioButtonOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioButtonProps {
  options: RadioButtonOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function RadioButton({
  options,
  value,
  onChange,
  name,
}: RadioButtonProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {options.map((option) => (
        <div
          key={option.value}
          className="border border-transparent hover:border-white/20 border-solid flex gap-2 items-start px-4 py-3 rounded-2xl w-full transition-colors"
        >
          <button
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex items-center justify-center rounded-full shrink-0 w-5 h-5 border-2 transition-colors focus:outline-none ${
              value === option.value
                ? "border-[#b894ee] bg-[#b894ee]"
                : "border-white/40 bg-transparent"
            }`}
            role="radio"
            aria-checked={value === option.value}
            name={name}
          >
            {value === option.value && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </button>
          <div className="flex flex-col gap-2.5 flex-1 justify-center min-w-0">
            <div className="text-white text-sm font-semibold leading-[1.25] whitespace-pre-wrap">
              {option.label}
            </div>
            {option.description && (
              <div className="text-white/80 text-xs font-normal leading-[1.25] whitespace-pre-wrap">
                {option.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
