import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { Vitals } from '../types/case.types';

interface VitalSignsProps {
  vitals: Vitals;
}

export const VitalSigns: React.FC<VitalSignsProps> = ({ vitals }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Vital Signs</Text>
    <View style={styles.vitalsGrid}>
      {Object.entries(vitals).map(([key, value]) => (
        <View key={key} style={styles.vitalCard}>
          <Text style={styles.vitalLabel}>{key.toUpperCase()}</Text>
          <Text style={styles.vitalValue}>{value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  vitalCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.primary + '10',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.small,
    alignItems: 'center',
  },
  vitalLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  vitalValue: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
  },
});