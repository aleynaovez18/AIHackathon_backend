export interface Patient {
  age: number;
  gender: string;
  weight: string;
  height: string;
}

export interface Vitals {
  bp: string;
  hr: string;
  temp: string;
  spo2: string;
}

export interface CaseData {
  id: string;
  title: string;
  difficulty: string;
  patient: Patient;
  symptoms: string[];
  vitals: Vitals;
  aiInsights: string[];
}

export interface CaseScreenProps {
  deptId?: string;
}

export interface CaseState {
  selectedSymptoms: string[];
  aiAnalysis: boolean;
  confidenceScore: number;
  showDiagnosis: boolean;
}