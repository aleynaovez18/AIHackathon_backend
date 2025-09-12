/**
 * AI Service
 * Handles AI-powered features like hints and drug interactions
 */

import { httpClient } from '../client/http-client';
import { API_CONFIG } from '../config/api-config';
import { 
  AiHintRequest, 
  AiHintResponse, 
  DrugInteractionRequest, 
  DrugInteractionResponse 
} from '../types/api-types';

class AiService {
  /**
   * Get AI-powered diagnosis hint
   */
  async getDiagnosisHint(request: AiHintRequest): Promise<AiHintResponse> {
    const response = await httpClient.post<AiHintResponse>(
      API_CONFIG.ENDPOINTS.AI.DIAGNOSIS_HINT,
      request
    );
    return response.data;
  }

  /**
   * Get AI case analysis
   */
  async getCaseAnalysis(caseId: string, userInput: {
    selectedSymptoms: string[];
    suspectedDiagnoses: string[];
    reasoning?: string;
  }): Promise<{
    analysis: string;
    suggestions: string[];
    confidence: number;
    additionalQuestions: string[];
  }> {
    const response = await httpClient.post<{
      analysis: string;
      suggestions: string[];
      confidence: number;
      additionalQuestions: string[];
    }>(
      API_CONFIG.ENDPOINTS.AI.CASE_ANALYSIS,
      {
        caseId,
        ...userInput
      }
    );
    return response.data;
  }

  /**
   * Check drug interactions
   */
  async checkDrugInteractions(request: DrugInteractionRequest): Promise<DrugInteractionResponse> {
    const response = await httpClient.post<DrugInteractionResponse>(
      API_CONFIG.ENDPOINTS.AI.DRUG_INTERACTIONS,
      request
    );
    return response.data;
  }

  /**
   * Get medication recommendations
   */
  async getMedicationRecommendations(
    caseId: string,
    patientInfo: {
      age: number;
      weight?: number;
      allergies?: string[];
      currentMedications?: string[];
      medicalHistory?: string[];
    }
  ): Promise<{
    recommendations: {
      medication: string;
      dosage: string;
      frequency: string;
      duration: string;
      reasoning: string;
      alternatives: string[];
    }[];
    warnings: string[];
    monitoringRequirements: string[];
  }> {
    const response = await httpClient.post<{
      recommendations: {
        medication: string;
        dosage: string;
        frequency: string;
        duration: string;
        reasoning: string;
        alternatives: string[];
      }[];
      warnings: string[];
      monitoringRequirements: string[];
    }>(
      `${API_CONFIG.ENDPOINTS.AI.CASE_ANALYSIS}/medications`,
      {
        caseId,
        patientInfo
      }
    );
    return response.data;
  }

  /**
   * Get differential diagnosis suggestions
   */
  async getDifferentialDiagnosis(
    symptoms: string[],
    patientInfo: {
      age: number;
      gender: string;
      medicalHistory: string[];
    }
  ): Promise<{
    diagnoses: {
      name: string;
      confidence: number;
      reasoning: string;
      supportingEvidence: string[];
      contradictingEvidence: string[];
    }[];
    suggestedTests: string[];
    redFlags: string[];
  }> {
    const response = await httpClient.post<{
      diagnoses: {
        name: string;
        confidence: number;
        reasoning: string;
        supportingEvidence: string[];
        contradictingEvidence: string[];
      }[];
      suggestedTests: string[];
      redFlags: string[];
    }>(
      `${API_CONFIG.ENDPOINTS.AI.DIAGNOSIS_HINT}/differential`,
      {
        symptoms,
        patientInfo
      }
    );
    return response.data;
  }

  /**
   * Get learning recommendations based on performance
   */
  async getLearningRecommendations(userId?: string): Promise<{
    recommendedCases: string[];
    focusAreas: string[];
    studyMaterials: {
      title: string;
      type: 'video' | 'article' | 'quiz';
      url: string;
      difficulty: string;
    }[];
    adaptivePath: {
      nextLevel: string;
      estimatedTime: number;
      prerequisites: string[];
    };
  }> {
    const response = await httpClient.get<{
      recommendedCases: string[];
      focusAreas: string[];
      studyMaterials: {
        title: string;
        type: 'video' | 'article' | 'quiz';
        url: string;
        difficulty: string;
      }[];
      adaptivePath: {
        nextLevel: string;
        estimatedTime: number;
        prerequisites: string[];
      };
    }>(
      `${API_CONFIG.ENDPOINTS.AI.CASE_ANALYSIS}/recommendations`,
      { params: { userId } }
    );
    return response.data;
  }
}

// Singleton instance
export const aiService = new AiService();