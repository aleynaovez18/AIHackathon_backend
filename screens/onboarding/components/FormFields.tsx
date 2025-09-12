import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@/components/shared';
import { FacultySelector } from '@/components/shared/FacultySelector';
import { SPACING } from '@/constants/design-system';

interface FormFieldsProps {
  currentStep: number;
  formData: any;
  updateFormData: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  currentStep,
  formData,
  updateFormData,
  errors
}) => {
  const renderStepFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input
              label="Adın"
              placeholder="Adınızı girin"
              value={formData.firstName}
              onChangeText={(value) => updateFormData('firstName', value)}
              icon="account"
              error={errors.firstName}
            />
            <Input
              label="Soyadın"
              placeholder="Soyadınızı girin"
              value={formData.lastName}
              onChangeText={(value) => updateFormData('lastName', value)}
              icon="account"
              error={errors.lastName}
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              label="Üniversite"
              placeholder="Üniversitenizi girin"
              value={formData.university}
              onChangeText={(value) => updateFormData('university', value)}
              icon="school"
              error={errors.university}
            />
            <FacultySelector
              label="Fakülte"
              value={formData.faculty}
              onValueChange={(value) => updateFormData('faculty', value)}
              error={errors.faculty}
            />
          </>
        );
      case 3:
        return (
          <>
            {/* Step 3 fields removed - no longer needed */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStepFields()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
});