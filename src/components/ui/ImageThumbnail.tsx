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
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="flex flex-col gap-0.5 items-start justify-center shrink-0">
      <div className="relative flex flex-col items-end p-0.5 rounded-lg w-[90px] h-[90px]">
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
        <button
          type="button"
          onClick={handleDelete}
          className="bg-white flex items-center justify-center relative rounded-[30px] w-6 h-6 hover:bg-gray-100 transition-colors z-10"
          aria-label={`Delete ${fileName}`}
        >
          <DeleteIcon />
        </button>
      </div>
      <p className="text-white text-xs font-medium leading-[1.45] whitespace-pre-wrap w-[90px] truncate">
        {fileName}
      </p>
    </div>
  );
}

