import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

// Components
import { RegisterForm, RegisterHeader } from '@/screens/auth/components';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifre tekrarı gereklidir';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to email verification screen
      router.push({
        pathname: '/email-verification',
        params: { email: formData.email }
      });
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = Boolean(
    formData.email && 
    formData.password && 
    formData.confirmPassword && 
    formData.password === formData.confirmPassword
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContent}>
          {/* Header */}
          <RegisterHeader 
            title="Hesap Oluşturun"
            subtitle="Tıp eğitim platformuna katılın ve AI destekli vaka çözümlerine başlayın."
            onBack={() => router.back()}
          />

          {/* Content Section */}
          <View style={styles.contentContainer}>
            <RegisterForm
              formData={formData}
              errors={errors}
              isPasswordVisible={isPasswordVisible}
              isConfirmPasswordVisible={isConfirmPasswordVisible}
              isValid={isValid}
              isLoading={isLoading}
              onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
              onPasswordChange={(password) => setFormData(prev => ({ ...prev, password }))}
              onConfirmPasswordChange={(confirmPassword) => setFormData(prev => ({ ...prev, confirmPassword }))}
              onTogglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
              onToggleConfirmPasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              onRegister={handleRegister}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    justifyContent: 'center',
  },
});