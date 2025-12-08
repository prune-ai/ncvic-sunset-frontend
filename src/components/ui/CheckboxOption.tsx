interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  showInput?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  inputPlaceholder?: string;
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

export function CheckboxOption({
  label,
  checked,
  onChange,
  showInput = false,
  inputValue = "",
  onInputChange,
  inputPlaceholder = "Type here",
}: CheckboxOptionProps) {
  return (
    <div
      className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
        showInput && checked ? "items-start" : "items-center"
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
          checked ? "bg-[#b894ee]" : "bg-white/10 hover:bg-white/20"
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <CheckIcon />}
      </button>
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap">
          {label}
        </span>
        {showInput && checked && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            placeholder={inputPlaceholder}
            className="flex-1 bg-gray-900/20 px-3 py-2 rounded-lg text-xs font-medium text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
          />
        )}
      </div>
    </div>
  );
}
