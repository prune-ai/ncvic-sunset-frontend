import { CheckIcon } from "./icons";

interface CheckboxWithDescriptionProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxWithDescription({
  title,
  description,
  checked,
  onChange,
}: CheckboxWithDescriptionProps) {
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
    onChange(!checked);
  };

  return (
    <div
      onMouseDown={handleInteraction}
      onKeyDown={handleInteraction}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      className="border border-transparent hover:border-white/20 hover:bg-gray-900/20 flex gap-2 items-start px-4 py-3 rounded-2xl w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
    >
      <button
        type="button"
        onMouseDown={(e) => {
          e.stopPropagation();
          handleInteraction(e);
        }}
        className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 focus:outline-none pointer-events-none ${
          checked ? "bg-[#b894ee]" : "bg-white/10 hover:bg-white/20"
        }`}
        aria-checked={checked}
        role="checkbox"
        tabIndex={-1}
      >
        {checked && <CheckIcon />}
      </button>
      <div className="flex-1 flex flex-col gap-2.5">
        <span className="text-sm font-semibold leading-[1.25] text-white whitespace-pre-wrap">
          {title}
        </span>
        {description && (
          <span className="text-xs font-normal leading-[1.25] text-white/80 whitespace-pre-wrap">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

