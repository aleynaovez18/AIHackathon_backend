import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  leftIcon?: string; // For backwards compatibility
  rightIcon?: string;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoComplete?: 'email' | 'name' | 'password' | 'new-password' | 'current-password' | 'off';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
  error?: string;
  maxLength?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  isPasswordVisible,
  onTogglePasswordVisibility,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  autoComplete,
  keyboardType = 'default',
  style,
  error,
  maxLength,
}) => {
  const isPasswordField = secureTextEntry && onTogglePasswordVisibility;
  
  // Convert leftIcon to iconName for backwards compatibility
  const actualIconName = iconName || (leftIcon as keyof typeof Ionicons.glyphMap);
  
  // Map MaterialCommunityIcons to Ionicons equivalents
  const getIoniconName = (iconStr: string): keyof typeof Ionicons.glyphMap => {
    const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
      'email': 'mail-outline',
      'lock': 'lock-closed-outline',
      'lock-check': 'checkmark-circle-outline',
      'eye': 'eye-outline',
      'eye-off': 'eye-off-outline',
    };
    return iconMap[iconStr] || iconStr as keyof typeof Ionicons.glyphMap;
  };

  return (
    <View style={[styles.inputContainer, style]}>
      {actualIconName && (
        <Ionicons 
          name={getIoniconName(actualIconName as string)} 
          size={20} 
          color={styles.inputIcon.color} 
          style={styles.inputIcon}
        />
      )}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {(isPasswordField || rightIcon) && (
        <TouchableOpacity 
          onPress={isPasswordField ? onTogglePasswordVisibility : onRightIconPress}
          style={styles.passwordToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={isPasswordField 
              ? (isPasswordVisible ? "eye-outline" : "eye-off-outline")
              : getIoniconName(rightIcon || '')
            } 
            size={20} 
            color="#94a3b8"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,
  inputIcon: {
    marginRight: 12,
    color: '#94a3b8',
  } as TextStyle,
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#0d171b',
    paddingVertical: 4,
  } as TextStyle,
  passwordToggle: {
    padding: 4,
  } as ViewStyle,
});

export default CustomInput;