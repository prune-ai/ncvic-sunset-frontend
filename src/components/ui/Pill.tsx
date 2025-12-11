interface PillProps {
  text: string;
  onDelete: () => void;
}

export function Pill({ text, onDelete }: PillProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="bg-white/30 flex gap-2.5 h-[29px] items-center justify-center px-3 py-0 rounded-[46px] shrink-0">
      <span className="text-xs font-medium leading-[1.25] text-center text-white whitespace-nowrap">
        {text}
      </span>
      <button
        type="button"
        onClick={handleDelete}
        className="shrink-0 w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity"
        aria-label={`Remove ${text}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
