interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  showInput?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  inputPlaceholder?: string;
  inputPosition?: "inline" | "below"; // New prop to control input placement
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
  inputPosition = "below", // Default to below for consistency
}: CheckboxOptionProps) {
  const isInputBelow = inputPosition === "below";

  return (
    <div className={`flex flex-col gap-2.5 w-full ${isInputBelow ? "" : ""}`}>
      <div
        onClick={() => onChange(!checked)}
        className="flex items-center gap-2 pl-4 pr-0 py-3 rounded-xl w-full cursor-pointer hover:bg-gray-900/20 transition-colors"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(!checked);
          }}
          className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
            checked ? "bg-[#b894ee]" : "bg-white/10"
          }`}
          aria-checked={checked}
          role="checkbox"
        >
          {checked && <CheckIcon />}
        </button>
        <span className="text-sm font-medium leading-[1.25] text-white whitespace-pre-wrap flex-1">
          {label}
        </span>
        {/* Inline input (old behavior for backwards compatibility) */}
        {showInput && checked && !isInputBelow && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            placeholder={inputPlaceholder}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-gray-900/20 px-3 py-2 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
          />
        )}
      </div>
      {/* Below input (new default behavior) */}
      {showInput && checked && isInputBelow && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange?.(e.target.value)}
          placeholder={inputPlaceholder}
          className="bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee] ml-4"
        />
      )}
    </div>
  );
}
