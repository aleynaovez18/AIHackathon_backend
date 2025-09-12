/**
 * API Response Types
 * Type definitions for all API responses
 */

// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Error response structure
export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  code?: string;
  statusCode: number;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  faculty: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  faculty: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: 'tr' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    newCases: boolean;
    achievements: boolean;
  };
  privacy: {
    showProfile: boolean;
    showProgress: boolean;
  };
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  university?: string;
  faculty?: string;
}

// Faculty and Department Types
export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
  iconColor: string;
  caseCount: number;
  targetFaculty: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface FacultyInfo {
  id: string;
  name: string;
  departments: Department[];
  totalCases: number;
  features: string[];
}

// Case Types
export interface Case {
  id: string;
  title: string;
  description: string;
  departmentId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number; // in minutes
  symptoms: string[];
  patientInfo: {
    age: number;
    gender: 'Male' | 'Female';
    medicalHistory: string[];
    currentMedications: string[];
  };
  diagnosticTests?: {
    name: string;
    result: string;
    normalRange?: string;
  }[];
  isCompleted: boolean;
  userScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseListRequest {
  departmentId?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
  search?: string;
  isCompleted?: boolean;
}

export interface DiagnosisSubmission {
  caseId: string;
  selectedDiagnosis: string;
  reasoning?: string;
  aiHintUsed: boolean;
}

export interface DiagnosisResult {
  isCorrect: boolean;
  score: number;
  correctDiagnosis: string;
  explanation: string;
  learningPoints: string[];
  nextRecommendations: string[];
}

// AI Service Types
export interface AiHintRequest {
  caseId: string;
  currentSymptoms: string[];
  userProgress?: any;
}

export interface AiHintResponse {
  hint: string;
  suggestedQuestions: string[];
  confidence: number;
  reasoning: string;
}

export interface DrugInteractionRequest {
  medications: string[];
  patientInfo: {
    age: number;
    weight?: number;
    allergies?: string[];
    conditions?: string[];
  };
}

export interface DrugInteractionResponse {
  interactions: {
    drug1: string;
    drug2: string;
    severity: 'Low' | 'Medium' | 'High';
    description: string;
    recommendations: string[];
  }[];
  overallRisk: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

// Progress and Stats Types
export interface UserStats {
  totalCases: number;
  completedCases: number;
  correctDiagnoses: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number; // in minutes
  level: number;
  experiencePoints: number;
  nextLevelProgress: number;
  departmentStats: {
    departmentId: string;
    casesCompleted: number;
    averageScore: number;
    timeSpent: number;
  }[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Cases' | 'Accuracy' | 'Speed' | 'Streak' | 'Department';
  requirement: number;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  faculty: string;
  score: number;
  casesCompleted: number;
  rank: number;
}

export interface LeaderboardRequest {
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
  faculty?: string;
  limit?: number;
}

// Pharmacy Consultation Types
export interface PharmacyConsultRequest {
  caseId: string;
  selectedMedications: string[];
  notes?: string;
  consultationType: 'review' | 'recommendation' | 'interaction-check';
}

export interface PharmacyConsultResponse {
  consultationId: string;
  recommendations: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    reasoning: string;
    contraindications: string[];
  }[];
  interactions: {
    drug1: string;
    drug2: string;
    severity: string;
    description: string;
  }[];
  overallAssessment: string;
  pharmacistNotes?: string;
}

// File upload types
export interface FileUploadResponse {
  url: string;
  fileName: string;
  size: number;
  mimeType: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}