import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { UserProfile } from '../types/profile.types';

interface ProfileCardProps {
  user: UserProfile;
  onEditAvatar: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEditAvatar }) => (
  <View style={styles.profileCard}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatarBackground}>
        <MaterialCommunityIcons name="account" size={48} color={COLORS.primary} />
      </View>
      <Pressable style={styles.editAvatarButton} onPress={onEditAvatar}>
        <MaterialCommunityIcons name="camera" size={16} color={COLORS.cardBackground} />
      </Pressable>
    </View>

    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.profileTitle}>{user.title}</Text>
      <Text style={styles.profileUniversity}>{user.university}</Text>
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.casesCompleted}</Text>
        <Text style={styles.statLabel}>Çözülen Vaka</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.badges}</Text>
        <Text style={styles.statLabel}>Rozet</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.successRate}%</Text>
        <Text style={styles.statLabel}>Başarı Oranı</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xlarge,
    padding: SPACING.xxl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.large,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.xl,
  },
  avatarBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.cardBackground,
    ...SHADOWS.medium,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  profileName: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profileTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginBottom: SPACING.xs,
  },
  profileUniversity: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
});