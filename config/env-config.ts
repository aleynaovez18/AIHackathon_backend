/**
 * Environment Configuration
 * Centralized configuration for different environments
 */

export const ENV_CONFIG = {
  // Environment detection
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
  
  // API Configuration
  API: {
    // Toggle this to switch between mock and real API
    USE_REAL_API: false,
    
    // Mock API settings (for development without backend)
    MOCK: {
      ENABLE_LOGGING: true,
      SIMULATE_DELAYS: true,
      DEFAULT_DELAY: 1000, // ms
      SIMULATE_ERRORS: false,
      ERROR_RATE: 0.1, // 10% error rate for testing
    },
    
    // Real API settings
    REAL: {
      ENABLE_REQUEST_LOGGING: true,
      ENABLE_RESPONSE_LOGGING: true,
      RETRY_ATTEMPTS: 3,
      RETRY_DELAY: 1000, // ms
    }
  },
  
  // Features flags
  FEATURES: {
    AI_HINTS: true,
    PHARMACY_CONSULTATION: true,
    ACHIEVEMENTS: true,
    LEADERBOARD: true,
    PUSH_NOTIFICATIONS: false, // Will be enabled later
    OFFLINE_MODE: false, // Will be enabled later
  },
  
  // UI Configuration
  UI: {
    SHOW_DEBUG_INFO: __DEV__,
    SHOW_API_STATUS: __DEV__,
    ENABLE_PERFORMANCE_MONITORING: !__DEV__,
  },
  
  // Storage Configuration
  STORAGE: {
    USE_SECURE_STORAGE: true,
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    MAX_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
  },
  
  // App Configuration
  APP: {
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
    MINIMUM_API_VERSION: '1.0',
    FORCE_UPDATE_VERSION: '1.0.0',
  }
};

/**
 * Get environment-specific configuration
 */
export const getEnvConfig = () => {
  return {
    ...ENV_CONFIG,
    // Override with environment-specific settings
    ...(ENV_CONFIG.isDevelopment ? {
      API: {
        ...ENV_CONFIG.API,
        USE_REAL_API: false, // Force mock in development
      }
    } : {}),
  };
};

/**
 * Feature flag checker
 */
export const isFeatureEnabled = (feature: keyof typeof ENV_CONFIG.FEATURES): boolean => {
  return ENV_CONFIG.FEATURES[feature];
};

/**
 * Development utilities
 */
export const DevUtils = {
  log: (message: string, data?: any) => {
    if (ENV_CONFIG.UI.SHOW_DEBUG_INFO) {
      console.log(`🚀 [VakaÇöz] ${message}`, data || '');
    }
  },
  
  warn: (message: string, data?: any) => {
    if (ENV_CONFIG.UI.SHOW_DEBUG_INFO) {
      console.warn(`⚠️ [VakaÇöz] ${message}`, data || '');
    }
  },
  
  error: (message: string, error?: any) => {
    if (ENV_CONFIG.UI.SHOW_DEBUG_INFO) {
      console.error(`❌ [VakaÇöz] ${message}`, error || '');
    }
  },
  
  apiCall: (method: string, url: string, data?: any) => {
    if (ENV_CONFIG.API.REAL.ENABLE_REQUEST_LOGGING) {
      console.log(`📡 [API] ${method.toUpperCase()} ${url}`, data ? { data } : '');
    }
  },
  
  apiResponse: (method: string, url: string, status: number, data?: any) => {
    if (ENV_CONFIG.API.REAL.ENABLE_RESPONSE_LOGGING) {
      const statusEmoji = status >= 200 && status < 300 ? '✅' : '❌';
      console.log(`${statusEmoji} [API] ${method.toUpperCase()} ${url} - ${status}`, data ? { data } : '');
    }
  }
};