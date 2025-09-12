/**
 * Progress Service
 * Handles user progress, statistics, and achievements
 */

import { httpClient } from '../client/http-client';
import { API_CONFIG } from '../config/api-config';
import { 
  UserStats, 
  Achievement, 
  LeaderboardEntry, 
  LeaderboardRequest,
  PaginatedResponse 
} from '../types/api-types';

class ProgressService {
  /**
   * Get user statistics
   */
  async getUserStats(): Promise<UserStats> {
    const response = await httpClient.get<UserStats>(
      API_CONFIG.ENDPOINTS.PROGRESS.USER_STATS
    );
    return response.data;
  }

  /**
   * Update user progress after completing a case
   */
  async updateProgress(caseId: string, score: number, timeSpent: number): Promise<UserStats> {
    const response = await httpClient.post<UserStats>(
      API_CONFIG.ENDPOINTS.PROGRESS.UPDATE_PROGRESS,
      {
        caseId,
        score,
        timeSpent
      }
    );
    return response.data;
  }

  /**
   * Get user achievements
   */
  async getAchievements(): Promise<Achievement[]> {
    const response = await httpClient.get<Achievement[]>(
      API_CONFIG.ENDPOINTS.PROGRESS.ACHIEVEMENTS
    );
    return response.data;
  }

  /**
   * Get leaderboard
   */
  async getLeaderboard(params: LeaderboardRequest): Promise<PaginatedResponse<LeaderboardEntry>> {
    const response = await httpClient.get<PaginatedResponse<LeaderboardEntry>>(
      API_CONFIG.ENDPOINTS.PROGRESS.LEADERBOARD,
      { params }
    );
    return response.data;
  }

  /**
   * Get user's rank in leaderboard
   */
  async getUserRank(period: 'daily' | 'weekly' | 'monthly' | 'all-time' = 'all-time'): Promise<{
    rank: number;
    totalUsers: number;
    percentile: number;
  }> {
    const response = await httpClient.get<{
      rank: number;
      totalUsers: number;
      percentile: number;
    }>(
      `${API_CONFIG.ENDPOINTS.PROGRESS.LEADERBOARD}/rank`,
      { params: { period } }
    );
    return response.data;
  }

  /**
   * Get progress comparison with peers
   */
  async getProgressComparison(): Promise<{
    userStats: UserStats;
    facultyAverage: {
      averageScore: number;
      casesCompleted: number;
      timeSpent: number;
    };
    universityAverage: {
      averageScore: number;
      casesCompleted: number;
      timeSpent: number;
    };
  }> {
    const response = await httpClient.get<{
      userStats: UserStats;
      facultyAverage: {
        averageScore: number;
        casesCompleted: number;
        timeSpent: number;
      };
      universityAverage: {
        averageScore: number;
        casesCompleted: number;
        timeSpent: number;
      };
    }>(
      `${API_CONFIG.ENDPOINTS.PROGRESS.USER_STATS}/comparison`
    );
    return response.data;
  }

  /**
   * Get department-specific progress
   */
  async getDepartmentProgress(departmentId: string): Promise<{
    departmentId: string;
    casesCompleted: number;
    averageScore: number;
    timeSpent: number;
    rank: number;
    totalStudents: number;
    strongAreas: string[];
    improvementAreas: string[];
  }> {
    const response = await httpClient.get<{
      departmentId: string;
      casesCompleted: number;
      averageScore: number;
      timeSpent: number;
      rank: number;
      totalStudents: number;
      strongAreas: string[];
      improvementAreas: string[];
    }>(
      `${API_CONFIG.ENDPOINTS.PROGRESS.USER_STATS}/department/${departmentId}`
    );
    return response.data;
  }

  /**
   * Get learning analytics
   */
  async getLearningAnalytics(): Promise<{
    studyPattern: {
      preferredTimeOfDay: string;
      averageSessionLength: number;
      studyStreak: number;
    };
    performanceMetrics: {
      accuracyTrend: number[];
      speedImprovement: number;
      difficultyProgression: string;
    };
    recommendations: string[];
  }> {
    const response = await httpClient.get<{
      studyPattern: {
        preferredTimeOfDay: string;
        averageSessionLength: number;
        studyStreak: number;
      };
      performanceMetrics: {
        accuracyTrend: number[];
        speedImprovement: number;
        difficultyProgression: string;
      };
      recommendations: string[];
    }>(
      `${API_CONFIG.ENDPOINTS.PROGRESS.USER_STATS}/analytics`
    );
    return response.data;
  }
}

// Singleton instance
export const progressService = new ProgressService();