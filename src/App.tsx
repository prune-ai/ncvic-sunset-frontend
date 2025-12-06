import { useState } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { LandingPage } from "./pages/LandingPage";
import { StartCasePage } from "./pages/StartCasePage";
import { WhatHappenedPage } from "./pages/WhatHappenedPage";
import { AddEvidencePage } from "./pages/AddEvidencePage";
import { ContactInfoPage } from "./pages/ContactInfoPage";
import { ConsentsPage } from "./pages/ConsentsPage";
import { SuccessPage } from "./pages/SuccessPage";

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = landing page
  const [caseId, setCaseId] = useState<string | undefined>(undefined);

  const handleStartCase = () => {
    setCurrentPage(1); // Navigate to page 1 of the form
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 1) {
      setCurrentPage(0); // Go back to landing page from page 1
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted!");
    // TODO: Submit form data to backend and get case ID
    // For now, set a placeholder case ID
    setCaseId("CASE-12345");
    setCurrentPage(6); // Navigate to success page
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
        return <StartCasePage onBack={handleBack} onNext={handleNext} />;
      case 2:
        return <WhatHappenedPage onBack={handleBack} onNext={handleNext} />;
      case 3:
        return <AddEvidencePage onBack={handleBack} onNext={handleNext} />;
      case 4:
        return <ContactInfoPage onBack={handleBack} onNext={handleNext} />;
      case 5:
        return <ConsentsPage onBack={handleBack} onSubmit={handleSubmit} />;
      case 6:
        return (
          <SuccessPage
            onGoToPortal={handleGoToPortal}
            onAddMoreEvidence={handleAddMoreEvidence}
            onCopyCaseId={handleCopyCaseId}
            caseId={caseId}
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
