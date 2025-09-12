import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';

interface CaseActionsProps {
  selectedSymptomsCount: number;
  onStartDiagnosis: () => void;
  onPharmacyConsult: () => void;
}

export const CaseActions: React.FC<CaseActionsProps> = ({ 
  selectedSymptomsCount, 
  onStartDiagnosis, 
  onPharmacyConsult 
}) => (
  <View style={styles.actionSection}>
    <Pressable 
      style={[styles.primaryAction, selectedSymptomsCount === 0 && styles.disabledAction]} 
      onPress={onStartDiagnosis}
      disabled={selectedSymptomsCount === 0}
    >
      <MaterialCommunityIcons name="stethoscope" size={20} color={COLORS.cardBackground} />
      <Text style={styles.primaryActionText}>Start Diagnosis</Text>
    </Pressable>
    <Pressable style={styles.secondaryAction} onPress={onPharmacyConsult}>
      <MaterialCommunityIcons name="pill" size={20} color={COLORS.primary} />
      <Text style={styles.secondaryActionText}>Consult Pharmacy</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  actionSection: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  primaryAction: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  primaryActionText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  secondaryAction: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  secondaryActionText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  disabledAction: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.6,
  },
});