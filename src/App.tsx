import { useState } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { LandingPage } from "./pages/LandingPage";
import { StartCasePage } from "./pages/StartCasePage";
import { WhatHappenedPage } from "./pages/WhatHappenedPage";
import { AddEvidencePage } from "./pages/AddEvidencePage";
import { ContactInfoPage } from "./pages/ContactInfoPage";
import { ConsentsPage } from "./pages/ConsentsPage";
import { SuccessPage } from "./pages/SuccessPage";
import { ConfirmModal } from "./components/ui/ConfirmModal";
import { api, ApiClientError } from "./lib/api";

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = landing page
  const [formId, setFormId] = useState<string | undefined>(undefined);
  const [caseId, setCaseId] = useState<string | undefined>(undefined);
  const [caseNumber, setCaseNumber] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // Store form data for each page to restore on back navigation
  const [savedPageData, setSavedPageData] = useState<Record<number, Record<string, unknown>>>({});
  // Store File objects separately for page 3 (evidence) since they can't be serialized
  const [evidenceFiles, setEvidenceFiles] = useState<{
    removeFiles: Array<{ id: string; file: File; preview: string }>;
    searchFiles: Array<{ id: string; file: File; preview: string }>;
  }>({
    removeFiles: [],
    searchFiles: [],
  });
  const [showStartOverModal, setShowStartOverModal] = useState(false);

  const handleStartCase = async () => {
    setCurrentPage(1); // Navigate to page 1 of the form immediately
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 1) {
      setCurrentPage(0); // Go back to landing page from page 1
    }
  };

  const handleNext = async (pageData?: Record<string, unknown>) => {
    try {
      setIsLoading(true);
      setError(undefined);

      // Save page data locally for restoration on back navigation
      if (pageData) {
        setSavedPageData((prev) => ({
          ...prev,
          [currentPage]: pageData,
        }));

        // For page 3 (evidence), also update evidence files if metadata exists
        if (currentPage === 3 && pageData.remove_files && pageData.search_files) {
          // Files are already stored in evidenceFiles state, so we don't need to restore them
          // The metadata is saved for reference, but File objects persist in state
        }
      }

      // If we're on page 1, start the intake form
      if (currentPage === 1 && !formId && pageData) {
        const response = await api.startIntake({
          over_18: pageData.over_18 as boolean | null,
          age_in_content: pageData.age_in_content as string,
          reporting_for: Array.from(pageData.reporting_for as Set<string>),
          sexual_content: Array.from(pageData.sexual_content as Set<string>),
          other_sexual_harm: (pageData.other_sexual_harm as string) || null,
        });
        setFormId(response.id);
      } else if (formId && pageData && currentPage >= 2) {
        // Note: File uploads for page 3 are handled directly in AddEvidencePage
        // before onNext is called, so we don't need to handle them here
        
        // Save page data for pages 2-5
        await api.savePage(formId, currentPage, pageData);
      }

      setCurrentPage(currentPage + 1);
    } catch (err) {
      console.error("Error saving page data:", err);
      if (err instanceof ApiClientError) {
        setError(err.detail || err.message);
      } else {
        setError("Failed to save form data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (pageData?: Record<string, unknown>) => {
    try {
      setIsLoading(true);
      setError(undefined);

      if (!formId) {
        throw new Error("Form ID not found");
      }

      // Save page 5 data locally and to backend
      if (pageData) {
        setSavedPageData((prev) => ({
          ...prev,
          [5]: pageData,
        }));
        await api.savePage(formId, 5, pageData);
      }

      // Submit the form
      const response = await api.submitIntake(formId);
      setCaseId(response.case_id);
      setCaseNumber(response.case_number);
      setCurrentPage(6); // Navigate to success page
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err instanceof ApiClientError) {
        setError(err.detail || err.message);
      } else {
        setError("Failed to submit form. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToPortal = () => {
    // TODO: Navigate to portal URL
    console.log("Navigate to portal");
  };

  const handleAddMoreEvidence = () => {
    // TODO: Navigate to add evidence page or open modal
    console.log("Add more evidence");
  };

  const handleCopyCaseId = () => {
    console.log("Case ID copied to clipboard");
  };

  const handleLearnMore = () => {
    // TODO: Navigate to learn more page or scroll to info section
    console.log("Learn more");
  };

  const handleStartOverClick = () => {
    setShowStartOverModal(true);
  };

  const handleStartOverConfirm = () => {
    // Clear all form state
    setFormId(undefined);
    setCaseId(undefined);
    setCaseNumber(undefined);
    setSavedPageData({});
    setEvidenceFiles({
      removeFiles: [],
      searchFiles: [],
    });
    setError(undefined);
    setShowStartOverModal(false);
    // Navigate back to page 1
    setCurrentPage(1);
  };

  const handleStartOverCancel = () => {
    setShowStartOverModal(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <LandingPage
            onStartCase={handleStartCase}
            onLearnMore={handleLearnMore}
          />
        );
      case 1:
        return (
          <StartCasePage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
            initialData={savedPageData[1]}
          />
        );
      case 2:
        return (
          <WhatHappenedPage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
            initialData={savedPageData[2]}
          />
        );
      case 3:
        return (
          <AddEvidencePage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
            initialData={savedPageData[3]}
            evidenceFiles={evidenceFiles}
            onEvidenceFilesChange={setEvidenceFiles}
            formId={formId}
          />
        );
      case 4:
        return (
          <ContactInfoPage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
            initialData={savedPageData[4]}
          />
        );
      case 5:
        return (
          <ConsentsPage
            onBack={handleBack}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            initialData={savedPageData[5]}
          />
        );
      case 6:
        return (
          <SuccessPage
            onGoToPortal={handleGoToPortal}
            onAddMoreEvidence={handleAddMoreEvidence}
            onCopyCaseId={handleCopyCaseId}
            caseId={caseNumber || caseId}
          />
        );
      default:
        return (
          <LandingPage
            onStartCase={handleStartCase}
            onLearnMore={handleLearnMore}
          />
        );
    }
  };

  // Landing page renders its own layout with background and footer
  if (currentPage === 0) {
    return renderPage();
  }

  return (
    <>
      <PageLayout
        backgroundImage="/clouds.png"
        backgroundVideo="/cloudsloop.mov"
        onStartOver={handleStartOverClick}
      >
        {renderPage()}
      </PageLayout>
      <ConfirmModal
        isOpen={showStartOverModal}
        onClose={handleStartOverCancel}
        onConfirm={handleStartOverConfirm}
        title="Start Over"
        message="Would you like to discard all your selections and start from the beginning?"
        confirmLabel="Start Over"
        cancelLabel="Cancel"
      />
    </>
  );
}

export default App;
