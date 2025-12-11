import { useState, useRef, KeyboardEvent } from "react";

import { Pill } from "./Pill";

interface TextUploadAreaProps {
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  placeholder?: string;
}

export function TextUploadArea({
  keywords,
  onKeywordsChange,
  placeholder = "Type keywords and press Enter...",
}: TextUploadAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !keywords.includes(trimmedValue)) {
        onKeywordsChange([...keywords, trimmedValue]);
        setInputValue("");
      }
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      keywords.length > 0
    ) {
      // Remove last keyword if backspace is pressed on empty input
      onKeywordsChange(keywords.slice(0, -1));
    }
  };

  const handleDeleteKeyword = (index: number) => {
    onKeywordsChange(keywords.filter((_, i) => i !== index));
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="bg-[rgba(26,29,41,0.2)] flex flex-col h-[172px] items-start pb-4 pt-3.5 px-4 rounded-lg w-full cursor-text"
      onClick={handleContainerClick}
    >
      <div className="flex flex-wrap gap-2 items-center w-full">
        {keywords.map((keyword, index) => (
          <Pill
            key={`${keyword}-${index}`}
            text={keyword}
            onDelete={() => handleDeleteKeyword(index)}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={keywords.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
    </div>
  );
}
