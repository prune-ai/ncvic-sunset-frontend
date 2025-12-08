interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "flex gap-2 items-center px-4 lg:px-[24px] py-3 lg:py-[14px] rounded-lg transition-opacity min-h-[44px]";
  const variantStyles = {
    primary: "bg-[#8be784] text-gray-900",
    secondary: "bg-gray-900/20 text-white",
  };

  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) return;
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
    onClick?.();
  };

  return (
    <button
      type={type}
      onMouseDown={handleInteraction}
      onKeyDown={handleInteraction}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90 active:opacity-75"
      } ${className}`}
    >
      <span className="text-sm font-semibold leading-[1.25] text-center whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
