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
  const handleInteraction = (
    e: React.MouseEvent | React.KeyboardEvent,
    optionValue: string
  ) => {
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
    onChange(optionValue);
  };

  return (
    <div className="flex gap-2 lg:gap-[12px] w-full">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onMouseDown={(e) => handleInteraction(e, option.value)}
          onKeyDown={(e) => handleInteraction(e, option.value)}
          className={`flex-1 flex items-center justify-center px-3 lg:px-[12px] py-3 lg:py-[12px] rounded-lg text-sm font-semibold leading-[1.25] text-white min-h-[44px] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
            value === option.value
              ? "bg-[#b894ee] border border-[#b894ee]"
              : "bg-gray-900/20 hover:bg-gray-900/30 active:opacity-75 border-none"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
