import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { FormNavigation } from "../components/layout/FormNavigation";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { SectionHeader } from "../components/ui/SectionHeader";
import { EvidenceTypeTabs } from "../components/ui/EvidenceTypeTabs";
import {
  EvidenceSection,
  type UploadedFile,
} from "../components/ui/EvidenceSection";
import { WarningIcon, SearchIcon } from "../components/ui/icons";

interface AddEvidencePageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
  initialData?: Record<string, unknown>;
}

export function AddEvidencePage({
  onBack,
  onNext,
  isLoading = false,
  error,
  initialData,
}: AddEvidencePageProps) {
  const [activeTab, setActiveTab] = useState<"images" | "urls" | "text">(
    (initialData?.evidence_type as "images" | "urls" | "text") || "images",
  );
  const [removeFiles, setRemoveFiles] = useState<UploadedFile[]>([]);
  const [searchFiles, setSearchFiles] = useState<UploadedFile[]>([]);

  const handleRemoveFilesSelected = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => {
      const id = `${Date.now()}-${Math.random()}`;
      const preview =
        file.type.startsWith("image/") || file.type.startsWith("video/")
          ? URL.createObjectURL(file)
          : "";
      return { id, file, preview };
    });
    setRemoveFiles((prev) => [...prev, ...newFiles]);
  };

  const handleSearchFilesSelected = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => {
      const id = `${Date.now()}-${Math.random()}`;
      const preview =
        file.type.startsWith("image/") || file.type.startsWith("video/")
          ? URL.createObjectURL(file)
          : "";
      return { id, file, preview };
    });
    setSearchFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteRemoveFile = (id: string) => {
    setRemoveFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleDeleteSearchFile = (id: string) => {
    setSearchFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <FormContainer title="Start your case" currentStep={3} totalSteps={5}>
      <div className="flex flex-col gap-5 lg:gap-[20px] w-full">
        {/* Add evidence section */}
        <div className="flex flex-col gap-4 lg:gap-[16px] w-full">
          <SectionHeader title="Add evidence" />

          <EvidenceTypeTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Only show evidence sections when images tab is active */}
          {activeTab === "images" && (
            <div className="flex flex-col gap-5 w-full">
              <EvidenceSection
                icon={<WarningIcon />}
                title="Remove an image from the internet"
                description="Upload an image you know exists online and want taken down."
                uploadedFiles={removeFiles}
                onFilesSelected={handleRemoveFilesSelected}
                onDeleteFile={handleDeleteRemoveFile}
              />

              <EvidenceSection
                icon={<SearchIcon />}
                title="Search for images of me online"
                description="Upload a photo of your face so we can use facial recognition to detect potentially unlawful or non-consensual images."
                uploadedFiles={searchFiles}
                onFilesSelected={handleSearchFilesSelected}
                onDeleteFile={handleDeleteSearchFile}
              />
            </div>
          )}
        </div>
      </div>

      <ErrorMessage message={error} />

      <FormNavigation
        onBack={onBack}
        onNext={() => {
          // For now, just pass basic evidence data
          // File uploads will be handled separately when backend supports it
          onNext({
            evidence_type: activeTab,
            remove_files_count: removeFiles.length,
            search_files_count: searchFiles.length,
            // Note: Actual file uploads will need to be handled via FormData
            // when the backend file upload endpoint is ready
          });
        }}
        isLoading={isLoading}
      />
    </FormContainer>
  );
}
