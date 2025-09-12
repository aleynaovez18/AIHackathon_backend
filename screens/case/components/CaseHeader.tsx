import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface CaseHeaderProps {
  title: string;
  difficulty: string;
  onAiAnalysis: () => void;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({ title, difficulty, onAiAnalysis }) => (
  <View style={styles.headerContent}>
    <View style={styles.caseHeader}>
      <View style={styles.titleContainer}>
        <Text style={styles.caseTitle} numberOfLines={2}>{title}</Text>
        <View style={[styles.difficultyBadge, getDifficultyStyle(difficulty)]}>
          <MaterialCommunityIcons 
            name={getDifficultyIcon(difficulty)} 
            size={14} 
            color={getDifficultyColor(difficulty)} 
          />
          <Text style={[styles.difficultyText, { color: getDifficultyColor(difficulty) }]}>
            {difficulty}
          </Text>
        </View>
      </View>
      <Text style={styles.headerTitle}>Case Analysis</Text>
    </View>
    <Pressable 
      style={({ pressed }) => [
        styles.aiButton,
        pressed && styles.aiButtonPressed
      ]} 
      onPress={onAiAnalysis}
    >
      <View style={styles.aiButtonContent}>
        <MaterialCommunityIcons name="robot" size={20} color={COLORS.cardBackground} />
        <Text style={styles.aiButtonText}>AI</Text>
      </View>
    </Pressable>
  </View>
);

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
    case 'kolay':
      return 'star';
    case 'intermediate':
    case 'orta':
      return 'star-half-full';
    case 'hard':
    case 'zor':
      return 'star-outline';
    default:
      return 'help-circle';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
    case 'kolay':
      return COLORS.success;
    case 'intermediate':
    case 'orta':
      return COLORS.warning;
    case 'hard':
    case 'zor':
      return COLORS.error;
    default:
      return COLORS.textMuted;
  }
};

const getDifficultyStyle = (difficulty: string) => {
  const color = getDifficultyColor(difficulty);
  return {
    backgroundColor: color + '15',
    borderColor: color + '30',
  };
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: SPACING.md,
  },
  caseHeader: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: SPACING.sm,
  },
  caseTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
    alignSelf: 'flex-start',
    borderWidth: 1,
    gap: SPACING.xs,
  },
  difficultyText: {
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    fontSize: TYPOGRAPHY.fontSizes.sm,
  },
  aiButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    ...SHADOWS.small,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiButtonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: COLORS.accent,
  },
  aiButtonContent: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  aiButtonText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.xs,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
});