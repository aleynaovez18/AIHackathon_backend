import React from 'react';
import { Pressable, View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { Department } from '@/constants/faculty-system';
import { CaseStats, formatCaseCount } from '@/utils/case-calculator';

const { width: screenWidth } = Dimensions.get('window');

interface DepartmentCardProps {
  department: Department;
  caseStats?: CaseStats;
  onPress: () => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ 
  department, caseStats, onPress 
}) => (
  <Pressable 
    style={({ pressed }) => [
      styles.departmentCard,
      pressed && styles.departmentCardPressed
    ]}
    onPress={onPress}
  >
    <View style={[styles.departmentIcon, { backgroundColor: department.color }]}>
      <Text style={[styles.departmentIconText, { color: department.iconColor }]}>
        {department.iconName.substring(0,1).toUpperCase()}
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.departmentName}>{department.name}</Text>
      <Text style={styles.departmentDescription} numberOfLines={3}>
        {department.description}
      </Text>
    </View>
    <View style={styles.departmentFooter}>
      <Text style={styles.caseCount}>
        {caseStats ? formatCaseCount(caseStats) : `${department.caseCount} vaka`}
      </Text>
      <MaterialCommunityIcons name="arrow-right" size={16} color={COLORS.textLight} />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  departmentCard: {
    width: (screenWidth - SPACING.lg * 2 - SPACING.md) / 2,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    gap: SPACING.md,
    ...SHADOWS.small,
    minHeight: 160,
  },
  departmentCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  departmentIcon: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  departmentIconText: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  departmentName: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    lineHeight: 20,
  },
  departmentDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    lineHeight: 18,
    flex: 1,
  },
  departmentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  caseCount: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});