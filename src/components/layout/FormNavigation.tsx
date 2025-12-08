import { Button } from "../ui/Button";

interface FormNavigationProps {
  onBack: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  backLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
  disabled?: boolean;
  showBack?: boolean;
}

export function FormNavigation({
  onBack,
  onNext,
  onSubmit,
  isLoading = false,
  backLabel = "Back",
  nextLabel = "Next",
  submitLabel = "Submit & Create Case",
  disabled = false,
  showBack = true,
}: FormNavigationProps) {
  const handleAction = onSubmit || onNext;
  const actionLabel = onSubmit
    ? isLoading
      ? "Submitting..."
      : submitLabel
    : isLoading
      ? "Saving..."
      : nextLabel;

  return (
    <div className="flex items-center justify-between gap-2 w-full mt-4">
      {showBack && (
        <Button
          onClick={onBack}
          className="flex-1 lg:flex-none"
          disabled={isLoading}
        >
          {backLabel}
        </Button>
      )}
      {handleAction && (
        <Button
          onClick={handleAction}
          variant={onSubmit ? "primary" : undefined}
          className="flex-1 lg:flex-none"
          disabled={disabled || isLoading}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

