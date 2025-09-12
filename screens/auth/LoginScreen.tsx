import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
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
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.cardBackground,
  },
});