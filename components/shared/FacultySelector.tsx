import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface FacultySelectorProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
}

const FACULTY_OPTIONS = [
  {
    id: 'tip',
    value: 'Tıp Fakültesi',
    label: 'Tıp Fakültesi',
    icon: 'stethoscope',
    color: COLORS.primary,
    description: 'Tıp eğitimi ve hastalık tanı vakalarına odaklanın'
  },
  {
    id: 'eczacilik',
    value: 'Eczacılık Fakültesi',
    label: 'Eczacılık Fakültesi',
    icon: 'pill',
    color: COLORS.accent,
    description: 'İlaç bilimi ve farmakoloji vakalarına odaklanın'
  }
];

export const FacultySelector: React.FC<FacultySelectorProps> = ({
  label,
  value,
  onValueChange,
  error
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.optionsContainer}>
        {FACULTY_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <Pressable
              key={option.id}
              style={({ pressed }) => [
                styles.optionCard,
                isSelected && styles.selectedCard,
                pressed && styles.pressedCard,
                error && !isSelected && styles.errorCard
              ]}
              onPress={() => onValueChange(option.value)}
            >
              <View style={[styles.iconContainer, { backgroundColor: option.color + '15' }]}>
                <MaterialCommunityIcons 
                  name={option.icon as any} 
                  size={28} 
                  color={isSelected ? COLORS.cardBackground : option.color} 
                />
              </View>
              
              <View style={styles.contentContainer}>
                <Text style={[styles.optionTitle, isSelected && styles.selectedTitle]}>
                  {option.label}
                </Text>
                <Text style={[styles.optionDescription, isSelected && styles.selectedDescription]}>
                  {option.description}
                </Text>
              </View>
              
              <View style={styles.checkContainer}>
                <MaterialCommunityIcons 
                  name={isSelected ? "radiobox-marked" : "radiobox-blank"} 
                  size={24} 
                  color={isSelected ? COLORS.cardBackground : COLORS.textMuted} 
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  optionsContainer: {
    gap: SPACING.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  pressedCard: {
    transform: [{ scale: 0.98 }],
  },
  errorCard: {
    borderColor: COLORS.error,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  contentContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  selectedTitle: {
    color: COLORS.cardBackground,
  },
  optionDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  selectedDescription: {
    color: COLORS.cardBackground + 'CC',
  },
  checkContainer: {
    marginLeft: SPACING.sm,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.error,
    marginTop: SPACING.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});