import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  TextInput,
  Alert
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
}

interface DrugRecommendation {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  reasoning: string;
  contraindications: string[];
}

export default function PharmacyConsultScreen() {
  const router = useRouter();
  const { caseId } = useLocalSearchParams();
  const [selectedMedications, setSelectedMedications] = React.useState<string[]>([]);
  const [showInteractions, setShowInteractions] = React.useState(false);
  const [consultationNote, setConsultationNote] = React.useState('');
  const [aiRecommendations, setAiRecommendations] = React.useState<DrugRecommendation[]>([]);

  const availableMedications = [
    'Aspirin 325mg',
    'Clopidogrel 75mg', 
    'Atorvastatin 80mg',
    'Metoprolol 50mg',
    'Lisinopril 10mg',
    'Morphine 2-4mg IV',
    'Heparin (weight-based)',
    'Nitroglycerin SL'
  ];

  const mockInteractions: DrugInteraction[] = [
    {
      drug1: 'Aspirin 325mg',
      drug2: 'Heparin (weight-based)',
      severity: 'Medium',
      description: 'Increased bleeding risk. Monitor PT/INR closely and watch for signs of bleeding.'
    },
    {
      drug1: 'Metoprolol 50mg',
      drug2: 'Morphine 2-4mg IV',
      severity: 'Low',
      description: 'Additive hypotensive effects. Monitor blood pressure and heart rate.'
    }
  ];

  const mockRecommendations: DrugRecommendation[] = [
    {
      medication: 'Aspirin',
      dosage: '325mg',
      frequency: 'Once daily',
      duration: 'Indefinitely',
      reasoning: 'Antiplatelet therapy for secondary prevention of MI. Proven mortality benefit.',
      contraindications: ['Active bleeding', 'Severe hepatic impairment', 'Aspirin allergy']
    },
    {
      medication: 'Atorvastatin',
      dosage: '80mg',
      frequency: 'Once daily at bedtime',
      duration: 'Long-term',
      reasoning: 'High-intensity statin therapy for LDL reduction and plaque stabilization post-MI.',
      contraindications: ['Active liver disease', 'Pregnancy', 'Concurrent strong CYP3A4 inhibitors']
    }
  ];

  React.useEffect(() => {
    if (selectedMedications.length >= 2) {
      checkDrugInteractions();
    }
  }, [selectedMedications]);

  const handleMedicationToggle = (medication: string) => {
    setSelectedMedications(prev => 
      prev.includes(medication)
        ? prev.filter(m => m !== medication)
        : [...prev, medication]
    );
  };

  const checkDrugInteractions = () => {
    setShowInteractions(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setAiRecommendations(mockRecommendations);
    }, 1500);
  };

  const handleSubmitConsultation = () => {
    if (selectedMedications.length === 0) {
      Alert.alert('Select Medications', 'Please select at least one medication for consultation.');
      return;
    }

    Alert.alert(
      'Consultation Submitted',
      'Your pharmacy consultation has been sent to the medical team. They will review the medication recommendations.',
      [
        { text: 'Continue', onPress: () => router.push('/departments' as any) }
      ]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return COLORS.error;
      case 'Medium': return COLORS.warning;
      case 'Low': return COLORS.success;
      default: return COLORS.textMuted;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Pharmacy Consultation</Text>
        <MaterialCommunityIcons name="pill" size={24} color={COLORS.primary} />
      </View>

      <ScrollView style={styles.content}>
        {/* Case Summary */}
        <View style={styles.caseSummary}>
          <Text style={styles.sectionTitle}>📋 Case Summary</Text>
          <Text style={styles.caseSummaryText}>
            45-year-old male with acute STEMI. Post-catheterization management and secondary 
            prevention medications needed. Consider drug interactions and patient-specific factors.
          </Text>
        </View>

        {/* Medication Selection */}
        <View style={styles.medicationSection}>
          <Text style={styles.sectionTitle}>💊 Select Medications</Text>
          <Text style={styles.sectionSubtitle}>Choose appropriate medications for this case</Text>
          
          <View style={styles.medicationGrid}>
            {availableMedications.map((medication) => {
              const isSelected = selectedMedications.includes(medication);
              return (
                <Pressable
                  key={medication}
                  style={[styles.medicationCard, isSelected && styles.selectedMedication]}
                  onPress={() => handleMedicationToggle(medication)}
                >
                  <MaterialCommunityIcons
                    name={isSelected ? "check-circle" : "circle-outline"}
                    size={20}
                    color={isSelected ? COLORS.primary : COLORS.textMuted}
                  />
                  <Text style={[styles.medicationText, isSelected && styles.selectedMedicationText]}>
                    {medication}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Drug Interactions */}
        {showInteractions && mockInteractions.length > 0 && (
          <View style={styles.interactionSection}>
            <Text style={styles.sectionTitle}>⚠️ Drug Interactions</Text>
            {mockInteractions
              .filter(interaction => 
                selectedMedications.some(med => med.includes(interaction.drug1.split(' ')[0])) &&
                selectedMedications.some(med => med.includes(interaction.drug2.split(' ')[0]))
              )
              .map((interaction, index) => (
                <View key={index} style={styles.interactionCard}>
                  <View style={styles.interactionHeader}>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(interaction.severity) + '20' }]}>
                      <Text style={[styles.severityText, { color: getSeverityColor(interaction.severity) }]}>
                        {interaction.severity} Risk
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.interactionDrugs}>
                    {interaction.drug1} + {interaction.drug2}
                  </Text>
                  <Text style={styles.interactionDescription}>
                    {interaction.description}
                  </Text>
                </View>
              ))}
          </View>
        )}

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <View style={styles.recommendationSection}>
            <Text style={styles.sectionTitle}>🤖 AI Pharmacy Recommendations</Text>
            {aiRecommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.medicationName}>{rec.medication}</Text>
                  <Text style={styles.dosageInfo}>{rec.dosage} - {rec.frequency}</Text>
                </View>
                <Text style={styles.durationText}>Duration: {rec.duration}</Text>
                <Text style={styles.reasoningText}>{rec.reasoning}</Text>
                
                {rec.contraindications.length > 0 && (
                  <View style={styles.contraindicationsContainer}>
                    <Text style={styles.contraindicationsTitle}>⚠️ Contraindications:</Text>
                    {rec.contraindications.map((contra, idx) => (
                      <Text key={idx} style={styles.contraindicationItem}>• {contra}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Consultation Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>📝 Consultation Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add your pharmacy consultation notes, recommendations, or concerns..."
            value={consultationNote}
            onChangeText={setConsultationNote}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Collaboration Info */}
        <View style={styles.collaborationCard}>
          <MaterialCommunityIcons name="account-group" size={24} color={COLORS.accent} />
          <View style={styles.collaborationText}>
            <Text style={styles.collaborationTitle}>Interdisciplinary Collaboration</Text>
            <Text style={styles.collaborationSubtitle}>
              Your pharmacy expertise helps medical students understand optimal medication management. 
              This consultation will be shared with the medical team for comprehensive patient care.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Pressable 
            style={[styles.submitButton, selectedMedications.length === 0 && styles.disabledButton]}
            onPress={handleSubmitConsultation}
            disabled={selectedMedications.length === 0}
          >
            <MaterialCommunityIcons name="send" size={20} color={COLORS.cardBackground} />
            <Text style={styles.submitButtonText}>Submit Consultation</Text>
          </Pressable>
          
          <Pressable style={styles.draftButton}>
            <MaterialCommunityIcons name="content-save" size={20} color={COLORS.primary} />
            <Text style={styles.draftButtonText}>Save as Draft</Text>
          </Pressable>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  caseSummary: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  caseSummaryText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    lineHeight: 20,
  },
  medicationSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  medicationGrid: {
    gap: SPACING.sm,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  selectedMedication: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  medicationText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  selectedMedicationText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  interactionSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  interactionCard: {
    backgroundColor: COLORS.error + '05',
    borderRadius: BORDER_RADIUS.small,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  interactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  severityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
  },
  severityText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  interactionDrugs: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  interactionDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 18,
  },
  recommendationSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  recommendationCard: {
    backgroundColor: COLORS.primary + '05',
    borderRadius: BORDER_RADIUS.small,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  recommendationHeader: {
    marginBottom: SPACING.sm,
  },
  medicationName: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
  },
  dosageInfo: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  durationText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  reasoningText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  contraindicationsContainer: {
    backgroundColor: COLORS.warning + '10',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.small,
  },
  contraindicationsTitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.warning,
    marginBottom: SPACING.xs,
  },
  contraindicationItem: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 16,
  },
  notesSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.small,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    minHeight: 100,
    backgroundColor: COLORS.background,
  },
  collaborationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent + '10',
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'flex-start',
  },
  collaborationText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  collaborationTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  collaborationSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  actionSection: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  disabledButton: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  draftButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  draftButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});