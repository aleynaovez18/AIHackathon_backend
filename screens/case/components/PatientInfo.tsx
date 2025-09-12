import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { Patient } from '../types/case.types';

interface PatientInfoProps {
  patient: Patient;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Patient Information</Text>
    <View style={styles.patientGrid}>
      <View style={styles.patientItem}>
        <Text style={styles.patientLabel}>Age</Text>
        <Text style={styles.patientValue}>{patient.age}</Text>
      </View>
      <View style={styles.patientItem}>
        <Text style={styles.patientLabel}>Gender</Text>
        <Text style={styles.patientValue}>{patient.gender}</Text>
      </View>
      <View style={styles.patientItem}>
        <Text style={styles.patientLabel}>Weight</Text>
        <Text style={styles.patientValue}>{patient.weight}</Text>
      </View>
      <View style={styles.patientItem}>
        <Text style={styles.patientLabel}>Height</Text>
        <Text style={styles.patientValue}>{patient.height}</Text>
      </View>
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
  patientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  patientItem: {
    flex: 1,
    minWidth: '45%',
  },
  patientLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  patientValue: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.text,
  },
});