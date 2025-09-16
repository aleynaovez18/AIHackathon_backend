import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { Card } from '@/components/shared/Card';

// Mock data for favorite cases
const FAVORITE_CASES = [
  {
    id: '1',
    title: 'Akut Miyokard İnfarktüsü',
    department: 'Kardiyoloji',
    difficulty: 'Zor',
    addedAt: '2024-01-15',
    lastAccessed: '2024-01-18',
    score: 92,
    symptoms: ['Göğüs ağrısı', 'Nefes darlığı', 'Terleme'],
    diagnosis: 'STEMI',
    status: 'completed' as const,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Diyabetik Ketoasidoz',
    department: 'Endokrinoloji',
    difficulty: 'Orta',
    addedAt: '2024-01-14',
    lastAccessed: '2024-01-17',
    score: 88,
    symptoms: ['Bulantı', 'Kusma', 'Karın ağrısı'],
    diagnosis: 'DKA',
    status: 'completed' as const,
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Astım Krizi',
    department: 'Göğüs Hastalıkları',
    difficulty: 'Kolay',
    addedAt: '2024-01-13',
    lastAccessed: '2024-01-16',
    score: 95,
    symptoms: ['Nefes darlığı', 'Wheezing', 'Öksürük'],
    diagnosis: 'Astım eksaserbasyonu',
    status: 'completed' as const,
    isFavorite: true,
  },
];

export default function FavoritesScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: '',
    department: 'Tümü',
    difficulty: 'Tümü',
    status: 'Tümü',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(FAVORITE_CASES);

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
      case 'completed': return 'check-circle';
      case 'in_progress': return 'play-circle';
      case 'not_started': return 'circle-outline';
      default: return 'help-circle';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'in_progress': return COLORS.warning;
      case 'not_started': return COLORS.textMuted;
      default: return COLORS.textMuted;
    }
  };

  const toggleFavorite = (caseId: string) => {
    setFavorites(prev => 
      prev.map(case_item => 
        case_item.id === caseId 
          ? { ...case_item, isFavorite: !case_item.isFavorite }
          : case_item
      ).filter(case_item => case_item.isFavorite)
    );
  };

  const totalFavorites = favorites.length;
  const completedFavorites = favorites.filter(c => c.status === 'completed').length;
  const averageScore = completedFavorites > 0 
    ? Math.round(favorites.filter(c => c.status === 'completed').reduce((acc, c) => acc + c.score, 0) / completedFavorites)
    : 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favori Vakalar</Text>
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
            <MaterialCommunityIcons name="heart" size={32} color={COLORS.error} />
            <Text style={styles.statNumber}>{totalFavorites}</Text>
            <Text style={styles.statLabel}>Favori Vaka</Text>
          </Card>
          <Card style={styles.statCard}>
            <MaterialCommunityIcons name="check-circle" size={32} color={COLORS.success} />
            <Text style={styles.statNumber}>{completedFavorites}</Text>
            <Text style={styles.statLabel}>Tamamlanmış</Text>
          </Card>
          <Card style={styles.statCard}>
            <MaterialCommunityIcons name="star" size={32} color={COLORS.warning} />
            <Text style={styles.statNumber}>{averageScore}%</Text>
            <Text style={styles.statLabel}>Ortalama Skor</Text>
          </Card>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Favori vakalarınızda arayın..."
            placeholderTextColor={COLORS.textMuted}
            value={filters.search}
            onChangeText={(text) => setFilters(prev => ({ ...prev, search: text }))}
          />
        </View>

        {/* Cases List */}
        <View style={styles.casesContainer}>
          <Text style={styles.sectionTitle}>
            Favori Vakalar ({favorites.length})
          </Text>
          
          {favorites.length === 0 ? (
            <Card style={styles.emptyCard}>
              <MaterialCommunityIcons name="heart-outline" size={64} color={COLORS.textMuted} />
              <Text style={styles.emptyTitle}>Henüz favori vaka yok</Text>
              <Text style={styles.emptySubtitle}>
                Beğendiğiniz vakaları favorilere ekleyerek buradan kolayca erişebilirsiniz.
              </Text>
            </Card>
          ) : (
            favorites.map((caseItem) => (
              <Card 
                key={caseItem.id} 
                style={styles.caseCard}
                onPress={() => {
                  // Navigate to case review screen
                  router.push(`/case-review?caseId=${caseItem.id}` as any);
                }}
              >
                <View style={styles.caseHeader}>
                  <View style={styles.caseMainInfo}>
                    <Text style={styles.caseTitle}>{caseItem.title}</Text>
                    <Text style={styles.caseDepartment}>{caseItem.department}</Text>
                  </View>
                  <View style={styles.caseActions}>
                    <Pressable 
                      onPress={() => toggleFavorite(caseItem.id)}
                      style={styles.favoriteButton}
                    >
                      <MaterialCommunityIcons 
                        name={caseItem.isFavorite ? "heart" : "heart-outline"}
                        size={24} 
                        color={caseItem.isFavorite ? COLORS.error : COLORS.textMuted} 
                      />
                    </Pressable>
                  </View>
                </View>
                
                <View style={styles.caseDetails}>
                  <View style={styles.caseMetrics}>
                    <View style={styles.metric}>
                      <MaterialCommunityIcons name="calendar" size={16} color={COLORS.textMuted} />
                      <Text style={styles.metricText}>
                        {new Date(caseItem.addedAt).toLocaleDateString('tr-TR')}
                      </Text>
                    </View>
                    {caseItem.status === 'completed' && (
                      <View style={styles.metric}>
                        <MaterialCommunityIcons name="star" size={16} color={COLORS.warning} />
                        <Text style={styles.metricText}>{caseItem.score}%</Text>
                      </View>
                    )}
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(caseItem.difficulty) + '20' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(caseItem.difficulty) }]}>
                        {caseItem.difficulty}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.diagnosisLabel}>Tanı:</Text>
                  <Text style={styles.diagnosisText}>{caseItem.diagnosis}</Text>
                  
                  <Text style={styles.lastAccessedDate}>
                    Son erişim: {new Date(caseItem.lastAccessed).toLocaleDateString('tr-TR')}
                  </Text>
                  
                  <View style={styles.reviewHint}>
                    <MaterialCommunityIcons name="eye" size={14} color={COLORS.primary} />
                    <Text style={styles.reviewHintText}>Çözüm sürecini incele</Text>
                  </View>
                </View>
              </Card>
            ))
          )}
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
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
  casesContainer: {
    gap: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
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
  caseActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  favoriteButton: {
    padding: SPACING.xs,
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
  lastAccessedDate: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
  reviewHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border + '30',
  },
  reviewHintText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});