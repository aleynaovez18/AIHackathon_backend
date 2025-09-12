import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color: string;
  backgroundColor?: string;
  textColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  color,
  backgroundColor = COLORS.cardBackground + '25',
  textColor = COLORS.cardBackground
}) => (
  <View style={[styles.statCard, { backgroundColor }]}>
    <MaterialCommunityIcons name={icon as any} size={20} color={color} />
    <Text style={[styles.statNumber, { color: textColor }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: textColor + 'CC' }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.xs,
    minHeight: 80,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xl + 2,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    lineHeight: 24,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textAlign: 'center',
  },
});