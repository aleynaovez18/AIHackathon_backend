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
  Animated,
  Alert
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface DiagnosisOption {
  id: string;
  name: string;
  confidence: number;
  reasoning: string;
  isCorrect: boolean;
}

export default function DiagnosisScreen() {
  const router = useRouter();
  const { caseId } = useLocalSearchParams();
  const [selectedDiagnosis, setSelectedDiagnosis] = React.useState<string | null>(null);
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [aiHintUsed, setAiHintUsed] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const diagnosisOptions: DiagnosisOption[] = [
    {
      id: '1',
      name: 'Acute Myocardial Infarction (STEMI)',
      confidence: 92,
      reasoning: 'Classic chest pain, diaphoresis, elevated HR, and symptom pattern strongly suggest STEMI',
      isCorrect: true
    },
    {
      id: '2', 
      name: 'Unstable Angina',
      confidence: 78,
      reasoning: 'Chest pain and cardiac risk factors present, but symptoms more severe than typical angina',
      isCorrect: false
    },
    {
      id: '3',
      name: 'Pulmonary Embolism',
      confidence: 45,
      reasoning: 'Shortness of breath present, but chest pain pattern not typical for PE',
      isCorrect: false
    },
    {
      id: '4',
      name: 'Aortic Dissection',
      confidence: 30,
      reasoning: 'Chest pain present but lacks the tearing quality and back pain typical of dissection',
      isCorrect: false
    }
  ];

  const handleDiagnosisSelect = (diagnosisId: string) => {
    setSelectedDiagnosis(diagnosisId);
  };

  const handleSubmitDiagnosis = () => {
    if (!selectedDiagnosis) {
      Alert.alert('Select Diagnosis', 'Please select a diagnosis before submitting.');
      return;
    }

    const selectedOption = diagnosisOptions.find(d => d.id === selectedDiagnosis);
    const baseScore = selectedOption?.isCorrect ? 100 : 0;
    const hintPenalty = aiHintUsed ? 20 : 0;
    const finalScore = Math.max(0, baseScore - hintPenalty);
    
    setScore(finalScore);
    setShowResults(true);
  };

  const handleAiHint = () => {
    setAiHintUsed(true);
    Alert.alert(
      'AI Hint 💡',
      'Consider the patient\'s age, classic symptom triad (chest pain + diaphoresis + nausea), and elevated vital signs. The ECG would likely show ST elevations in this case.',
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  const handleNextCase = () => {
    router.push('/departments' as any);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>AI Diagnosis Challenge</Text>
        <Pressable style={styles.hintButton} onPress={handleAiHint}>
          <MaterialCommunityIcons 
            name="lightbulb-outline" 
            size={24} 
            color={aiHintUsed ? COLORS.warning : COLORS.textMuted} 
          />
        </Pressable>
      </View>

      <Animated.ScrollView style={[styles.content, { opacity: fadeAnim }]}>
        {!showResults ? (
          <>
            {/* Instructions */}
            <View style={styles.instructionCard}>
              <MaterialCommunityIcons name="information" size={24} color={COLORS.primary} />
              <View style={styles.instructionText}>
                <Text style={styles.instructionTitle}>Diagnosis Challenge</Text>
                <Text style={styles.instructionSubtitle}>
                  Based on the patient symptoms and your analysis, select the most likely diagnosis. 
                  AI confidence scores are provided to assist your decision.
                </Text>
              </View>
            </View>

            {/* Diagnosis Options */}
            <View style={styles.optionsSection}>
              <Text style={styles.sectionTitle}>Select Primary Diagnosis</Text>
              {diagnosisOptions.map((option) => (
                <Pressable
                  key={option.id}
                  style={[
                    styles.diagnosisOption,
                    selectedDiagnosis === option.id && styles.selectedOption
                  ]}
                  onPress={() => handleDiagnosisSelect(option.id)}
                >
                  <View style={styles.optionHeader}>
                    <View style={styles.optionTitleRow}>
                      <MaterialCommunityIcons
                        name={selectedDiagnosis === option.id ? "radiobox-marked" : "radiobox-blank"}
                        size={24}
                        color={selectedDiagnosis === option.id ? COLORS.primary : COLORS.textMuted}
                      />
                      <Text style={[
                        styles.optionTitle,
                        selectedDiagnosis === option.id && styles.selectedOptionTitle
                      ]}>
                        {option.name}
                      </Text>
                    </View>
                    <View style={styles.confidenceContainer}>
                      <Text style={styles.confidenceLabel}>AI Confidence</Text>
                      <View style={[styles.confidenceBar, { backgroundColor: COLORS.border }]}>
                        <View
                          style={[
                            styles.confidenceFill,
                            { width: `${option.confidence}%`, backgroundColor: getScoreColor(option.confidence) }
                          ]}
                        />
                      </View>
                      <Text style={[styles.confidenceText, { color: getScoreColor(option.confidence) }]}>
                        {option.confidence}%
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.reasoningText}>{option.reasoning}</Text>
                </Pressable>
              ))}
            </View>

            {/* Submit Button */}
            <Pressable 
              style={[
                styles.submitButton,
                !selectedDiagnosis && styles.disabledButton
              ]}
              onPress={handleSubmitDiagnosis}
              disabled={!selectedDiagnosis}
            >
              <Text style={styles.submitButtonText}>Submit Diagnosis</Text>
              <MaterialCommunityIcons name="check" size={20} color={COLORS.cardBackground} />
            </Pressable>
          </>
        ) : (
          /* Results Screen */
          <View style={styles.resultsContainer}>
            <View style={[styles.scoreCard, { borderColor: getScoreColor(score) }]}>
              <MaterialCommunityIcons 
                name={score >= 80 ? "trophy" : score >= 60 ? "medal" : "close-circle"} 
                size={48} 
                color={getScoreColor(score)} 
              />
              <Text style={[styles.scoreTitle, { color: getScoreColor(score) }]}>
                {score >= 80 ? "Excellent!" : score >= 60 ? "Good Job!" : "Keep Learning!"}
              </Text>
              <Text style={styles.scoreNumber}>{score}/100</Text>
              <Text style={styles.scoreSubtitle}>
                {score >= 80 
                  ? "Outstanding diagnostic skills! You're ready for advanced cases."
                  : score >= 60 
                  ? "Good reasoning. Review the explanation to improve."
                  : "Don't worry, this is how we learn. Study the correct answer below."
                }
              </Text>
            </View>

            {/* Correct Answer Explanation */}
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>📚 Learning Summary</Text>
              <View style={styles.correctAnswer}>
                <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
                <Text style={styles.correctAnswerText}>
                  Correct: {diagnosisOptions.find(d => d.isCorrect)?.name}
                </Text>
              </View>
              <Text style={styles.explanationText}>
                The combination of severe chest pain (8/10), diaphoresis, nausea, left arm radiation, 
                and elevated vital signs strongly suggests acute STEMI. Immediate cardiac catheterization 
                and reperfusion therapy would be indicated.
              </Text>
              
              <View style={styles.keyLearning}>
                <Text style={styles.keyLearningTitle}>🔑 Key Learning Points</Text>
                <Text style={styles.keyLearningText}>
                  • Classic MI triad: Chest pain + Diaphoresis + Nausea{'\n'}
                  • Left arm radiation is highly suggestive{'\n'}
                  • Time is muscle - early recognition saves lives{'\n'}
                  • Always consider immediate ECG and cardiac enzymes
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.resultActions}>
              <Pressable style={styles.primaryAction} onPress={handleNextCase}>
                <Text style={styles.primaryActionText}>Continue Learning</Text>
              </Pressable>
              <Pressable style={styles.secondaryAction} onPress={() => setShowResults(false)}>
                <Text style={styles.secondaryActionText}>Review Case</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Animated.ScrollView>
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
  hintButton: {
    padding: SPACING.sm,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '10',
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'flex-start',
  },
  instructionText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  instructionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  instructionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  optionsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  diagnosisOption: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '05',
  },
  optionHeader: {
    marginBottom: SPACING.md,
  },
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  optionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  selectedOptionTitle: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  confidenceContainer: {
    marginLeft: SPACING.xl,
  },
  confidenceLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  confidenceBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: SPACING.xs,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  reasoningText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginLeft: SPACING.xl,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
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
  resultsContainer: {
    gap: SPACING.xl,
  },
  scoreCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 3,
    ...SHADOWS.medium,
  },
  scoreTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  scoreNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xxl + 8,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  scoreSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  explanationCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  explanationTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  correctAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.success + '15',
    borderRadius: BORDER_RADIUS.small,
  },
  correctAnswerText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginLeft: SPACING.sm,
  },
  explanationText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  keyLearning: {
    backgroundColor: COLORS.warning + '10',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  keyLearningTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  keyLearningText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 18,
  },
  resultActions: {
    gap: SPACING.md,
  },
  primaryAction: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  primaryActionText: {
    color: COLORS.cardBackground,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  secondaryAction: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  secondaryActionText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});