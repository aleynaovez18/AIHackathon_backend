import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '@/constants/design-system';

// Components
import { ProfileCard, MenuItem, LogoutSection } from './components';

// Hooks
import { useProfileData } from './hooks';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, menuItems, handleLogout, handleEditAvatar } = useProfileData();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.headerShadow}>
        <View style={styles.headerContainer}>
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            style={styles.headerIconButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Profil</Text>
          <Pressable accessibilityRole="button" hitSlop={8} style={styles.headerIconButton}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={COLORS.textMuted} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <ProfileCard user={user} onEditAvatar={handleEditAvatar} />

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>

        {/* Logout Button */}
        <LogoutSection onLogout={handleLogout} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerShadow: {
    ...SHADOWS.small,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
  },
  headerIconButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  menuSection: {
    marginBottom: SPACING.lg,
  },
});