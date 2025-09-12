import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';

interface OnboardingStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  icon: string;
  isActive: boolean;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  stepNumber,
  totalSteps,
  title,
  subtitle,
  icon,
  isActive
}) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepHeader}>
      <View style={[styles.stepIcon, isActive && styles.activeStepIcon]}>
        <MaterialCommunityIcons 
          name={icon as any} 
          size={24} 
          color={isActive ? COLORS.cardBackground : COLORS.textMuted} 
        />
      </View>
      <View style={styles.stepInfo}>
        <Text style={styles.stepCounter}>Adım {stepNumber}/{totalSteps}</Text>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepSubtitle}>{subtitle}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepIcon: {
    backgroundColor: COLORS.primary,
  },
  stepInfo: {
    flex: 1,
  },
  stepCounter: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginBottom: SPACING.xs,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    marginBottom: SPACING.xs,
  },
  stepSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
});