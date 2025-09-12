/**
 * Token Manager
 * Secure token storage and management
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'vakacoz_access_token',
  REFRESH_TOKEN: 'vakacoz_refresh_token',
  TOKEN_EXPIRY: 'vakacoz_token_expiry',
};

export class TokenManager {
  private useSecureStore: boolean;

  constructor() {
    // Use SecureStore on mobile, AsyncStorage on web
    this.useSecureStore = Platform.OS !== 'web';
  }

  /**
   * Store tokens securely
   */
  async setTokens(accessToken: string, refreshToken: string, expiresIn?: number): Promise<void> {
    try {
      const expiryTime = expiresIn ? Date.now() + (expiresIn * 1000) : null;

      if (this.useSecureStore) {
        await Promise.all([
          SecureStore.setItemAsync(TOKEN_KEYS.ACCESS_TOKEN, accessToken),
          SecureStore.setItemAsync(TOKEN_KEYS.REFRESH_TOKEN, refreshToken),
          expiryTime ? SecureStore.setItemAsync(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString()) : Promise.resolve(),
        ]);
      } else {
        await Promise.all([
          AsyncStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken),
          AsyncStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken),
          expiryTime ? AsyncStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString()) : Promise.resolve(),
        ]);
      }

      if (__DEV__) {
        console.log('🔐 Tokens stored successfully');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Failed to store tokens:', error);
      }
      throw new Error('Failed to store authentication tokens');
    }
  }

  /**
   * Get access token
   */
  async getAccessToken(): Promise<string | null> {
    try {
      const token = this.useSecureStore
        ? await SecureStore.getItemAsync(TOKEN_KEYS.ACCESS_TOKEN)
        : await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);

      // Check if token is expired
      if (token && await this.isTokenExpired()) {
        if (__DEV__) {
          console.log('🔐 Access token expired');
        }
        return null;
      }

      return token;
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Failed to get access token:', error);
      }
      return null;
    }
  }

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      return this.useSecureStore
        ? await SecureStore.getItemAsync(TOKEN_KEYS.REFRESH_TOKEN)
        : await AsyncStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Failed to get refresh token:', error);
      }
      return null;
    }
  }

  /**
   * Check if access token is expired
   */
  async isTokenExpired(): Promise<boolean> {
    try {
      const expiryString = this.useSecureStore
        ? await SecureStore.getItemAsync(TOKEN_KEYS.TOKEN_EXPIRY)
        : await AsyncStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);

      if (!expiryString) {
        return false; // If no expiry time, assume token is still valid
      }

      const expiryTime = parseInt(expiryString, 10);
      const currentTime = Date.now();
      
      // Add 5 minute buffer to refresh token before actual expiry
      const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      return (currentTime + bufferTime) >= expiryTime;
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Failed to check token expiry:', error);
      }
      return true; // If we can't check, assume expired for safety
    }
  }

  /**
   * Clear all tokens
   */
  async clearTokens(): Promise<void> {
    try {
      if (this.useSecureStore) {
        await Promise.all([
          SecureStore.deleteItemAsync(TOKEN_KEYS.ACCESS_TOKEN).catch(() => {}),
          SecureStore.deleteItemAsync(TOKEN_KEYS.REFRESH_TOKEN).catch(() => {}),
          SecureStore.deleteItemAsync(TOKEN_KEYS.TOKEN_EXPIRY).catch(() => {}),
        ]);
      } else {
        await Promise.all([
          AsyncStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN),
          AsyncStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN),
          AsyncStorage.removeItem(TOKEN_KEYS.TOKEN_EXPIRY),
        ]);
      }

      if (__DEV__) {
        console.log('🔐 Tokens cleared successfully');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Failed to clear tokens:', error);
      }
      throw new Error('Failed to clear authentication tokens');
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();
    
    // User is authenticated if they have either a valid access token or a refresh token
    return !!(accessToken || refreshToken);
  }

  /**
   * Get token info for debugging
   */
  async getTokenInfo(): Promise<{
    hasAccessToken: boolean;
    hasRefreshToken: boolean;
    isExpired: boolean;
    expiryTime?: number;
  }> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();
    const isExpired = await this.isTokenExpired();
    
    let expiryTime: number | undefined;
    try {
      const expiryString = this.useSecureStore
        ? await SecureStore.getItemAsync(TOKEN_KEYS.TOKEN_EXPIRY)
        : await AsyncStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
      
      if (expiryString) {
        expiryTime = parseInt(expiryString, 10);
      }
    } catch (error) {
      // Ignore error
    }

    return {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      isExpired,
      expiryTime,
    };
  }
}