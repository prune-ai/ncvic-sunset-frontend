import { useState } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { LandingPage } from "./pages/LandingPage";
import { StartCasePage } from "./pages/StartCasePage";
import { WhatHappenedPage } from "./pages/WhatHappenedPage";
import { AddEvidencePage } from "./pages/AddEvidencePage";
import { ContactInfoPage } from "./pages/ContactInfoPage";
import { ConsentsPage } from "./pages/ConsentsPage";
import { SuccessPage } from "./pages/SuccessPage";
import { api, ApiClientError } from "./lib/api";

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = landing page
  const [formId, setFormId] = useState<string | undefined>(undefined);
  const [caseId, setCaseId] = useState<string | undefined>(undefined);
  const [caseNumber, setCaseNumber] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

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

      // Save page 5 data if provided
      if (pageData) {
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
          />
        );
      case 2:
        return (
          <WhatHappenedPage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
          />
        );
      case 3:
        return (
          <AddEvidencePage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
          />
        );
      case 4:
        return (
          <ContactInfoPage
            onBack={handleBack}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
          />
        );
      case 5:
        return (
          <ConsentsPage
            onBack={handleBack}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
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

  return <PageLayout backgroundImage="/clouds.png">{renderPage()}</PageLayout>;
}

export default App;
