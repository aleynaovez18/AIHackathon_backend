import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/design-system';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps
}) => (
  <View style={styles.container}>
    <View style={styles.progressBar}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${(currentStep / totalSteps) * 100}%` }
        ]} 
      />
    </View>
    <View style={styles.stepsContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            index < currentStep && styles.completedStep,
            index === currentStep - 1 && styles.activeStep
          ]}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
  },
  completedStep: {
    backgroundColor: COLORS.success,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.2 }],
  },
});