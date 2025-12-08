import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from "react";

interface URLUploadAreaProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
  placeholder?: string;
}

export function URLUploadArea({
  urls,
  onUrlsChange,
  placeholder = "Type Here",
}: URLUploadAreaProps) {
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize textarea value from URLs prop if provided
  useEffect(() => {
    if (urls.length > 0 && !textareaValue) {
      setTextareaValue(urls.join("\n"));
    }
  }, []);

  const parseUrls = (text: string): string[] => {
    // Split by newlines, filter empty strings, and trim each URL
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);

    // Auto-format URLs: parse and update the URLs array
    const parsedUrls = parseUrls(value);
    onUrlsChange(parsedUrls);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Enter, Tab, and Shift+Enter for line breaks
    if (e.key === "Enter" && !e.shiftKey) {
      // Regular Enter - allow default behavior (creates new line)
      // The onChange handler will parse URLs after the newline is added
      return;
    }

    if (e.key === "Tab") {
      // Tab - insert newline instead of default tab behavior
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        textareaValue.substring(0, start) +
        "\n" + // Newline for tab
        textareaValue.substring(end);
      setTextareaValue(newValue);

      // Update URLs after newline insertion
      setTimeout(() => {
        const parsedUrls = parseUrls(newValue);
        onUrlsChange(parsedUrls);
        // Restore cursor position after newline
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }

    // Shift+Enter is handled by default browser behavior (creates new line)
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Allow paste, then parse URLs after paste completes
    setTimeout(() => {
      const value = textareaRef.current?.value || "";
      setTextareaValue(value);
      const parsedUrls = parseUrls(value);
      onUrlsChange(parsedUrls);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-[rgba(26,29,41,0.2)] flex gap-2 items-center pb-[84px] pt-3.5 px-4 rounded-lg w-full">
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none resize-none text-xs font-normal leading-[1.25] text-zinc-200 placeholder:text-zinc-200/60 focus:outline-none min-h-[100px]"
          rows={6}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-[10px] font-normal leading-[1.45] text-zinc-200 whitespace-nowrap">
          Enter or paste URLs • Auto-formats to one per line
        </p>
        <p className="text-[10px] font-normal leading-[1.45] text-zinc-200 whitespace-nowrap">
          {urls.length} {urls.length === 1 ? "URL" : "URLs"}
        </p>
      </div>
    </div>
  );
}

