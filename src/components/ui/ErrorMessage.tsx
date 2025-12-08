interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return <div className="text-red-400 text-sm mt-4">{message}</div>;
}

