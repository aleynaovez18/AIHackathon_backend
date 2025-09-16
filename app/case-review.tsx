import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

const { width } = Dimensions.get('window');

interface SolvingStep {
  id: string;
  step: number;
  action: string;
  description: string;
  timestamp: string;
  isCorrect: boolean;
  confidence: number;
  reasoning?: string;
}

interface CaseReviewData {
  id: string;
  title: string;
  department: string;
  difficulty: string;
  completedAt: string;
  duration: string;
  score: number;
  finalDiagnosis: string;
  correctDiagnosis: string;
  patientInfo: {
    age: number;
    gender: string;
    complaints: string[];
  };
  solvingSteps: SolvingStep[];
  timeSpent: {
    analysis: string;
    diagnosis: string;
    review: string;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
}

// Mock data for case review
const getCaseReviewData = (caseId: string): CaseReviewData => ({
  id: caseId,
  title: 'Akut Miyokard İnfarktüsü',
  department: 'Kardiyoloji',
  difficulty: 'Zor',
  completedAt: '2024-01-15T14:30:00',
  duration: '18 dakika',
  score: 92,
  finalDiagnosis: 'STEMI (ST Elevasyonlu Miyokard İnfarktüsü)',
  correctDiagnosis: 'STEMI (ST Elevasyonlu Miyokard İnfarktüsü)',
  patientInfo: {
    age: 58,
    gender: 'Erkek',
    complaints: ['Göğüs ağrısı', 'Nefes darlığı', 'Terleme', 'Bulantı']
  },
  solvingSteps: [
    {
      id: '1',
      step: 1,
      action: 'Hasta Hikayesi İnceleme',
      description: 'Hastanın şikayetlerini ve anamnezini detaylı olarak inceledi',
      timestamp: '14:32',
      isCorrect: true,
      confidence: 95,
      reasoning: 'Doğru yaklaşım: Önce hasta hikayesini almak kritik'
    },
    {
      id: '2',
      step: 2,
      action: 'Vital Bulgular Analizi',
      description: 'Kan basıncı: 90/60, Nabız: 110, Solunum: 24, Ateş: 36.8°C',
      timestamp: '14:35',
      isCorrect: true,
      confidence: 88,
      reasoning: 'Hipotansiyon ve taşikardi miyokard infarktüsü bulgularını destekliyor'
    },
    {
      id: '3',
      step: 3,
      action: 'EKG Değerlendirmesi',
      description: 'EKG\'de V2-V6 derivasyonlarında ST elevasyonu tespit etti',
      timestamp: '14:38',
      isCorrect: true,
      confidence: 98,
      reasoning: 'Mükemmel: ST elevasyonu STEMI için patognomonik bulgu'
    },
    {
      id: '4',
      step: 4,
      action: 'Laboratuvar Sonuçları',
      description: 'Troponin I: 8.5 ng/mL (Yüksek), CK-MB: 45 ng/mL (Yüksek)',
      timestamp: '14:42',
      isCorrect: true,
      confidence: 92,
      reasoning: 'Kardiyak enzim yüksekliği tanıyı doğruluyor'
    },
    {
      id: '5',
      step: 5,
      action: 'Ayırıcı Tanı',
      description: 'Unstable angina, aort diseksiyonu, pnömotoraks değerlendirdi',
      timestamp: '14:45',
      isCorrect: true,
      confidence: 85,
      reasoning: 'İyi düşünülmüş ayırıcı tanı listesi'
    },
    {
      id: '6',
      step: 6,
      action: 'Kesin Tanı',
      description: 'STEMI (ST Elevasyonlu Miyokard İnfarktüsü) tanısı koydu',
      timestamp: '14:48',
      isCorrect: true,
      confidence: 96,
      reasoning: 'Doğru tanı: Bulgular STEMI ile uyumlu'
    },
    {
      id: '7',
      step: 7,
      action: 'Tedavi Planı',
      description: 'Acil PCI, aspirin, klopidogrel, heparin önerdi',
      timestamp: '14:50',
      isCorrect: true,
      confidence: 90,
      reasoning: 'Uygun tedavi protokolü seçildi'
    }
  ],
  timeSpent: {
    analysis: '12 dakika',
    diagnosis: '4 dakika',
    review: '2 dakika'
  },
  feedback: {
    strengths: [
      'Sistematik yaklaşım sergiledi',
      'EKG değerlendirmesi mükemmeldi',
      'Doğru ayırıcı tanı listesi oluşturdu',
      'Uygun tedavi protokolü seçti'
    ],
    improvements: [
      'Fizik muayene bulgularına daha fazla odaklanabilir',
      'Risk faktörlerini daha detaylı sorgulyabilir'
    ],
    recommendations: [
      'Karmaşık EKG örneklerini çalışın',
      'Kardiyak acil durum protokollerini gözden geçirin',
      'Benzer vakalar üzerinde pratik yapın'
    ]
  }
});

export default function CaseReviewScreen() {
  const router = useRouter();
  const { caseId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'steps' | 'feedback' | 'timeline'>('steps');
  
  const caseData = getCaseReviewData(caseId as string);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay': return COLORS.success;
      case 'Orta': return COLORS.warning;
      case 'Zor': return COLORS.error;
      default: return COLORS.textMuted;
    }
  };

  const getStepIcon = (action: string) => {
    switch (action) {
      case 'Hasta Hikayesi İnceleme': return 'account-search';
      case 'Vital Bulgular Analizi': return 'heart-pulse';
      case 'EKG Değerlendirmesi': return 'chart-line-variant';
      case 'Laboratuvar Sonuçları': return 'test-tube';
      case 'Ayırıcı Tanı': return 'format-list-checks';
      case 'Kesin Tanı': return 'medical-bag';
      case 'Tedavi Planı': return 'medication';
      default: return 'clipboard-check';
    }
  };

  const StepCard = ({ step }: { step: SolvingStep }) => (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepIcon, { backgroundColor: step.isCorrect ? COLORS.success + '15' : COLORS.error + '15' }]}>
          <MaterialCommunityIcons 
            name={getStepIcon(step.action)} 
            size={20} 
            color={step.isCorrect ? COLORS.success : COLORS.error} 
          />
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepTitle}>Adım {step.step}: {step.action}</Text>
          <Text style={styles.stepTime}>{step.timestamp}</Text>
        </View>
        <View style={styles.stepStatus}>
          <MaterialCommunityIcons 
            name={step.isCorrect ? "check-circle" : "close-circle"} 
            size={20} 
            color={step.isCorrect ? COLORS.success : COLORS.error} 
          />
          <Text style={[styles.confidenceText, { color: step.isCorrect ? COLORS.success : COLORS.error }]}>
            %{step.confidence}
          </Text>
        </View>
      </View>
      
      <Text style={styles.stepDescription}>{step.description}</Text>
      
      {step.reasoning && (
        <View style={[styles.reasoningBox, { backgroundColor: step.isCorrect ? COLORS.success + '10' : COLORS.error + '10' }]}>
          <MaterialCommunityIcons 
            name="lightbulb" 
            size={16} 
            color={step.isCorrect ? COLORS.success : COLORS.error} 
          />
          <Text style={[styles.reasoningText, { color: step.isCorrect ? COLORS.success : COLORS.error }]}>
            {step.reasoning}
          </Text>
        </View>
      )}
    </View>
  );

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <Pressable
      style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
      onPress={() => setActiveTab(tab as any)}
    >
      <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.headerShadow}>
        <View style={styles.headerContainer}>
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            style={styles.headerIconButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Vaka İncelemesi</Text>
          <Pressable accessibilityRole="button" hitSlop={8} style={styles.headerIconButton}>
            <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Case Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.caseTitle}>{caseData.title}</Text>
              <Text style={styles.caseDepartment}>{caseData.department}</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(caseData.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(caseData.difficulty) }]}>
                {caseData.difficulty}
              </Text>
            </View>
          </View>

          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <MaterialCommunityIcons name="star" size={20} color={COLORS.warning} />
              <Text style={styles.summaryStatValue}>{caseData.score}%</Text>
              <Text style={styles.summaryStatLabel}>Skor</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <MaterialCommunityIcons name="clock" size={20} color={COLORS.primary} />
              <Text style={styles.summaryStatValue}>{caseData.duration}</Text>
              <Text style={styles.summaryStatLabel}>Süre</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <MaterialCommunityIcons name="calendar" size={20} color={COLORS.accent} />
              <Text style={styles.summaryStatValue}>
                {new Date(caseData.completedAt).toLocaleDateString('tr-TR')}
              </Text>
              <Text style={styles.summaryStatLabel}>Tarih</Text>
            </View>
          </View>

          <View style={styles.diagnosisComparison}>
            <Text style={styles.diagnosisLabel}>Sizin Tanınız:</Text>
            <Text style={styles.userDiagnosis}>{caseData.finalDiagnosis}</Text>
            <Text style={styles.diagnosisLabel}>Doğru Tanı:</Text>
            <Text style={[styles.correctDiagnosis, { 
              color: caseData.finalDiagnosis === caseData.correctDiagnosis ? COLORS.success : COLORS.error 
            }]}>
              {caseData.correctDiagnosis}
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TabButton tab="steps" label="Çözüm Adımları" />
          <TabButton tab="feedback" label="Geri Bildirim" />
          <TabButton tab="timeline" label="Zaman Analizi" />
        </View>

        {/* Content based on active tab */}
        {activeTab === 'steps' && (
          <View style={styles.stepsContainer}>
            <Text style={styles.sectionTitle}>Çözüm Sürecini İnceleyin</Text>
            <Text style={styles.sectionSubtitle}>
              Vaka çözümünüzün her adımını gözden geçirin ve öğrenin
            </Text>
            {caseData.solvingSteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </View>
        )}

        {activeTab === 'feedback' && (
          <View style={styles.feedbackContainer}>
            {/* Strengths */}
            <View style={styles.feedbackSection}>
              <View style={styles.feedbackSectionHeader}>
                <MaterialCommunityIcons name="thumb-up" size={24} color={COLORS.success} />
                <Text style={styles.feedbackSectionTitle}>Güçlü Yönleriniz</Text>
              </View>
              {caseData.feedback.strengths.map((strength, index) => (
                <View key={index} style={styles.feedbackItem}>
                  <MaterialCommunityIcons name="check" size={16} color={COLORS.success} />
                  <Text style={styles.feedbackText}>{strength}</Text>
                </View>
              ))}
            </View>

            {/* Improvements */}
            <View style={styles.feedbackSection}>
              <View style={styles.feedbackSectionHeader}>
                <MaterialCommunityIcons name="trending-up" size={24} color={COLORS.warning} />
                <Text style={styles.feedbackSectionTitle}>Gelişim Alanları</Text>
              </View>
              {caseData.feedback.improvements.map((improvement, index) => (
                <View key={index} style={styles.feedbackItem}>
                  <MaterialCommunityIcons name="arrow-up" size={16} color={COLORS.warning} />
                  <Text style={styles.feedbackText}>{improvement}</Text>
                </View>
              ))}
            </View>

            {/* Recommendations */}
            <View style={styles.feedbackSection}>
              <View style={styles.feedbackSectionHeader}>
                <MaterialCommunityIcons name="lightbulb" size={24} color={COLORS.primary} />
                <Text style={styles.feedbackSectionTitle}>Öneriler</Text>
              </View>
              {caseData.feedback.recommendations.map((recommendation, index) => (
                <View key={index} style={styles.feedbackItem}>
                  <MaterialCommunityIcons name="star" size={16} color={COLORS.primary} />
                  <Text style={styles.feedbackText}>{recommendation}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'timeline' && (
          <View style={styles.timelineContainer}>
            <Text style={styles.sectionTitle}>Zaman Dağılımı</Text>
            <Text style={styles.sectionSubtitle}>
              Vakanın hangi bölümlerine ne kadar zaman ayırdığınızı görün
            </Text>

            <View style={styles.timeBreakdown}>
              <View style={styles.timeItem}>
                <MaterialCommunityIcons name="magnify" size={24} color={COLORS.primary} />
                <View style={styles.timeItemContent}>
                  <Text style={styles.timeItemLabel}>Analiz</Text>
                  <Text style={styles.timeItemValue}>{caseData.timeSpent.analysis}</Text>
                </View>
              </View>

              <View style={styles.timeItem}>
                <MaterialCommunityIcons name="medical-bag" size={24} color={COLORS.accent} />
                <View style={styles.timeItemContent}>
                  <Text style={styles.timeItemLabel}>Tanı</Text>
                  <Text style={styles.timeItemValue}>{caseData.timeSpent.diagnosis}</Text>
                </View>
              </View>

              <View style={styles.timeItem}>
                <MaterialCommunityIcons name="clipboard-check" size={24} color={COLORS.success} />
                <View style={styles.timeItemContent}>
                  <Text style={styles.timeItemLabel}>İnceleme</Text>
                  <Text style={styles.timeItemValue}>{caseData.timeSpent.review}</Text>
                </View>
              </View>
            </View>

            <View style={styles.performanceTips}>
              <Text style={styles.performanceTipsTitle}>Performans İpuçları</Text>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name="clock-fast" size={16} color={COLORS.primary} />
                <Text style={styles.tipText}>Analiz sürenizi optimize etmek için önce vital bulguları kontrol edin</Text>
              </View>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name="target" size={16} color={COLORS.primary} />
                <Text style={styles.tipText}>Tanı koyma sürenizi kısaltmak için sistematik yaklaşım benimseyin</Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.retryButton} onPress={() => router.push('/case' as any)}>
            <MaterialCommunityIcons name="refresh" size={20} color={COLORS.cardBackground} />
            <Text style={styles.retryButtonText}>Tekrar Çöz</Text>
          </Pressable>
          <Pressable style={styles.similarButton} onPress={() => router.push('/departments' as any)}>
            <MaterialCommunityIcons name="file-multiple" size={20} color={COLORS.primary} />
            <Text style={styles.similarButtonText}>Benzer Vakalar</Text>
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
  headerShadow: {
    ...SHADOWS.small,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
  },
  headerIconButton: {
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
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  caseTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  caseDepartment: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
  },
  difficultyText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  summaryStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryStatValue: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  summaryStatLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  diagnosisComparison: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
  },
  diagnosisLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  userDiagnosis: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  correctDiagnosis: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.xs,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.small,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
  },
  tabButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  tabButtonTextActive: {
    color: COLORS.cardBackground,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  stepsContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  stepCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  stepTime: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  stepStatus: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  confidenceText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  stepDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  reasoningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.small,
  },
  reasoningText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    flex: 1,
    lineHeight: 18,
  },
  feedbackContainer: {
    gap: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  feedbackSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  feedbackSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  feedbackSectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  feedbackText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    flex: 1,
    lineHeight: 18,
  },
  timelineContainer: {
    marginBottom: SPACING.xl,
  },
  timeBreakdown: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  timeItemContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  timeItemLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  timeItemValue: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  performanceTips: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  performanceTipsTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tipText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    flex: 1,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  retryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  retryButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.cardBackground,
  },
  similarButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  similarButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
  },
});