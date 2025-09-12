import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  secureTextEntry = false,
  isPasswordVisible,
  onTogglePasswordVisibility,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  keyboardType = 'default',
  style,
}) => {
  const isPasswordField = secureTextEntry && onTogglePasswordVisibility;

  return (
    <View style={[styles.inputContainer, style]}>
      <Ionicons 
        name={iconName} 
        size={20} 
        color={styles.inputIcon.color} 
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
      />
      {isPasswordField && (
        <TouchableOpacity 
          onPress={onTogglePasswordVisibility}
          style={styles.passwordToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
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