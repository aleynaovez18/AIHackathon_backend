import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { ProfileMenuItem } from '../types/profile.types';

interface MenuItemProps {
  item: ProfileMenuItem;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => (
  <Pressable
    style={({ pressed }) => [
      styles.menuItem,
      pressed && styles.menuItemPressed
    ]}
    onPress={item.onPress}
  >
    <View style={[styles.menuIconContainer, { backgroundColor: item.color + '15' }]}>
      <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
    </View>
    
    <View style={styles.menuContent}>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        {item.subtitle && (
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      
      <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textLight} />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '40',
  },
  menuItemPressed: {
    backgroundColor: COLORS.background,
    transform: [{ scale: 0.98 }],
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  menuSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.sm,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.cardBackground,
  },
});