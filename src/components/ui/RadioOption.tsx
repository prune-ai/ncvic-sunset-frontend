interface RadioOptionProps {
  label: string;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  name: string;
  showInput?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  inputPlaceholder?: string;
}

export function RadioOption({
  label,
  value,
  selected,
  onChange,
  name,
  showInput = false,
  inputValue = "",
  onInputChange,
  inputPlaceholder = "Type here",
}: RadioOptionProps) {
  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.type === "mousedown") {
      e.preventDefault(); // Prevent text selection
    }
    if (e.type === "keydown") {
      const keyEvent = e as React.KeyboardEvent;
      if (keyEvent.key !== "Enter" && keyEvent.key !== " ") {
        return;
      }
      e.preventDefault();
    }
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <button
        type="button"
        onMouseDown={handleInteraction}
        onKeyDown={handleInteraction}
        className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold leading-[1.25] text-white min-h-[44px] focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none ${
          selected
            ? "bg-[#b894ee] border border-[#b894ee]"
            : "bg-gray-900/20 hover:bg-gray-900/30 active:bg-gray-900/30 active:outline-none focus:bg-gray-900/20 focus-visible:ring-0"
        }`}
        role="radio"
        aria-checked={selected}
        name={name}
      >
        {label}
      </button>
      {showInput && selected && (
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
