import { useRef, useState } from "react";

interface ImageUploadAreaProps {
  onFilesSelected: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

export function ImageUploadArea({
  onFilesSelected,
  accept = "image/*,video/*",
  multiple = true,
}: ImageUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div
        className={`bg-white/8 border border-dashed border-white flex flex-col gap-4 items-center justify-center p-6 rounded-[20px] w-full transition-colors cursor-pointer ${
          isDragging ? "border-[#b894ee] bg-white/12" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className="shrink-0 w-[27px] h-[27px]">
          <img
            src="/upload icon.svg"
            alt="Upload icon"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-center text-white whitespace-nowrap">
          <p className="text-sm font-medium leading-[1.45]">
            Click to upload or drag and drop file here
          </p>
          <p className="text-xs font-normal leading-[1.45] opacity-70">
            JPG, JPEG, PNG, HEIF, HEIC, WebP, GIF, MKV, AVI, MOV, FLV
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="File upload"
      />
    </>
  );
}
