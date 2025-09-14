import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface EmailVerificationFormProps {
  verificationCode: string;
  isLoading: boolean;
  timeLeft: number;
  canResend: boolean;
  onCodeChange: (code: string) => void;
  onVerify: () => void;
  onResendCode: () => void;
  formatTime: (seconds: number) => string;
}

export const EmailVerificationForm: React.FC<EmailVerificationFormProps> = ({
  verificationCode,
  isLoading,
  timeLeft,
  canResend,
  onCodeChange,
  onVerify,
  onResendCode,
  formatTime,
}) => (
  <View style={styles.container}>
    {/* Form Section */}
    <View style={styles.formSection}>
      {/* Code Input */}
      <View style={styles.codeSection}>
        <Text style={styles.inputLabel}>Doğrulama Kodu</Text>
        <TextInput
          style={styles.codeInput}
          placeholder="6 haneli kod"
          placeholderTextColor={COLORS.textMuted}
          value={verificationCode}
          onChangeText={onCodeChange}
          keyboardType="numeric"
          maxLength={6}
          autoFocus
        />
        <Text style={styles.codeHelper}>
          E-posta adresinize gönderilen 6 haneli kodu girin
        </Text>
      </View>

      {/* Timer Section */}
      <View style={styles.timerSection}>
        {timeLeft > 0 ? (
          <View style={styles.timerContainer}>
            <MaterialCommunityIcons name="timer" size={20} color={COLORS.warning} />
            <Text style={styles.timerText}>
              Kodu tekrar gönderebilmek için: {formatTime(timeLeft)}
            </Text>
          </View>
        ) : (
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Kodu almadınız mı?</Text>
            <Pressable
              onPress={onResendCode}
              disabled={!canResend || isLoading}
              style={styles.resendButton}
            >
              <Text style={[
                styles.resendButtonText,
                (!canResend || isLoading) && styles.disabledText
              ]}>
                Tekrar Gönder
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>

    {/* Verify Button */}
    <View style={styles.buttonSection}>
      <Pressable
        style={({ pressed }) => [
          styles.verifyButton,
          (verificationCode.length !== 6 || isLoading) && styles.disabledButton,
          pressed && styles.pressedButton
        ]}
        onPress={onVerify}
        disabled={verificationCode.length !== 6 || isLoading}
      >
        <View style={styles.buttonContent}>
          {isLoading ? (
            <MaterialCommunityIcons name="loading" size={20} color={COLORS.cardBackground} />
          ) : (
            <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.cardBackground} />
          )}
          <Text style={styles.verifyButtonText}>
            {isLoading ? 'Doğrulanıyor...' : 'İşlemi Tamamla'}
          </Text>
        </View>
      </Pressable>

      {/* Info Text */}
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="information" size={16} color={COLORS.textMuted} />
        <Text style={styles.infoText}>
          Doğrulama kodu 5 dakika süreyle geçerlidir
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formSection: {
    gap: SPACING.xl,
  },
  codeSection: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    textAlign: 'center',
  },
  codeInput: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    textAlign: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.border,
    letterSpacing: 8,
    minWidth: 200,
    ...SHADOWS.small,
  },
  codeHelper: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  timerSection: {
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.warning + '10',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
  },
  timerText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warning,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  resendContainer: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  resendText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  resendButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  resendButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
  buttonSection: {
    gap: SPACING.md,
    paddingTop: SPACING.lg,
  },
  verifyButton: {
    backgroundColor: COLORS.success,
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
  verifyButtonText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});