import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false, title: 'Login' }} />
        <Stack.Screen name="user-onboarding" options={{ headerShown: false, title: 'Kullanıcı Bilgileri' }} />
        <Stack.Screen name="welcome" options={{ headerShown: false, title: 'Welcome' }} />
        <Stack.Screen name="departments" options={{ headerShown: false, title: 'Bölümler' }} />
        <Stack.Screen name="profile" options={{ headerShown: false, title: 'Profil' }} />
        <Stack.Screen name="cases" options={{ headerShown: false, title: 'Çözülen Vakalar' }} />
        <Stack.Screen name="case" options={{ headerShown: false, title: 'Vaka' }} />
        <Stack.Screen name="case-session" options={{ headerShown: false, title: 'Vaka Oturumu' }} />
        <Stack.Screen name="case-guess" options={{ headerShown: false, title: 'Vaka Tahmin' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
