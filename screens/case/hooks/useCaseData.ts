import React from 'react';
import { useRouter } from 'expo-router';
import { CaseData, CaseState } from '../types/case.types';

const mockCaseData: CaseData = {
  id: '001',
  title: 'Chest Pain and Shortness of Breath',
  difficulty: 'Intermediate',
  patient: {
    age: 45,
    gender: 'Male',
    weight: '78 kg',
    height: '175 cm'
  },
  symptoms: [
    'Severe chest pain (8/10)',
    'Shortness of breath',
    'Sweating',
    'Nausea',
    'Left arm pain'
  ],
  vitals: {
    bp: '160/95 mmHg',
    hr: '110 bpm', 
    temp: '37.2°C',
    spo2: '94%'
  },
  aiInsights: [
    'Symptom pattern suggests acute coronary syndrome',
    'High probability of myocardial infarction',
    'Immediate ECG and cardiac enzymes recommended'
  ]
};

export const useCaseData = (deptId?: string) => {
  const router = useRouter();
  const [caseState, setCaseState] = React.useState<CaseState>({
    selectedSymptoms: [],
    aiAnalysis: false,
    confidenceScore: 0,
    showDiagnosis: false
  });

  // In real app, this would fetch case data based on deptId
  const [caseData] = React.useState<CaseData>(mockCaseData);

  const handleAiAnalysis = () => {
    setCaseState(prev => ({ ...prev, aiAnalysis: true }));
    // Simulate AI processing delay
    setTimeout(() => {
      setCaseState(prev => ({ 
        ...prev, 
        aiAnalysis: false, 
        confidenceScore: 85 
      }));
    }, 2000);
  };

  const handleSymptomSelect = (symptom: string) => {
    setCaseState(prev => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptom)
        ? prev.selectedSymptoms.filter(s => s !== symptom)
        : [...prev.selectedSymptoms, symptom]
    }));
  };

  const handleStartDiagnosis = () => {
    setCaseState(prev => ({ ...prev, showDiagnosis: true }));
    router.push({ pathname: '/diagnosis', params: { caseId: caseData.id } } as any);
  };

  const handlePharmacyConsult = () => {
    router.push({ pathname: '/pharmacy-consult', params: { caseId: caseData.id } } as any);
  };

  return {
    caseData,
    selectedSymptoms: caseState.selectedSymptoms,
    aiAnalysis: caseState.aiAnalysis,
    confidenceScore: caseState.confidenceScore,
    showDiagnosis: caseState.showDiagnosis,
    handleAiAnalysis,
    handleSymptomSelect,
    handleStartDiagnosis,
    handlePharmacyConsult
  };
};