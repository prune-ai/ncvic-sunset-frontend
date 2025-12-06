interface ButtonGroupOption {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export function ButtonGroup({ options, value, onChange }: ButtonGroupProps) {
  return (
    <div className="flex gap-2 lg:gap-[12px] w-full">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 flex items-center justify-center px-3 lg:px-[12px] py-3 lg:py-[12px] rounded-lg text-sm font-semibold leading-[1.25] text-white transition-colors min-h-[44px] ${
            value === option.value
              ? "bg-[#b894ee] border border-[#b894ee]"
              : "bg-gray-900/20 hover:bg-gray-900/30 active:opacity-75"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
