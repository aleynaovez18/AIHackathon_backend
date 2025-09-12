/**
 * API Error Classes
 * Custom error classes for different types of API errors
 */

import { ApiError } from '../types/api-types';

/**
 * Base API Error class
 */
export class BaseApiError extends Error implements ApiError {
  public success: false = false;
  public statusCode: number;
  public errors?: string[];
  public code?: string;

  constructor(message: string, statusCode: number = 0, errors?: string[], code?: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = code;
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Network Error - for connection issues
 */
export class NetworkError extends BaseApiError {
  constructor(message: string = 'Network connection failed') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

/**
 * Validation Error - for form validation issues
 */
export class ValidationError extends BaseApiError {
  constructor(message: string, errors: string[] = []) {
    super(message, 422, errors);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
  }
}

/**
 * Authentication Error - for auth issues
 */
export class AuthenticationError extends BaseApiError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
    this.code = 'AUTH_ERROR';
  }
}

/**
 * Authorization Error - for permission issues
 */
export class AuthorizationError extends BaseApiError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
    this.name = 'AuthorizationError';
    this.code = 'AUTHORIZATION_ERROR';
  }
}

/**
 * Not Found Error - for 404 responses
 */
export class NotFoundError extends BaseApiError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
    this.code = 'NOT_FOUND';
  }
}

/**
 * Conflict Error - for 409 responses
 */
export class ConflictError extends BaseApiError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
    this.name = 'ConflictError';
    this.code = 'CONFLICT';
  }
}

/**
 * Server Error - for 500+ responses
 */
export class ServerError extends BaseApiError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
    this.name = 'ServerError';
    this.code = 'SERVER_ERROR';
  }
}

/**
 * Rate Limit Error - for rate limiting
 */
export class RateLimitError extends BaseApiError {
  public retryAfter?: number;

  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429);
    this.name = 'RateLimitError';
    this.code = 'RATE_LIMIT';
    this.retryAfter = retryAfter;
  }
}

/**
 * Service Unavailable Error - for maintenance/downtime
 */
export class ServiceUnavailableError extends BaseApiError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
    this.code = 'SERVICE_UNAVAILABLE';
  }
}

/**
 * Timeout Error - for request timeouts
 */
export class TimeoutError extends BaseApiError {
  constructor(message: string = 'Request timeout') {
    super(message, 408);
    this.name = 'TimeoutError';
    this.code = 'TIMEOUT';
  }
}

/**
 * Error factory to create appropriate error instances
 */
export class ApiErrorFactory {
  static createFromResponse(error: any): BaseApiError {
    const status = error.response?.status || 0;
    const message = error.response?.data?.message || error.message || 'Unknown error';
    const errors = error.response?.data?.errors || [];
    const code = error.response?.data?.code;

    switch (status) {
      case 400:
        return new ValidationError(message, errors);
      case 401:
        return new AuthenticationError(message);
      case 403:
        return new AuthorizationError(message);
      case 404:
        return new NotFoundError(message);
      case 409:
        return new ConflictError(message);
      case 422:
        return new ValidationError(message, errors);
      case 429:
        const retryAfter = error.response?.headers?.['retry-after'];
        return new RateLimitError(message, retryAfter ? parseInt(retryAfter) : undefined);
      case 500:
      case 502:
      case 504:
        return new ServerError(message);
      case 503:
        return new ServiceUnavailableError(message);
      case 408:
        return new TimeoutError(message);
      default:
        if (status === 0 || !error.response) {
          return new NetworkError(message);
        }
        return new BaseApiError(message, status, errors, code);
    }
  }
}

/**
 * Error utilities
 */
export class ErrorUtils {
  /**
   * Check if error is a network error
   */
  static isNetworkError(error: any): boolean {
    return error instanceof NetworkError || 
           (!error.response && error.request);
  }

  /**
   * Check if error is an authentication error
   */
  static isAuthError(error: any): boolean {
    return error instanceof AuthenticationError || 
           error.statusCode === 401;
  }

  /**
   * Check if error is a validation error
   */
  static isValidationError(error: any): boolean {
    return error instanceof ValidationError || 
           error.statusCode === 422;
  }

  /**
   * Check if error is retryable
   */
  static isRetryableError(error: any): boolean {
    return error instanceof NetworkError ||
           error instanceof TimeoutError ||
           error instanceof ServerError ||
           error instanceof ServiceUnavailableError ||
           (error.statusCode >= 500);
  }

  /**
   * Get user-friendly error message
   */
  static getUserFriendlyMessage(error: any): string {
    if (error instanceof NetworkError) {
      return 'İnternet bağlantınızı kontrol edin';
    }
    
    if (error instanceof AuthenticationError) {
      return 'Lütfen tekrar giriş yapın';
    }
    
    if (error instanceof ValidationError) {
      return error.errors?.[0] || 'Girdiğiniz bilgileri kontrol edin';
    }
    
    if (error instanceof ServerError) {
      return 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin';
    }
    
    if (error instanceof ServiceUnavailableError) {
      return 'Servis geçici olarak kullanılamıyor';
    }
    
    return error.message || 'Beklenmeyen bir hata oluştu';
  }
}