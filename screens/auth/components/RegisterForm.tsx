import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import CustomInput from '@/components/ui/custom-input';

interface RegisterFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: Record<string, string>;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
  isValid: boolean;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  onRegister: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  errors,
  isPasswordVisible,
  isConfirmPasswordVisible,
  isValid,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onRegister,
}) => (
  <View style={styles.container}>
    {/* Form Fields */}
    <View style={styles.formSection}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-posta Adresi</Text>
        <CustomInput
          placeholder="ornek@email.com"
          value={formData.email}
          onChangeText={onEmailChange}
          leftIcon="email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          error={errors.email}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Şifre</Text>
        <CustomInput
          placeholder="En az 6 karakter"
          value={formData.password}
          onChangeText={onPasswordChange}
          leftIcon="lock"
          rightIcon={isPasswordVisible ? "eye-off" : "eye"}
          onRightIconPress={onTogglePasswordVisibility}
          secureTextEntry={!isPasswordVisible}
          autoComplete="new-password"
          error={errors.password}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Şifre Tekrarı</Text>
        <CustomInput
          placeholder="Şifrenizi tekrar girin"
          value={formData.confirmPassword}
          onChangeText={onConfirmPasswordChange}
          leftIcon="lock-check"
          rightIcon={isConfirmPasswordVisible ? "eye-off" : "eye"}
          onRightIconPress={onToggleConfirmPasswordVisibility}
          secureTextEntry={!isConfirmPasswordVisible}
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
      </View>
    </View>

    {/* Register Button */}
    <View style={styles.buttonSection}>
      <Pressable
        style={({ pressed }) => [
          styles.registerButton,
          (!isValid || isLoading) && styles.disabledButton,
          pressed && styles.pressedButton
        ]}
        onPress={onRegister}
        disabled={!isValid || isLoading}
      >
        <View style={styles.buttonContent}>
          {isLoading ? (
            <MaterialCommunityIcons name="loading" size={20} color={COLORS.cardBackground} />
          ) : (
            <MaterialCommunityIcons name="account-plus" size={20} color={COLORS.cardBackground} />
          )}
          <Text style={styles.registerButtonText}>
            {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
          </Text>
        </View>
      </Pressable>

      {/* Privacy Notice */}
      <Text style={styles.privacyText}>
        Kayıt olarak{' '}
        <Text style={styles.linkText}>Kullanım Şartları</Text>
        {' '}ve{' '}
        <Text style={styles.linkText}>Gizlilik Politikası</Text>
        {''}nı kabul etmiş olursunuz.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formSection: {
    gap: SPACING.lg,
  },
  inputContainer: {
    gap: SPACING.sm,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  buttonSection: {
    gap: SPACING.md,
    paddingTop: SPACING.lg,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...SHADOWS.medium,
  },
  disabledButton: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.6,
  },
  pressedButton: {
    transform: [{ scale: 0.96 }],
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  registerButtonText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  privacyText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
});