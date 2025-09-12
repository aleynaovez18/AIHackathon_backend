import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING } from '@/constants/design-system';
import { Button } from '@/components/shared';

// Import organized components
import { OnboardingStep, StepIndicator, FormFields } from './components';

// Import hooks
import { useOnboardingForm, useStepNavigation } from './hooks';

const TOTAL_STEPS = 2;

const steps = [
  { 
    title: 'Kişisel Bilgiler', 
    subtitle: 'Adın ve soyadın nedir?', 
    icon: 'account' 
  },
  { 
    title: 'Eğitim Bilgilerin', 
    subtitle: 'Hangi üniversite ve fakültede okuyorsun?', 
    icon: 'school' 
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  
  // Use custom hooks
  const { formData, errors, updateFormData, validateStep } = useOnboardingForm();
  const {
    currentStep,
    nextStep,
    previousStep,
    canGoPrevious,
    isLastStep
  } = useStepNavigation(TOTAL_STEPS);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (isLastStep) {
        handleComplete();
      } else {
        nextStep();
      }
    }
  };

  const handleComplete = () => {
    // Save user data (in real app, this would go to API/AsyncStorage)
    Alert.alert(
      'Hoş geldin!',
      `Merhaba ${formData.firstName}! Profilen başarıyla oluşturuldu.`,
      [
        {
          text: 'Başla',
          onPress: () => router.replace('/departments')
        }
      ]
    );
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        {/* Step Header */}
        <OnboardingStep
          stepNumber={currentStep}
          totalSteps={TOTAL_STEPS}
          title={currentStepData.title}
          subtitle={currentStepData.subtitle}
          icon={currentStepData.icon}
          isActive={true}
        />
        
        {/* Form Fields */}
        <FormFields
          currentStep={currentStep}
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
        />
        
        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            {canGoPrevious && (
              <Button
                title="Geri"
                onPress={previousStep}
                variant="outline"
                icon="arrow-left"
                style={styles.backButton}
              />
            )}
            <Button
              title={isLastStep ? "Tamamla" : "Devam"}
              onPress={handleNext}
              variant="primary"
              icon={isLastStep ? "check" : "arrow-right"}
              style={styles.nextButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.xl + 20, // Extra padding for safe area
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});