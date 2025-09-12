/**
 * Case Service
 * Handles all case-related API operations
 */

import { httpClient } from '../client/http-client';
import { API_CONFIG } from '../config/api-config';
import { 
  Case, 
  CaseListRequest, 
  DiagnosisSubmission, 
  DiagnosisResult,
  PaginatedResponse 
} from '../types/api-types';

class CaseService {
  /**
   * Get list of cases with filters and pagination
   */
  async getCases(params: CaseListRequest = {}): Promise<PaginatedResponse<Case>> {
    const response = await httpClient.get<PaginatedResponse<Case>>(
      API_CONFIG.ENDPOINTS.CASES.LIST,
      { params }
    );
    return response.data;
  }

  /**
   * Get case by ID
   */
  async getCaseById(caseId: string): Promise<Case> {
    const response = await httpClient.get<Case>(
      API_CONFIG.ENDPOINTS.CASES.BY_ID(caseId)
    );
    return response.data;
  }

  /**
   * Get cases by department
   */
  async getCasesByDepartment(
    departmentId: string, 
    params: Omit<CaseListRequest, 'departmentId'> = {}
  ): Promise<PaginatedResponse<Case>> {
    const response = await httpClient.get<PaginatedResponse<Case>>(
      API_CONFIG.ENDPOINTS.CASES.BY_DEPARTMENT(departmentId),
      { params }
    );
    return response.data;
  }

  /**
   * Submit diagnosis for a case
   */
  async submitDiagnosis(submission: DiagnosisSubmission): Promise<DiagnosisResult> {
    const response = await httpClient.post<DiagnosisResult>(
      API_CONFIG.ENDPOINTS.CASES.SUBMIT_DIAGNOSIS(submission.caseId),
      {
        selectedDiagnosis: submission.selectedDiagnosis,
        reasoning: submission.reasoning,
        aiHintUsed: submission.aiHintUsed
      }
    );
    return response.data;
  }

  /**
   * Get AI hint for a case
   */
  async getAiHint(caseId: string, currentSymptoms: string[]): Promise<any> {
    const response = await httpClient.post(
      API_CONFIG.ENDPOINTS.CASES.AI_HINT(caseId),
      { symptoms: currentSymptoms }
    );
    return response.data;
  }

  /**
   * Submit pharmacy consultation
   */
  async submitPharmacyConsultation(
    caseId: string, 
    medications: string[], 
    notes?: string
  ): Promise<any> {
    const response = await httpClient.post(
      API_CONFIG.ENDPOINTS.CASES.PHARMACY_CONSULT(caseId),
      {
        selectedMedications: medications,
        notes
      }
    );
    return response.data;
  }

  /**
   * Mark case as favorite
   */
  async addToFavorites(caseId: string): Promise<void> {
    await httpClient.post(`${API_CONFIG.ENDPOINTS.CASES.BY_ID(caseId)}/favorite`);
  }

  /**
   * Remove case from favorites
   */
  async removeFromFavorites(caseId: string): Promise<void> {
    await httpClient.delete(`${API_CONFIG.ENDPOINTS.CASES.BY_ID(caseId)}/favorite`);
  }

  /**
   * Get user's favorite cases
   */
  async getFavorites(params: Omit<CaseListRequest, 'departmentId'> = {}): Promise<PaginatedResponse<Case>> {
    const response = await httpClient.get<PaginatedResponse<Case>>(
      `${API_CONFIG.ENDPOINTS.CASES.LIST}/favorites`,
      { params }
    );
    return response.data;
  }

  /**
   * Get completed cases
   */
  async getCompletedCases(params: Omit<CaseListRequest, 'isCompleted'> = {}): Promise<PaginatedResponse<Case>> {
    const response = await httpClient.get<PaginatedResponse<Case>>(
      API_CONFIG.ENDPOINTS.CASES.LIST,
      { 
        params: {
          ...params,
          isCompleted: true
        }
      }
    );
    return response.data;
  }

  /**
   * Search cases
   */
  async searchCases(
    query: string, 
    params: Omit<CaseListRequest, 'search'> = {}
  ): Promise<PaginatedResponse<Case>> {
    const response = await httpClient.get<PaginatedResponse<Case>>(
      API_CONFIG.ENDPOINTS.CASES.LIST,
      { 
        params: {
          ...params,
          search: query
        }
      }
    );
    return response.data;
  }
}

// Singleton instance
export const caseService = new CaseService();