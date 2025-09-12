/**
 * API Integration Hook
 * Custom hook to replace current mock data with real API calls
 */

import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { 
  authService, 
  userService, 
  caseService, 
  progressService, 
  facultyService,
  ErrorUtils,
  BaseApiError
} from '../api';
import type { 
  User, 
  UserStats, 
  Case, 
  Department,
  LoginRequest,
  RegisterRequest 
} from '../api';

/**
 * Hook for authentication operations
 */
export const useApiAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      const message = ErrorUtils.getUserFriendlyMessage(error);
      Alert.alert('Giriş Hatası', message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      const message = ErrorUtils.getUserFriendlyMessage(error);
      Alert.alert('Kayıt Hatası', message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus
  };
};

/**
 * Hook for user profile operations
 */
export const useApiUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const profile = await userService.getProfile();
      setUser(profile);
      return profile;
    } catch (error) {
      console.error('Failed to get profile:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateProfile(updates);
      setUser(updatedUser);
      return true;
    } catch (error) {
      const message = ErrorUtils.getUserFriendlyMessage(error);
      Alert.alert('Güncelleme Hatası', message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    getProfile,
    updateProfile
  };
};

/**
 * Hook for case operations
 */
export const useApiCases = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);

  const getCases = async (params: any = {}) => {
    setIsLoading(true);
    try {
      const response = await caseService.getCases(params);
      setCases(response.data);
      return response;
    } catch (error) {
      console.error('Failed to get cases:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCaseById = async (caseId: string) => {
    setIsLoading(true);
    try {
      const case_ = await caseService.getCaseById(caseId);
      return case_;
    } catch (error) {
      console.error('Failed to get case:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const submitDiagnosis = async (submission: any) => {
    setIsLoading(true);
    try {
      const result = await caseService.submitDiagnosis(submission);
      return result;
    } catch (error) {
      const message = ErrorUtils.getUserFriendlyMessage(error);
      Alert.alert('Gönderim Hatası', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cases,
    isLoading,
    getCases,
    getCaseById,
    submitDiagnosis
  };
};

/**
 * Hook for progress and statistics
 */
export const useApiProgress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);

  const getUserStats = async () => {
    setIsLoading(true);
    try {
      const userStats = await progressService.getUserStats();
      setStats(userStats);
      return userStats;
    } catch (error) {
      console.error('Failed to get user stats:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (caseId: string, score: number, timeSpent: number) => {
    try {
      const updatedStats = await progressService.updateProgress(caseId, score, timeSpent);
      setStats(updatedStats);
      return updatedStats;
    } catch (error) {
      console.error('Failed to update progress:', error);
      return null;
    }
  };

  return {
    stats,
    isLoading,
    getUserStats,
    updateProgress
  };
};

/**
 * Hook for faculty and departments
 */
export const useApiFaculty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const getDepartments = async (faculty?: string) => {
    setIsLoading(true);
    try {
      const depts = faculty 
        ? await facultyService.getDepartmentsByFaculty(faculty)
        : await facultyService.getDepartments();
      setDepartments(depts);
      return depts;
    } catch (error) {
      console.error('Failed to get departments:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    departments,
    isLoading,
    getDepartments
  };
};

/**
 * Generic API hook with error handling
 */
export const useApiCall = <T>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<BaseApiError | null>(null);

  const execute = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const apiError = err as BaseApiError;
      setError(apiError);
      
      // Show user-friendly error message
      const message = ErrorUtils.getUserFriendlyMessage(apiError);
      Alert.alert('Hata', message);
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    execute
  };
};