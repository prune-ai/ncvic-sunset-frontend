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
    "flex gap-2 items-center px-[24px] py-[14px] rounded-lg transition-opacity";
  const variantStyles = {
    primary: "bg-[#8be784] text-gray-900",
    secondary: "bg-gray-900/20 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
      } ${className}`}
    >
      <span className="text-sm font-semibold leading-[1.25] text-center whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
