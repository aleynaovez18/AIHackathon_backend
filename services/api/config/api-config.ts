/**
 * API Configuration
 * Central configuration for all API settings
 */

export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URLS: {
    DEVELOPMENT: 'http://localhost:3000/api/v1',
    STAGING: 'https://staging-api.vakacoz.com/api/v1',
    PRODUCTION: 'https://api.vakacoz.com/api/v1'
  },
  
  // Get current base URL based on environment
  get BASE_URL() {
    if (__DEV__) {
      return this.BASE_URLS.DEVELOPMENT;
    }
    // In production, you might want to detect staging vs production
    return this.BASE_URLS.PRODUCTION;
  },
  
  // Request timeouts
  TIMEOUTS: {
    DEFAULT: 10000,     // 10 seconds
    UPLOAD: 30000,      // 30 seconds for file uploads
    DOWNLOAD: 60000     // 60 seconds for downloads
  },
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      VERIFY_EMAIL: '/auth/verify-email',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password'
    },
    
    // User management
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      AVATAR: '/users/avatar',
      PREFERENCES: '/users/preferences'
    },
    
    // Faculty and departments
    FACULTY: {
      DEPARTMENTS: '/faculty/departments',
      FACULTY_INFO: '/faculty/info'
    },
    
    // Cases
    CASES: {
      LIST: '/cases',
      BY_ID: (id: string) => `/cases/${id}`,
      BY_DEPARTMENT: (deptId: string) => `/cases/department/${deptId}`,
      SUBMIT_DIAGNOSIS: (caseId: string) => `/cases/${caseId}/diagnosis`,
      AI_HINT: (caseId: string) => `/cases/${caseId}/ai-hint`,
      PHARMACY_CONSULT: (caseId: string) => `/cases/${caseId}/pharmacy-consult`
    },
    
    // Progress and stats
    PROGRESS: {
      USER_STATS: '/progress/stats',
      LEADERBOARD: '/progress/leaderboard',
      ACHIEVEMENTS: '/progress/achievements',
      UPDATE_PROGRESS: '/progress/update'
    },
    
    // AI Services
    AI: {
      DIAGNOSIS_HINT: '/ai/diagnosis-hint',
      CASE_ANALYSIS: '/ai/case-analysis',
      DRUG_INTERACTIONS: '/ai/drug-interactions'
    }
  },
  
  // HTTP Status codes we handle
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  },
  
  // Headers
  HEADERS: {
    CONTENT_TYPE_JSON: 'application/json',
    CONTENT_TYPE_FORM: 'multipart/form-data',
    ACCEPT_JSON: 'application/json'
  }
};