import { useState, useCallback } from 'react';
import { validateFieldValue } from '../utils/fieldDetection';

interface FormField {
  name: string;
  type: string;
  value: any;
  error?: string;
  required?: boolean;
}

interface UseFormStateProps {
  initialFields: FormField[];
  onSubmit?: (values: Record<string, any>) => void;
}

export function useFormState({ initialFields, onSubmit }: UseFormStateProps) {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = useCallback((field: FormField): string | undefined => {
    if (field.required && !field.value) {
      return 'This field is required';
    }

    if (field.value && !validateFieldValue(field.value, field.type)) {
      return `Invalid ${field.type} format`;
    }

    return undefined;
  }, []);

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const updatedFields = fields.map(field => {
      const error = validateField(field);
      if (error) isValid = false;
      return { ...field, error };
    });

    setFields(updatedFields);
    return isValid;
  }, [fields, validateField]);

  const handleChange = useCallback((name: string, value: any) => {
    setFields(prevFields => 
      prevFields.map(field => 
        field.name === name
          ? { ...field, value, error: undefined }
          : field
      )
    );
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const values = fields.reduce((acc, field) => ({
        ...acc,
        [field.name]: field.value
      }), {});

      if (onSubmit) {
        await onSubmit(values);
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setFields(initialFields);
    setSubmitError(null);
  }, [initialFields]);

  const setFieldValue = useCallback((name: string, value: any) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.name === name
          ? { ...field, value, error: undefined }
          : field
      )
    );
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.name === name
          ? { ...field, error }
          : field
      )
    );
  }, []);

  return {
    fields,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateForm
  };
}
