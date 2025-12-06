interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number";
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
  rows = 3,
}: TextInputProps) {
  const baseStyles =
    "w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#8be784] transition-colors min-h-[44px]";

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-white text-sm font-semibold leading-[1.25]">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={baseStyles}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseStyles}
        />
      )}
    </div>
  );
}
