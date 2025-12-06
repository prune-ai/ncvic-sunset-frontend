import { useState, useRef } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { Button } from "../components/ui/Button";

interface AddEvidencePageProps {
  onBack: () => void;
  onNext: () => void;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  url?: string;
}

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3L3 9M3 3L9 9"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 8V24M8 16L16 8L24 16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AddEvidencePage({ onBack, onNext }: AddEvidencePageProps) {
  const [activeTab, setActiveTab] = useState<"images" | "urls" | "text">(
    "images",
  );
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [actionType, setActionType] = useState<"remove" | "search">("remove");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => {
      const id = `${Date.now()}-${Math.random()}`;
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      return { id, file, preview };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormContainer title="Start your case" currentStep={3} totalSteps={5}>
      <div className="flex flex-col gap-[20px] w-full">
        {/* Add evidence section */}
        <div className="flex flex-col gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25]">
            Add evidence
          </h2>

          {/* Tabs */}
          <div className="flex gap-[8px] w-full">
            <button
              type="button"
              onClick={() => setActiveTab("images")}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold leading-[1.25] text-white transition-colors ${
                activeTab === "images"
                  ? "bg-[#b894ee] border border-[#b894ee]"
                  : "bg-gray-900/20 hover:bg-gray-900/30"
              }`}
            >
              Upload images
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("urls")}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold leading-[1.25] text-white transition-colors ${
                activeTab === "urls"
                  ? "bg-[#b894ee] border border-[#b894ee]"
                  : "bg-gray-900/20 hover:bg-gray-900/30"
              }`}
            >
              Upload URLs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("text")}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold leading-[1.25] text-white transition-colors ${
                activeTab === "text"
                  ? "bg-[#b894ee] border border-[#b894ee]"
                  : "bg-gray-900/20 hover:bg-gray-900/30"
              }`}
            >
              Upload text
            </button>
          </div>

          {/* Upload area - only show for images tab */}
          {activeTab === "images" && (
            <>
              <div
                className={`bg-white/8 border border-dashed border-white flex flex-col gap-4 items-center justify-center p-6 rounded-[20px] w-full transition-colors ${
                  isDragging ? "border-[#b894ee] bg-white/12" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadIcon />
                <div className="flex flex-col gap-1 items-center text-sm font-medium text-white">
                  <p>Upload images or videos</p>
                  <p>Drag and drop files here</p>
                </div>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="bg-gray-900/20 flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold text-white w-full hover:bg-gray-900/30 transition-colors"
                >
                  Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {/* File type info */}
              <div className="flex flex-col gap-2 text-sm font-medium text-white w-full">
                <div className="flex items-center justify-between w-full">
                  <span>Images:</span>
                  <span className="text-white/80">
                    JPG, JPEG, PNG, HEIC, HEIF, WEBP, GIF
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span>Videos:</span>
                  <span className="text-white/80">
                    MP4, MOV, WEBM, M4V, AVI, MKV, FLV
                  </span>
                </div>
                <p className="text-white/80">(up to 250 MB each)</p>
              </div>

              {/* Exact match thumbnails */}
              {uploadedFiles.length > 0 && (
                <div className="flex flex-col gap-2 w-full">
                  <div className="text-orange-400 text-xs font-bold uppercase leading-[1.45]">
                    Exact match
                  </div>
                  <div className="flex gap-3 items-start">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="relative inline-grid justify-items-start"
                      >
                        <div className="relative rounded-lg w-[58px] h-[58px] overflow-hidden">
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-400 rounded-lg" />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteFile(file.id)}
                          className="absolute bg-white flex items-center justify-center ml-[32px] mt-[2px] rounded-[30px] w-6 h-6 hover:bg-gray-100 transition-colors"
                          aria-label="Delete file"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* URLs tab content */}
          {activeTab === "urls" && (
            <div className="bg-white/8 border border-dashed border-white flex flex-col gap-4 items-center justify-center p-6 rounded-[20px] w-full">
              <UploadIcon />
              <div className="flex flex-col gap-1 items-center text-sm font-medium text-white">
                <p>Upload URLs</p>
                <p>Paste URLs here</p>
              </div>
              <textarea
                placeholder="Enter URLs, one per line..."
                className="bg-gray-900/20 w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee] resize-none"
                rows={4}
              />
            </div>
          )}

          {/* Text tab content */}
          {activeTab === "text" && (
            <div className="bg-white/8 border border-dashed border-white flex flex-col gap-4 items-center justify-center p-6 rounded-[20px] w-full">
              <UploadIcon />
              <div className="flex flex-col gap-1 items-center text-sm font-medium text-white">
                <p>Upload text</p>
                <p>Paste or type text here</p>
              </div>
              <textarea
                placeholder="Enter text evidence..."
                className="bg-gray-900/20 w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee] resize-none"
                rows={6}
              />
            </div>
          )}

          {/* Action cards */}
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setActionType("remove")}
              className={`flex-1 flex flex-col gap-2 items-center px-4 py-3 rounded-xl transition-colors ${
                actionType === "remove"
                  ? "bg-[#b894ee]"
                  : "bg-[#88758e] hover:bg-[#9a7fa1]"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-[46px] w-5 h-5 ${
                  actionType === "remove"
                    ? "bg-gray-900"
                    : "bg-transparent border-[1.3px] border-gray-400"
                }`}
              >
                {actionType === "remove" && <CheckIcon />}
              </div>
              <div className="flex flex-col gap-1 items-start text-center text-white w-full">
                <div className="text-sm font-medium leading-[1.25] w-full">
                  Remove an image from the internet
                </div>
                <div className="text-xs font-normal leading-[1.25] w-full">
                  Upload an image you know exists online and want taken down.
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setActionType("search")}
              className={`flex-1 flex flex-col gap-2 items-center px-4 py-3 rounded-xl transition-colors ${
                actionType === "search"
                  ? "bg-[#b894ee]"
                  : "bg-[#88758e] hover:bg-[#9a7fa1]"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-[46px] w-5 h-5 ${
                  actionType === "search"
                    ? "bg-gray-900"
                    : "bg-transparent border-[1.3px] border-gray-400"
                }`}
              >
                {actionType === "search" && <CheckIcon />}
              </div>
              <div className="flex flex-col gap-1 items-start text-center text-white w-full">
                <div className="text-sm font-medium leading-[1.25] w-full">
                  Search for images of me online
                </div>
                <div className="text-xs font-normal leading-[1.25] w-full">
                  Upload a photo of your face so we can use facial recognition
                  to detect potentially unlawful or non-consensual images.
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between w-full">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </FormContainer>
  );
}
