/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { httpClient } from '../client/http-client';
import { API_CONFIG } from '../config/api-config';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  RefreshTokenRequest,
  User 
} from '../types/api-types';
import { TokenManager } from '../client/token-manager';

class AuthService {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store tokens after successful login
    if (response.success && response.data.tokens) {
      await this.tokenManager.setTokens(
        response.data.tokens.accessToken,
        response.data.tokens.refreshToken,
        response.data.tokens.expiresIn
      );
    }

    return response.data;
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      userData
    );

    // Store tokens after successful registration
    if (response.success && response.data.tokens) {
      await this.tokenManager.setTokens(
        response.data.tokens.accessToken,
        response.data.tokens.refreshToken,
        response.data.tokens.expiresIn
      );
    }

    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = await this.tokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH,
      { refreshToken } as RefreshTokenRequest
    );

    // Update stored tokens
    if (response.success && response.data.tokens) {
      await this.tokenManager.setTokens(
        response.data.tokens.accessToken,
        response.data.tokens.refreshToken,
        response.data.tokens.expiresIn
      );
    }

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate tokens on server
      await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with local cleanup even if server call fails
      if (__DEV__) {
        console.warn('Logout API call failed:', error);
      }
    } finally {
      // Always clear local tokens
      await this.tokenManager.clearTokens();
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<void> {
    await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password: newPassword
    });
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await this.tokenManager.isAuthenticated();
  }

  /**
   * Get current user info (if authenticated)
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return null;
      }

      const response = await httpClient.get<User>(API_CONFIG.ENDPOINTS.USERS.PROFILE);
      return response.success ? response.data : null;
    } catch (error) {
      if (__DEV__) {
        console.error('Failed to get current user:', error);
      }
      return null;
    }
  }

  /**
   * Get token info (for debugging)
   */
  async getTokenInfo() {
    return await this.tokenManager.getTokenInfo();
  }
}

// Singleton instance
export const authService = new AuthService();