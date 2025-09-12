import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';
import { UserProgress } from '@/utils/progress-manager';

interface HeroSectionProps {
  greeting: string;
  userName: string;
  facultyName: string;
  userProgress: UserProgress;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  greeting,
  userName,
  facultyName,
  userProgress
}) => (
  <View style={styles.heroSection}>
    <View style={styles.heroBackground}>
      <View style={styles.heroContent}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.userNameText}>{userName} 👋</Text>
          <Text style={styles.facultyText}>{facultyName}</Text>
        </View>
        
        <View style={styles.heroStats}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="trophy" size={20} color={COLORS.warning} />
            <Text style={styles.statNumber}>{userProgress.completedCases}</Text>
            <Text style={styles.statLabel}>Çözülen</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="fire" size={20} color={COLORS.error} />
            <Text style={styles.statNumber}>{userProgress.currentStreak}</Text>
            <Text style={styles.statLabel}>Seri</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="star" size={20} color={COLORS.accent} />
            <Text style={styles.statNumber}>Lv.{userProgress.level}</Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  heroSection: {
    height: 320,
    marginBottom: SPACING.lg,
  },
  heroBackground: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: BORDER_RADIUS.xlarge,
    borderBottomRightRadius: BORDER_RADIUS.xlarge,
    paddingTop: 60,
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    justifyContent: 'space-between',
  },
  greetingContainer: {
    marginBottom: SPACING.lg,
  },
  greetingText: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.cardBackground + 'DD',
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginBottom: SPACING.xs,
  },
  userNameText: {
    fontSize: TYPOGRAPHY.fontSizes.xxl + 6,
    color: COLORS.cardBackground,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    lineHeight: 32,
  },
  facultyText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.cardBackground + 'BB',
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginTop: SPACING.xs,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground + '25',
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.xs,
    minHeight: 80,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xl + 2,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.cardBackground,
    lineHeight: 24,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.cardBackground + 'CC',
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textAlign: 'center',
  },
});