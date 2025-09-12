import React from 'react';

export interface FormData {
  firstName: string;
  lastName: string;
  university: string;
  faculty: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  university: '',
  faculty: ''
};

export const useOnboardingForm = () => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'Ad gerekli';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Soyad gerekli';
        }
        break;
      case 2:
        if (!formData.university.trim()) {
          newErrors.university = 'Üniversite gerekli';
        }
        if (!formData.faculty.trim()) {
          newErrors.faculty = 'Fakülte gerekli';
        } else if (!['Tıp Fakültesi', 'Eczacılık Fakültesi'].includes(formData.faculty)) {
          newErrors.faculty = 'Geçerli fakülte seçin (Tıp/Eczacılık)';
        }
        break;
      case 3:
        // Step 3 validation removed - no longer needed
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    errors,
    updateFormData,
    validateStep,
    resetForm
  };
};
