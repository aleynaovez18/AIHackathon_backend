/**
 * API Index
 * Central export point for all API services
 */

// Configuration
export { API_CONFIG } from './config/api-config';

// Types
export * from './types/api-types';

// Client
export { httpClient } from './client/http-client';
export { TokenManager } from './client/token-manager';

// Errors
export * from './errors/api-errors';

// Services
export { authService } from './auth/auth-service';
export { userService } from './user/user-service';
export { caseService } from './case/case-service';
export { progressService } from './progress/progress-service';
export { facultyService } from './faculty/faculty-service';
export { aiService } from './ai/ai-service';

// Import services for convenience object
import { authService } from './auth/auth-service';
import { userService } from './user/user-service';
import { caseService } from './case/case-service';
import { progressService } from './progress/progress-service';
import { facultyService } from './faculty/faculty-service';
import { aiService } from './ai/ai-service';

// Service instances for convenience
export const apiServices = {
  auth: authService,
  user: userService,
  case: caseService,
  progress: progressService,
  faculty: facultyService,
  ai: aiService,
};