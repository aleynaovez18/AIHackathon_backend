import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface QuickActionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  icon, title, subtitle, color, onPress 
}) => (
  <Pressable 
    style={({ pressed }) => [
      styles.quickActionCard,
      pressed && styles.quickActionCardPressed
    ]}
    onPress={onPress}
  >
    <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
      <MaterialCommunityIcons name={icon as any} size={28} color={color} />
    </View>
    <Text style={styles.quickActionTitle}>{title}</Text>
    <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  quickActionCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    alignItems: 'center',
    gap: SPACING.md,
    ...SHADOWS.small,
    minHeight: 120,
  },
  quickActionCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});