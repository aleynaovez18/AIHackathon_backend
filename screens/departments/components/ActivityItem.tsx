import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface ActivityItemProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ 
  icon, title, subtitle, color 
}) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: color + '15' }]}>
      <MaterialCommunityIcons name={icon as any} size={20} color={color} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activitySubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.small,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  activityTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.text,
  },
  activitySubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
});