import { useState } from "react";

export interface FormData {
  [key: string]: unknown;
}

export function useFormData<T extends FormData>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);

  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFields = (updates: Partial<T>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  return {
    formData,
    updateField,
    updateFields,
    resetForm,
  };
}

