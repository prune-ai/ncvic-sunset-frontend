interface RadioOptionProps {
  label: string;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  name: string;
}

export function RadioOption({
  label,
  value,
  selected,
  onChange,
  name,
}: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold leading-[1.25] text-white transition-colors min-h-[44px] focus:outline-none focus:ring-0 active:outline-none ${
        selected
          ? "bg-[#b894ee] border border-[#b894ee]"
          : "bg-gray-900/20 hover:bg-gray-900/30 active:bg-gray-900/30 active:outline-none focus:bg-gray-900/20"
      }`}
      role="radio"
      aria-checked={selected}
      name={name}
    >
      {label}
    </button>
  );
}
