import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface ProgressIndicatorProps {
  selectedCount: number;
  totalCount: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  selectedCount, 
  totalCount 
}) => {
  const progressPercentage = (selectedCount / totalCount) * 100;

  return (
    <View style={styles.progressSection}>
      <Text style={styles.progressTitle}>Case Progress</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {selectedCount} of {totalCount} symptoms analyzed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  progressTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});