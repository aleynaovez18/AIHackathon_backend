import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';

interface LogoutSectionProps {
  onLogout: () => void;
}

export const LogoutSection: React.FC<LogoutSectionProps> = ({ onLogout }) => (
  <View style={styles.logoutSection}>
    <Pressable
      style={({ pressed }) => [
        styles.logoutButton,
        pressed && styles.logoutButtonPressed
      ]}
      onPress={onLogout}
    >
      <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
      <Text style={styles.logoutText}>Çıkış Yap</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  logoutSection: {
    marginTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutButtonPressed: {
    backgroundColor: '#fef2f2',
  },
  logoutText: {
    marginLeft: SPACING.sm,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: '#ef4444',
  },
});