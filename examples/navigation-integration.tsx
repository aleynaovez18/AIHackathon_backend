// Example of how to integrate the login screen into your navigation
// Add this to your app/_layout.tsx or create a new stack navigator

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{
          title: 'Giriş',
          headerShown: false, // Hide header for login screen
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: 'Kayıt Ol',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}

// If you want to make login the default screen, update your app/(tabs)/index.tsx:
/*
import { useEffect } from 'react';
import { router } from 'expo-router';
import AuthService from '@/services/auth';

export default function HomeScreen() {
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await AuthService.getInstance().isAuthenticated();
      if (!isAuthenticated) {
        router.replace('/login');
      }
    };
    
    checkAuth();
  }, []);

  // Your existing home screen content
  return (
    // ... existing content
  );
}
*/