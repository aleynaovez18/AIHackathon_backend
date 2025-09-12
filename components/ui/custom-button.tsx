import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const variantStyle = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const variantTextStyle = variant === 'primary' ? styles.primaryText : styles.secondaryText;

  return (
    <TouchableOpacity
      style={[styles.baseButton, variantStyle, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.baseText, variantTextStyle, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
  },
  disabledButton: {
    opacity: 0.6,
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#0d171b',
  },
  disabledText: {
    opacity: 0.9,
  },
});

export default CustomButton;





