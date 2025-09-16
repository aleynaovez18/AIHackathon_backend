import React from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { LoginFormData, LoginFormErrors } from '../types/auth.types';

export const useLoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = React.useState<LoginFormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const setEmail = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const setPassword = (password: string) => {
    setFormData(prev => ({ ...prev, password }));
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Giriş', 'Giriş başarılı!');
      router.push('/departments');
    } catch (error) {
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Giriş', 'Google ile giriş yapılıyor...');
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const isValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  return {
    formData,
    errors,
    isPasswordVisible,
    isValid,
    isLoading,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    validateForm,
    handleLogin,
    handleGoogleLogin,
    handleSignUp,
  };
};