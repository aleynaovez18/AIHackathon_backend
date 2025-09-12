import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GoogleIconProps {
  size?: number;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({ size = 20 }) => {
  const iconSize = {
    width: size,
    height: size,
  };

  const partSize = size * 0.4;

  return (
    <View style={[styles.googleIcon, iconSize]}>
      <View style={[styles.googleIconPart1, { width: partSize, height: partSize * 0.8 }]} />
      <View style={[styles.googleIconPart2, { width: partSize * 1.2, height: partSize * 0.8 }]} />
      <View style={[styles.googleIconPart3, { width: partSize * 0.8, height: partSize * 1.2 }]} />
      <View style={[styles.googleIconPart4, { width: partSize * 0.8, height: partSize * 0.8 }]} />
    </View>
  );
};

interface GoogleLoginButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onPress,
  title = 'Google ile Giriş Yap',
  disabled = false,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.googleButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.googleButtonContent}>
        <GoogleIcon size={20} />
        <Text style={[styles.googleButtonText, disabled && styles.disabledText]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  disabledButton: {
    opacity: 0.6,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleButtonText: {
    color: '#0d171b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.7,
  },
  googleIcon: {
    position: 'relative',
  },
  googleIconPart1: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4285F4',
    borderRadius: 2,
  },
  googleIconPart2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#34A853',
    borderRadius: 2,
  },
  googleIconPart3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#FBBC05',
    borderRadius: 2,
  },
  googleIconPart4: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#EA4335',
    borderRadius: 2,
  },
});

export default GoogleLoginButton;