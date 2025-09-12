import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants/design-system';

// Components
import { WelcomeHero, WelcomeActions } from './components';

// Hooks
import { useWelcomeAnimations } from './hooks';

export default function WelcomeScreen() {
  const router = useRouter();
  const { fadeAnim, scaleAnim } = useWelcomeAnimations();

  const handleStartPress = (): void => {
    router.replace('/departments');
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar style="dark" />

      <WelcomeHero fadeAnim={fadeAnim} scaleAnim={scaleAnim} />
      
      <WelcomeActions onStart={handleStartPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});