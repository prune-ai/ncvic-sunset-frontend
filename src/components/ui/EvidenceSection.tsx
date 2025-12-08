import { ReactNode } from "react";
import { ImageUploadArea } from "./ImageUploadArea";
import { ImageThumbnail } from "./ImageThumbnail";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

interface EvidenceSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  uploadedFiles: UploadedFile[];
  onFilesSelected: (files: FileList) => void;
  onDeleteFile: (id: string) => void;
}

export function EvidenceSection({
  icon,
  title,
  description,
  uploadedFiles,
  onFilesSelected,
  onDeleteFile,
}: EvidenceSectionProps) {
  return (
    <div className="border border-white/40 border-solid flex flex-col gap-4 items-start p-4 rounded-[20px] w-full">
      <div className="flex gap-4 items-start w-full">
        <div className="bg-[#83728e] flex items-center justify-center rounded-lg shrink-0 w-10 h-10">
          {icon}
        </div>
        <div className="flex flex-1 flex-col gap-1 items-start text-white min-w-0">
          <h3 className="text-lg font-semibold leading-[1.25] text-white whitespace-nowrap">
            {title}
          </h3>
          <p className="text-xs font-normal leading-[1.25] text-white min-w-full">
            {description}
          </p>
        </div>
      </div>

      <ImageUploadArea
        onFilesSelected={onFilesSelected}
        accept="image/*,video/*"
        multiple={true}
      />

      {uploadedFiles.length > 0 && (
        <div className="flex gap-3 items-start">
          {uploadedFiles.map((file) => (
            <ImageThumbnail
              key={file.id}
              id={file.id}
              preview={file.preview}
              fileName={file.file.name}
              onDelete={onDeleteFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

