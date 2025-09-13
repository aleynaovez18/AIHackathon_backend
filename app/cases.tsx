import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { Card } from '@/components/shared/Card';

// Mock data for solved cases
const SOLVED_CASES = [
  {
    id: '1',
    title: 'Akut Miyokard İnfarktüsü',
    department: 'Kardiyoloji',
    difficulty: 'Zor',
    completedAt: '2024-01-15',
    duration: '18 dakika',
    score: 92,
    symptoms: ['Göğüs ağrısı', 'Nefes darlığı', 'Terleme'],
    diagnosis: 'STEMI',
    status: 'success' as const,
  },
  {
    id: '2',
    title: 'Diyabetik Ketoasidoz',
    department: 'Endokrinoloji',
    difficulty: 'Orta',
    completedAt: '2024-01-14',
    duration: '12 dakika',
    score: 88,
    symptoms: ['Bulantı', 'Kusma', 'Karın ağrısı'],
    diagnosis: 'DKA',
    status: 'success' as const,
  },
  {
    id: '3',
    title: 'Astım Krizi',
    department: 'Göğüs Hastalıkları',
    difficulty: 'Kolay',
    completedAt: '2024-01-13',
    duration: '8 dakika',
    score: 95,
    symptoms: ['Nefes darlığı', 'Wheezing', 'Öksürük'],
    diagnosis: 'Astım eksaserbasyonu',
    status: 'success' as const,
  },
  {
    id: '4',
    title: 'Menenjit',
    department: 'Nöroloji',
    difficulty: 'Zor',
    completedAt: '2024-01-12',
    duration: '25 dakika',
    score: 78,
    symptoms: ['Baş ağrısı', 'Boyun sertliği', 'Ateş'],
    diagnosis: 'Bakteri menenjiti',
    status: 'partial' as const,
  },
  {
    id: '5',
    title: 'Apandisit',
    department: 'Genel Cerrahi',
    difficulty: 'Orta',
    completedAt: '2024-01-10',
    duration: '15 dakika',
    score: 84,
    symptoms: ['Karın ağrısı', 'Bulantı', 'Ateş'],
    diagnosis: 'Akut apandisit',
    status: 'success' as const,
  },
  {
    id: '6',
    title: 'Pnömoni',
    department: 'Göğüs Hastalıkları',
    difficulty: 'Orta',
    completedAt: '2024-01-08',
    duration: '14 dakika',
    score: 90,
    symptoms: ['Öksürük', 'Ateş', 'Nefes darlığı'],
    diagnosis: 'Bakteriyel pnömoni',
    status: 'failed' as const,
  },
];

interface FilterState {
  search: string;
  department: string;
  difficulty: string;
  status: string;
}

const DEPARTMENTS = ['Tümü', 'Kardiyoloji', 'Nöroloji', 'Endokrinoloji', 'Göğüs Hastalıkları', 'Genel Cerrahi'];
const DIFFICULTIES = ['Tümü', 'Kolay', 'Orta', 'Zor'];
const STATUSES = ['Tümü', 'Başarılı', 'Kısmi', 'Başarısız'];

export default function SolvedCasesScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: 'Tümü',
    difficulty: 'Tümü',
    status: 'Tümü',
  });
  const [showFilters, setShowFilters] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay': return COLORS.success;
      case 'Orta': return COLORS.warning;
      case 'Zor': return COLORS.error;
      default: return COLORS.textMuted;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return 'check-circle';
      case 'partial': return 'alert-circle';
      case 'failed': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return COLORS.success;
      case 'partial': return COLORS.warning;
      case 'failed': return COLORS.error;
      default: return COLORS.textMuted;
    }
  };

  const filteredCases = SOLVED_CASES.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         caseItem.diagnosis.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDepartment = filters.department === 'Tümü' || caseItem.department === filters.department;
    const matchesDifficulty = filters.difficulty === 'Tümü' || caseItem.difficulty === filters.difficulty;
    const matchesStatus = filters.status === 'Tümü' || 
                         (filters.status === 'Başarılı' && caseItem.status === 'success') ||
                         (filters.status === 'Kısmi' && caseItem.status === 'partial') ||
                         (filters.status === 'Başarısız' && caseItem.status === 'failed');
    
    return matchesSearch && matchesDepartment && matchesDifficulty && matchesStatus;
  });

  const totalCases = SOLVED_CASES.length;
  const successfulCases = SOLVED_CASES.filter(c => c.status === 'success').length;
  const averageScore = Math.round(SOLVED_CASES.reduce((acc, c) => acc + c.score, 0) / totalCases);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Çözülen Vakalar</Text>
        <Pressable onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
          <MaterialCommunityIcons 
            name={showFilters ? "filter-off" : "filter"} 
            size={24} 
            color={COLORS.primary} 
          />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <MaterialCommunityIcons name="trophy" size={32} color={COLORS.warning} />
            <Text style={styles.statNumber}>{totalCases}</Text>
            <Text style={styles.statLabel}>Toplam Vaka</Text>
          </Card>
          <Card style={styles.statCard}>
            <MaterialCommunityIcons name="check-circle" size={32} color={COLORS.success} />
            <Text style={styles.statNumber}>{successfulCases}</Text>
            <Text style={styles.statLabel}>Başarılı</Text>
          </Card>
          <Card style={styles.statCard}>
            <MaterialCommunityIcons name="chart-line" size={32} color={COLORS.primary} />
            <Text style={styles.statNumber}>{averageScore}%</Text>
            <Text style={styles.statLabel}>Ortalama Skor</Text>
          </Card>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Vaka ara..."
            placeholderTextColor={COLORS.textMuted}
            value={filters.search}
            onChangeText={(text) => setFilters(prev => ({ ...prev, search: text }))}
          />
        </View>

        {/* Filter Section */}
        {showFilters && (
          <Card style={styles.filtersCard}>
            <Text style={styles.filtersTitle}>Filtreler</Text>
            
            {/* Department Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Bölüm</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                {DEPARTMENTS.map((dept) => (
                  <Pressable
                    key={dept}
                    style={[
                      styles.filterChip,
                      filters.department === dept && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, department: dept }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.department === dept && styles.filterChipTextActive
                    ]}>
                      {dept}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Difficulty Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Zorluk</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                {DIFFICULTIES.map((diff) => (
                  <Pressable
                    key={diff}
                    style={[
                      styles.filterChip,
                      filters.difficulty === diff && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, difficulty: diff }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.difficulty === diff && styles.filterChipTextActive
                    ]}>
                      {diff}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Card>
        )}

        {/* Cases List */}
        <View style={styles.casesContainer}>
          <Text style={styles.sectionTitle}>
            Vakalar ({filteredCases.length})
          </Text>
          
          {filteredCases.map((caseItem) => (
            <Card 
              key={caseItem.id} 
              style={styles.caseCard}
              onPress={() => {
                // Navigate to case details or replay
                console.log('Case selected:', caseItem.id);
              }}
            >
              <View style={styles.caseHeader}>
                <View style={styles.caseMainInfo}>
                  <Text style={styles.caseTitle}>{caseItem.title}</Text>
                  <Text style={styles.caseDepartment}>{caseItem.department}</Text>
                </View>
                <View style={styles.caseStatus}>
                  <MaterialCommunityIcons 
                    name={getStatusIcon(caseItem.status)} 
                    size={24} 
                    color={getStatusColor(caseItem.status)} 
                  />
                </View>
              </View>
              
              <View style={styles.caseDetails}>
                <View style={styles.caseMetrics}>
                  <View style={styles.metric}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.textMuted} />
                    <Text style={styles.metricText}>{caseItem.duration}</Text>
                  </View>
                  <View style={styles.metric}>
                    <MaterialCommunityIcons name="star" size={16} color={COLORS.warning} />
                    <Text style={styles.metricText}>{caseItem.score}%</Text>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(caseItem.difficulty) + '20' }]}>
                    <Text style={[styles.difficultyText, { color: getDifficultyColor(caseItem.difficulty) }]}>
                      {caseItem.difficulty}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.diagnosisLabel}>Tanı:</Text>
                <Text style={styles.diagnosisText}>{caseItem.diagnosis}</Text>
                
                <Text style={styles.completedDate}>
                  {new Date(caseItem.completedAt).toLocaleDateString('tr-TR')} tarihinde tamamlandı
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  filterButton: {
    padding: SPACING.sm,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.text,
  },
  filtersCard: {
    marginBottom: SPACING.lg,
  },
  filtersTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  filterGroup: {
    marginBottom: SPACING.md,
  },
  filterLabel: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  filterScroll: {
    marginRight: -SPACING.lg,
  },
  filterChip: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.large,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
  },
  filterChipTextActive: {
    color: COLORS.cardBackground,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  casesContainer: {
    gap: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  caseCard: {
    marginBottom: SPACING.sm,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  caseMainInfo: {
    flex: 1,
  },
  caseTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  caseDepartment: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  caseStatus: {
    marginLeft: SPACING.md,
  },
  caseDetails: {
    gap: SPACING.sm,
  },
  caseMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  metricText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
  },
  difficultyText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  diagnosisLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
  diagnosisText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
  },
  completedDate: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
});