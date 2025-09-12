/**
 * User Service
 * Handles user profile and preferences management
 */

import { httpClient } from '../client/http-client';
import { API_CONFIG } from '../config/api-config';
import { 
  User, 
  UpdateProfileRequest, 
  UserPreferences,
  FileUploadResponse 
} from '../types/api-types';

class UserService {
  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    const response = await httpClient.get<User>(API_CONFIG.ENDPOINTS.USERS.PROFILE);
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: UpdateProfileRequest): Promise<User> {
    const response = await httpClient.put<User>(
      API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
      updates
    );
    return response.data;
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(
    imageFile: FormData, 
    onProgress?: (progress: number) => void
  ): Promise<FileUploadResponse> {
    const response = await httpClient.uploadFile<FileUploadResponse>(
      API_CONFIG.ENDPOINTS.USERS.AVATAR,
      imageFile,
      onProgress
    );
    return response.data;
  }

  /**
   * Get user preferences
   */
  async getPreferences(): Promise<UserPreferences> {
    const response = await httpClient.get<UserPreferences>(
      API_CONFIG.ENDPOINTS.USERS.PREFERENCES
    );
    return response.data;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await httpClient.put<UserPreferences>(
      API_CONFIG.ENDPOINTS.USERS.PREFERENCES,
      preferences
    );
    return response.data;
  }

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<void> {
    await httpClient.delete(API_CONFIG.ENDPOINTS.USERS.PROFILE);
  }
}

// Singleton instance
export const userService = new UserService();