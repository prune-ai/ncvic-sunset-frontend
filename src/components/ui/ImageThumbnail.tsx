import { useState } from "react";
import { DeleteIcon } from "./icons";

interface ImageThumbnailProps {
  id: string;
  preview: string;
  fileName: string;
  onDelete: (id: string) => void;
}

export function ImageThumbnail({
  id,
  preview,
  fileName,
  onDelete,
}: ImageThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      className="relative flex flex-col items-start justify-center shrink-0 w-[90px] h-[90px] rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-lg"
      >
        <div className="absolute bg-[#d9d9d9] inset-0 rounded-lg" />
        <img
          src={preview}
          alt={fileName}
          className="absolute max-w-none object-cover rounded-lg w-full h-full"
        />
      </div>

      {/* Delete button - only visible on hover */}
      {isHovered && (
        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-0.5 right-0.5 bg-white flex items-center justify-center rounded-[30px] w-6 h-6 hover:bg-gray-100 transition-colors z-20"
          aria-label={`Delete ${fileName}`}
        >
          <DeleteIcon />
        </button>
      )}

      {/* Filename overlay - only visible on hover, positioned at bottom 1/8 */}
      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-[12.5%] bg-black/60 flex items-center px-1.5 z-10">
          <p className="text-white text-xs font-medium leading-[1.45] truncate w-full">
            {fileName}
          </p>
        </div>
      )}
    </div>
  );
}

