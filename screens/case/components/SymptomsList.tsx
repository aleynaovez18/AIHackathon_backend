import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface SymptomsListProps {
  symptoms: string[];
  selectedSymptoms: string[];
  onSymptomSelect: (symptom: string) => void;
}

export const SymptomsList: React.FC<SymptomsListProps> = ({ 
  symptoms, 
  selectedSymptoms, 
  onSymptomSelect 
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Symptoms</Text>
    <Text style={styles.sectionSubtitle}>Tap to select relevant symptoms</Text>
    {symptoms.map((symptom, index) => {
      const isSelected = selectedSymptoms.includes(symptom);
      return (
        <Pressable 
          key={index} 
          style={[styles.symptomItem, isSelected && styles.symptomSelected]}
          onPress={() => onSymptomSelect(symptom)}
        >
          <MaterialCommunityIcons 
            name={isSelected ? "check-circle" : "circle-outline"} 
            size={20} 
            color={isSelected ? COLORS.success : COLORS.textMuted} 
          />
          <Text style={[styles.symptomText, isSelected && styles.symptomTextSelected]}>
            {symptom}
          </Text>
        </Pressable>
      );
    })}
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
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.small,
  },
  symptomSelected: {
    backgroundColor: COLORS.success + '15',
    borderColor: COLORS.success,
    borderWidth: 1,
  },
  symptomText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  symptomTextSelected: {
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});