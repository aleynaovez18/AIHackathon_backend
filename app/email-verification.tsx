import React, { useState, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

// Components
import { EmailVerificationForm, EmailVerificationHeader } from '@/screens/auth/components';

export default function EmailVerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Hata', 'Lütfen 6 haneli doğrulama kodunu girin');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      Alert.alert(
        'Başarılı!',
        'Kayıtınız başarıyla tamamlandı. Giriş sayfasına yönlendiriliyorsunuz.',
        [
          {
            text: 'Tamam',
            onPress: () => router.replace('/login')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Hata', 'Doğrulama kodu geçersiz veya süresi dolmuş');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTimeLeft(300);
      setCanResend(false);
      Alert.alert('Başarılı', 'Doğrulama kodu tekrar gönderildi');
    } catch (error) {
      Alert.alert('Hata', 'Kod gönderilirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContent}>
          {/* Header */}
          <EmailVerificationHeader 
            title="E-posta Doğrulama"
            subtitle={`${email} adresine gönderilen 6 haneli doğrulama kodunu girin.`}
            onBack={() => router.back()}
          />

          {/* Content Section */}
          <View style={styles.contentContainer}>
            <EmailVerificationForm
              verificationCode={verificationCode}
              isLoading={isLoading}
              timeLeft={timeLeft}
              canResend={canResend}
              onCodeChange={setVerificationCode}
              onVerify={handleVerify}
              onResendCode={handleResendCode}
              formatTime={formatTime}
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