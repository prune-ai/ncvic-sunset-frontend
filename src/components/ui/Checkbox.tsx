interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  required?: boolean;
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

export function Checkbox({
  checked,
  onChange,
  label,
  description,
  required = false,
}: CheckboxProps) {
  return (
    <div className="border border-white/20 border-solid flex gap-2 items-start px-4 py-3 rounded-2xl w-full">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors ${
          checked ? "bg-[#b894ee]" : "bg-white/10"
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <CheckIcon />}
      </button>
      <div className="flex flex-col gap-2.5 flex-1 justify-center min-w-0">
        <div className="text-white text-sm font-semibold leading-[1.25] whitespace-pre-wrap">
          {label}
        </div>
        {description && (
          <div className="text-white/80 text-xs font-normal leading-[1.25] whitespace-pre-wrap">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
