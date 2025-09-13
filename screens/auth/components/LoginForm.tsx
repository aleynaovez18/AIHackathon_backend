import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { LoginFormData, LoginFormErrors } from '../types/auth.types';

interface LoginFormProps {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isPasswordVisible: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTogglePasswordVisibility: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  formData, 
  errors, 
  isPasswordVisible, 
  onEmailChange, 
  onPasswordChange, 
  onTogglePasswordVisibility 
}) => (
  <View style={styles.formContainer}>
    {/* Email Input */}
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons 
          name="email-outline" 
          size={20} 
          color={COLORS.textMuted} 
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="E-posta adresinizi girin"
          placeholderTextColor={COLORS.textMuted}
          value={formData.email}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      {errors.email && (
        <Text style={styles.errorText}>{errors.email}</Text>
      )}
    </View>

    {/* Password Input */}
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons 
          name="lock-outline" 
          size={20} 
          color={COLORS.textMuted} 
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.textInput, styles.passwordInput]}
          placeholder="Şifrenizi girin"
          placeholderTextColor={COLORS.textMuted}
          value={formData.password}
          onChangeText={onPasswordChange}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <MaterialCommunityIcons 
          name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
          size={20} 
          color={COLORS.textMuted}
          style={styles.eyeIcon}
          onPress={onTogglePasswordVisibility}
        />
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  formContainer: {
    gap: SPACING.md,                     // Reduced from lg to md
  },
  inputContainer: {
    marginBottom: SPACING.xs,            // Reduced from sm to xs
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,         // Reduced from lg + 2 to md
    ...SHADOWS.medium,                   // Enhanced shadow
    // Add subtle gradient effect with background
    shadowColor: COLORS.primary + '20', // Tinted shadow
  },
  inputIcon: {
    marginRight: SPACING.md,
    opacity: 0.8,                        // Slightly more visible
  },
  textInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSizes.lg,   // Larger font
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    lineHeight: 22,                      // Better line height
  },
  passwordInput: {
    paddingRight: SPACING.md,
  },
  eyeIcon: {
    padding: SPACING.xs,
    opacity: 0.7,                        // Subtle but visible
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    marginTop: SPACING.sm,               // Better spacing
    marginLeft: SPACING.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold, // Bolder error text
    opacity: 0.9,                        // Slightly softer
  },
});