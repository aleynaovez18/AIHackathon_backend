import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING } from '@/constants/design-system';

// Components
import { LoginHeader, LoginForm, LoginActions } from './components';

// Hooks  
import { useLoginForm } from './hooks';

// Constants
const LOGIN_CONSTANTS = {
  IMAGES: {
    HEADER_URL: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3'
  },
  TITLE: 'Hoş Geldiniz',
  SUBTITLE: 'Tıp eğitim platformuna giriş yapın ve AI destekli vaka çözümlerine başlayın.',
};

export default function LoginScreen() {
  const {
    formData,
    errors,
    isPasswordVisible,
    isValid,
    isLoading,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    handleLogin,
    handleGoogleLogin,
    handleSignUp,
  } = useLoginForm();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContent}>
          {/* Header Image and Title */}
          <LoginHeader 
            imageUrl={LOGIN_CONSTANTS.IMAGES.HEADER_URL}
            title={LOGIN_CONSTANTS.TITLE}
            subtitle={LOGIN_CONSTANTS.SUBTITLE}
          />

          {/* Content Section */}
          <View style={styles.contentContainer}>
            {/* Login Form */}
            <LoginForm
              formData={formData}
              errors={errors}
              isPasswordVisible={isPasswordVisible}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onTogglePasswordVisibility={togglePasswordVisibility}
            />
          </View>

          {/* Bottom Section with Buttons */}
          <View style={styles.bottomSection}>
            <LoginActions
              isValid={isValid}
              isLoading={isLoading}
              onLogin={handleLogin}
              onGoogleLogin={handleGoogleLogin}
              onSignUp={handleSignUp}
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    justifyContent: 'center',
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
  },
});