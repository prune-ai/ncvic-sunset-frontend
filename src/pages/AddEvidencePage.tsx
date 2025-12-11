import { useState, useEffect } from "react";

import { FormContainer } from "../components/layout/FormContainer";
import { FormNavigation } from "../components/layout/FormNavigation";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import {
  EvidenceSection,
  type UploadedFile,
} from "../components/ui/EvidenceSection";
import { EvidenceTypeTabs } from "../components/ui/EvidenceTypeTabs";
import { WarningIcon, SearchIcon } from "../components/ui/icons";
import { SectionHeader } from "../components/ui/SectionHeader";
import { TextUploadArea } from "../components/ui/TextUploadArea";
import { URLUploadArea } from "../components/ui/URLUploadArea";
import { api } from "../lib/api";

interface AddEvidencePageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
  initialData?: Record<string, unknown>;
  evidenceFiles: {
    removeFiles: UploadedFile[];
    searchFiles: UploadedFile[];
  };
  onEvidenceFilesChange: (files: {
    removeFiles: UploadedFile[];
    searchFiles: UploadedFile[];
  }) => void;
  formId?: string;
}

export function AddEvidencePage({
  onBack,
  onNext,
  isLoading = false,
  error,
  initialData,
  evidenceFiles,
  onEvidenceFilesChange,
  formId,
}: AddEvidencePageProps) {
  const [activeTab, setActiveTab] = useState<"images" | "urls" | "text">(
    (initialData?.evidence_type as "images" | "urls" | "text") || "images"
  );
  const [removeFiles, setRemoveFiles] = useState<UploadedFile[]>(
    evidenceFiles.removeFiles || []
  );
  const [searchFiles, setSearchFiles] = useState<UploadedFile[]>(
    evidenceFiles.searchFiles || []
  );
  const [textKeywords, setTextKeywords] = useState<string[]>(
    (initialData?.text_keywords as string[]) || []
  );
  const [urls, setUrls] = useState<string[]>(
    (initialData?.urls as string[]) || []
  );

  // Sync local file state with parent state
  useEffect(() => {
    setRemoveFiles(evidenceFiles.removeFiles || []);
    setSearchFiles(evidenceFiles.searchFiles || []);
  }, [evidenceFiles]);

  // Update parent state when files change
  useEffect(() => {
    onEvidenceFilesChange({
      removeFiles,
      searchFiles,
    });
  }, [removeFiles, searchFiles, onEvidenceFilesChange]);

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

          {/* URLs upload section */}
          {activeTab === "urls" && (
            <div className="flex flex-col gap-2 w-full">
              <URLUploadArea urls={urls} onUrlsChange={setUrls} />
            </div>
          )}

          {/* Text upload section */}
          {activeTab === "text" && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-lg font-semibold leading-[1.25] text-white whitespace-pre-wrap">
                  Add keywords you've used to find your content on search
                  engines or specific platforms.
                </h3>
                <p className="text-xs font-normal leading-[1.25] text-zinc-200 whitespace-pre-wrap">
                  If your images and videos are associated with a known group,
                  or are part of a known series, or you they are being shared on
                  specific types of sites, any text you can provide will greatly
                  increase our chances of finding and removing your content.
                  <br />
                  <br />
                  Ex: your name leak, username 123...
                </p>
              </div>
              <TextUploadArea
                keywords={textKeywords}
                onKeywordsChange={setTextKeywords}
              />
            </div>
          )}
        </div>
      </div>

      <ErrorMessage message={error} />

      <FormNavigation
        onBack={onBack}
        onNext={async () => {
          // Upload files if formId is available
          if (formId) {
            console.log(`[AddEvidencePage] Uploading files for form ${formId}`);
            console.log(
              `[AddEvidencePage] Remove files: ${removeFiles.length}, Search files: ${searchFiles.length}`
            );

            // Upload remove files
            for (const uploadedFile of removeFiles) {
              try {
                console.log(
                  `[AddEvidencePage] Uploading remove file: ${uploadedFile.file.name}`
                );
                await api.uploadEvidenceFile(
                  formId,
                  uploadedFile.file,
                  "remove"
                );
                console.log(
                  `[AddEvidencePage] Successfully uploaded remove file`
                );
              } catch (err) {
                console.error(
                  "[AddEvidencePage] Error uploading remove file:",
                  err
                );
                // Continue with other files even if one fails
              }
            }

            // Upload search files
            for (const uploadedFile of searchFiles) {
              try {
                console.log(
                  `[AddEvidencePage] Uploading search file: ${uploadedFile.file.name}`
                );
                await api.uploadEvidenceFile(
                  formId,
                  uploadedFile.file,
                  "search"
                );
                console.log(
                  `[AddEvidencePage] Successfully uploaded search file`
                );
              } catch (err) {
                console.error(
                  "[AddEvidencePage] Error uploading search file:",
                  err
                );
                // Continue with other files even if one fails
              }
            }

            // Upload URLs if any
            if (urls.length > 0) {
              try {
                console.log(`[AddEvidencePage] Uploading ${urls.length} URLs`);
                await api.createUrlEvidence(formId, urls, "remove");
              } catch (err) {
                console.error("[AddEvidencePage] Error uploading URLs:", err);
              }
            }

            // Upload keywords if any
            if (textKeywords.length > 0) {
              try {
                console.log(
                  `[AddEvidencePage] Uploading ${textKeywords.length} keywords`
                );
                await api.createTextEvidence(formId, textKeywords, "search");
              } catch (err) {
                console.error(
                  "[AddEvidencePage] Error uploading keywords:",
                  err
                );
              }
            }
          } else {
            const errorMsg =
              "[AddEvidencePage] No formId available, skipping file uploads. Files will not be saved to backend.";
            console.warn(errorMsg);
            // Show error to user
            if (removeFiles.length > 0 || searchFiles.length > 0) {
              alert(
                "Warning: Form ID not available. Files were not uploaded to the server. Please go back and try again."
              );
            }
          }

          // Save file metadata (not File objects, which can't be serialized)
          const removeFilesMetadata = removeFiles.map((f) => ({
            id: f.id,
            name: f.file.name,
            size: f.file.size,
            type: f.file.type,
            lastModified: f.file.lastModified,
            action_type: "remove" as const,
          }));
          const searchFilesMetadata = searchFiles.map((f) => ({
            id: f.id,
            name: f.file.name,
            size: f.file.size,
            type: f.file.type,
            lastModified: f.file.lastModified,
            action_type: "search" as const,
          }));

          onNext({
            evidence_type: activeTab,
            remove_files: removeFilesMetadata,
            search_files: searchFilesMetadata,
            remove_files_count: removeFiles.length,
            search_files_count: searchFiles.length,
            text_keywords: textKeywords,
            urls: urls,
          });
        }}
        isLoading={isLoading}
      />
    </FormContainer>
  );
}
