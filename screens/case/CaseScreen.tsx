import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING } from '@/constants/design-system';

// Components
import {
  CaseHeader,
  PatientInfo,
  SymptomsList,
  VitalSigns,
  AIAnalysis,
  CaseActions,
  ProgressIndicator
} from './components';

// Hooks
import { useCaseData } from './hooks';

export default function CaseScreen() {
  const router = useRouter();
  const { deptId } = useLocalSearchParams();
  
  const {
    caseData,
    selectedSymptoms,
    aiAnalysis,
    confidenceScore,
    handleSymptomSelect,
    handleAiAnalysis,
    handleStartDiagnosis,
    handlePharmacyConsult
  } = useCaseData(deptId as string);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </Pressable>
        <CaseHeader 
          title={caseData.title}
          difficulty={caseData.difficulty}
          onAiAnalysis={handleAiAnalysis}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Patient Information */}
        <PatientInfo patient={caseData.patient} />

        {/* Symptoms */}
        <SymptomsList 
          symptoms={caseData.symptoms}
          selectedSymptoms={selectedSymptoms}
          onSymptomSelect={handleSymptomSelect}
        />

        {/* Vitals */}
        <VitalSigns vitals={caseData.vitals} />

        {/* AI Analysis */}
        <AIAnalysis 
          isAnalyzing={aiAnalysis}
          confidenceScore={confidenceScore}
          insights={caseData.aiInsights}
        />

        {/* Action Buttons */}
        <CaseActions 
          selectedSymptomsCount={selectedSymptoms.length}
          onStartDiagnosis={handleStartDiagnosis}
          onPharmacyConsult={handlePharmacyConsult}
        />
        
        {/* Progress Indicator */}
        <ProgressIndicator 
          selectedCount={selectedSymptoms.length}
          totalCount={caseData.symptoms.length}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
  },
  backButton: {
    padding: SPACING.sm,
    marginRight: SPACING.sm,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
});