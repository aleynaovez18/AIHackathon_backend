import React from 'react';

export const useStepNavigation = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canGoNext = currentStep < totalSteps;
  const canGoPrevious = currentStep > 1;
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return {
    currentStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
    isLastStep,
    isFirstStep
  };
};