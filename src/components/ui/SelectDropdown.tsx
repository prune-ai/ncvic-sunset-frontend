import { useState, useRef, useEffect } from "react";
import { DropdownArrow } from "./icons";

interface SelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  defaultValue?: string;
}

export function SelectDropdown({
  options,
  value,
  onChange,
  placeholder,
  className = "",
  defaultValue,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState(value || defaultValue || "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with defaultValue if no value is set
  useEffect(() => {
    if (defaultValue && !value) {
      setInputValue(defaultValue);
      onChange(defaultValue);
    } else if (value) {
      setInputValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update input value when value prop changes externally
  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Reset search query when closing
        setSearchQuery("");
        // Reset input to selected value
        setInputValue(value || defaultValue || "");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, defaultValue]);

  // Focus and select input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // Small delay to ensure focus is complete before selecting
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, 0);
    }
  }, [isOpen]);

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setInputValue(query);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    // Select all text when focused - use setTimeout to ensure it happens after focus
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    }, 0);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking directly on the input (it will handle its own focus)
    if (e.target === inputRef.current) {
      return;
    }
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(true);
      // Select all text immediately
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, 0);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredOptions.length > 0) {
      e.preventDefault();
      onChange(filteredOptions[0]);
      setIsOpen(false);
      setSearchQuery("");
      setInputValue(filteredOptions[0]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
      setInputValue(value || defaultValue || "");
    }
  };

  const handleOptionSelect = (
    e: React.MouseEvent | React.KeyboardEvent,
    option: string,
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
    onChange(option);
    setIsOpen(false);
    setSearchQuery("");
    setInputValue(option);
  };

  const displayValue = value || defaultValue || "";
  const showPlaceholder = !value && !defaultValue;

  return (
    <div className={`flex-1 relative ${className}`} ref={dropdownRef}>
      <div
        onClick={handleContainerClick}
        className="relative w-full bg-gray-900/20 flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-900/30 cursor-pointer"
      >
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? inputValue : displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={showPlaceholder ? placeholder : ""}
          className="w-full bg-transparent text-xs font-medium text-white placeholder:text-white/40 focus:outline-none flex-1 cursor-text"
        />
        <DropdownArrow />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-white/20 rounded-lg max-h-[200px] overflow-y-auto custom-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = option === displayValue;
              return (
                <button
                  key={option}
                  type="button"
                  onMouseDown={(e) => handleOptionSelect(e, option)}
                  onKeyDown={(e) => handleOptionSelect(e, option)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium text-white transition-colors ${
                    isSelected
                      ? "bg-[#b894ee]/30 hover:bg-[#b894ee]/40"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {option}
                </button>
              );
            })
          ) : (
            <div className="px-3 py-2 text-xs font-medium text-white/60">
              No matches found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

