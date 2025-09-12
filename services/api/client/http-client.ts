/**
 * HTTP Client
 * Axios-based HTTP client with interceptors and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api-config';
import { ApiResponse, ApiError } from '../types/api-types';
import { TokenManager } from './token-manager';
import { NetworkError } from '../errors/api-errors';

class HttpClient {
  private axiosInstance: AxiosInstance;
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
    this.axiosInstance = this.createAxiosInstance();
    this.setupInterceptors();
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUTS.DEFAULT,
      headers: {
        'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE_JSON,
        'Accept': API_CONFIG.HEADERS.ACCEPT_JSON,
      },
    });
  }

  private setupInterceptors(): void {
    // Request interceptor - Add auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await this.tokenManager.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request in development
        if (__DEV__) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            data: config.data,
            params: config.params,
          });
        }
        
        return config;
      },
      (error) => {
        if (__DEV__) {
          console.error('❌ Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle responses and errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (__DEV__) {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }
        return response;
      },
      async (error) => {
        if (__DEV__) {
          console.error('❌ Response Error:', error.response?.data || error.message);
        }

        // Handle token refresh
        if (error.response?.status === 401) {
          const refreshed = await this.handleTokenRefresh();
          if (refreshed && error.config) {
            // Retry the original request
            return this.axiosInstance.request(error.config);
          } else {
            // Redirect to login
            await this.handleAuthFailure();
          }
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private async handleTokenRefresh(): Promise<boolean> {
    try {
      const refreshToken = await this.tokenManager.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
        { refreshToken }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
      
      await this.tokenManager.setTokens(accessToken, newRefreshToken);
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('Token refresh failed:', error);
      }
      return false;
    }
  }

  private async handleAuthFailure(): Promise<void> {
    await this.tokenManager.clearTokens();
    // You can emit an event here to redirect to login
    // EventEmitter.emit('auth:logout');
  }

  private normalizeError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        message: error.response.data?.message || 'Server error occurred',
        errors: error.response.data?.errors || [],
        code: error.response.data?.code,
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return new NetworkError('Network connection failed. Please check your internet connection.');
    } else {
      // Other error
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        errors: [],
        statusCode: 0,
      };
    }
  }

  // HTTP Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload with progress tracking
  async uploadFile<T>(
    url: string, 
    file: FormData, 
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, file, {
      headers: {
        'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE_FORM,
      },
      timeout: API_CONFIG.TIMEOUTS.UPLOAD,
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  }

  // Update base URL (useful for environment switching)
  updateBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  // Update timeout
  updateTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }

  // Get axios instance for direct usage if needed
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Singleton instance
export const httpClient = new HttpClient();