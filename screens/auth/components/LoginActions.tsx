import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import CustomButton from '@/components/ui/custom-button';
import GoogleLoginButton from '@/components/ui/google-login-button';

interface LoginActionsProps {
  isValid: boolean;
  isLoading: boolean;
  onLogin: () => void;
  onGoogleLogin: () => void;
  onSignUp: () => void;
}

export const LoginActions: React.FC<LoginActionsProps> = ({ 
  isValid, 
  isLoading, 
  onLogin, 
  onGoogleLogin, 
  onSignUp 
}) => (
  <View style={styles.buttonSection}>
    {/* Enhanced Login Button */}
    <Pressable
      style={({ pressed }) => [
        styles.primaryButton,
        (!isValid || isLoading) && styles.disabledButton,
        pressed && styles.pressedButton
      ]}
      onPress={onLogin}
      disabled={!isValid || isLoading}
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <MaterialCommunityIcons name="loading" size={20} color={COLORS.cardBackground} />
        ) : (
          <MaterialCommunityIcons name="login" size={20} color={COLORS.cardBackground} />
        )}
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Text>
      </View>
    </Pressable>

    {/* Divider */}
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>veya</Text>
      <View style={styles.dividerLine} />
    </View>

    {/* Enhanced Google Button */}
    <Pressable
      style={({ pressed }) => [
        styles.googleButton,
        pressed && styles.pressedButton
      ]}
      onPress={onGoogleLogin}
    >
      <View style={styles.buttonContent}>
        <MaterialCommunityIcons name="google" size={20} color={COLORS.text} />
        <Text style={styles.googleButtonText}>Google ile Giriş Yap</Text>
      </View>
    </Pressable>

    {/* Enhanced Sign Up */}
    <View style={styles.signUpSection}>
      <Text style={styles.signUpQuestion}>Hesabınız yok mu?</Text>
      <TouchableOpacity onPress={onSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Kayıt Olun</Text>
        <MaterialCommunityIcons name="arrow-right" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  buttonSection: {
    gap: SPACING.md,                     // Reduced from lg to md
    paddingHorizontal: SPACING.xl,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,                // Reduced from lg + 2 to lg
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,                      // Reduced from 58 to 52
    ...SHADOWS.large,                   // Enhanced shadow
    // Add gradient-like effect with stronger shadow
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  disabledButton: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.6,
    shadowOpacity: 0.1,                 // Reduced shadow when disabled
  },
  pressedButton: {
    transform: [{ scale: 0.96 }],       // More pronounced press effect
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
    letterSpacing: 0.5,                 // Better letter spacing
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,         // Better spacing
  },
  dividerLine: {
    flex: 1,
    height: 1.5,                        // Slightly thicker line
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: SPACING.lg,       // More spacing
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.semibold, // Bolder text
    backgroundColor: COLORS.cardBackground, // Background for better readability
    paddingHorizontal: SPACING.sm,
  },
  googleButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,                // Reduced from lg + 2 to lg
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,                      // Reduced from 58 to 52
    borderWidth: 2,
    borderColor: COLORS.primary + '20', // Subtle colored border
    ...SHADOWS.medium,                  // Add shadow
  },
  googleButtonText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    letterSpacing: 0.3,                 // Better letter spacing
  },
  signUpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.md,              // Reduced from lg to md
    paddingVertical: SPACING.sm,        // Add vertical padding
  },
  signUpQuestion: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium, // Slightly bolder
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,        // More padding
    paddingHorizontal: SPACING.md,      // More padding
    borderRadius: BORDER_RADIUS.medium, // Add border radius
    backgroundColor: COLORS.primary + '10', // Subtle background
  },
  signUpText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    letterSpacing: 0.2,                 // Better letter spacing
  },
});