import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '@/constants/design-system';

interface WelcomeActionsProps {
  onStart: () => void;
}

export const WelcomeActions: React.FC<WelcomeActionsProps> = ({ onStart }) => (
  <View style={styles.bottomContainer}>
    <Pressable
      accessibilityRole="button"
      onPress={onStart}
      style={({ pressed }) => [
        styles.primaryButton,
        pressed && styles.primaryButtonPressed
      ]}
    >
      <View style={styles.buttonGradient}>
        <View style={styles.buttonContent}>
          <Text style={styles.primaryButtonText}>Başla</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.cardBackground} />
        </View>
      </View>
    </Pressable>
    
    {/* Additional Info */}
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="shield-check" size={16} color={COLORS.success} />
        <Text style={styles.infoText}>Güvenli ve Ücretsiz</Text>
      </View>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="account-multiple" size={16} color={COLORS.primary} />
        <Text style={styles.infoText}>Binlerce Öğrenci</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  bottomContainer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  primaryButton: {
    borderRadius: BORDER_RADIUS.large,
    overflow: 'hidden',
    ...SHADOWS.large,
    marginBottom: SPACING.lg,
  },
  primaryButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonGradient: {
    height: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  primaryButtonText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    letterSpacing: 0.5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});