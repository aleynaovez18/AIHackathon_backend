import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  date: string;
  category: 'badge' | 'milestone' | 'streak' | 'special';
}

export default function AchievementsScreen() {
  const router = useRouter();

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'İlk Vaka',
      description: 'İlk vakanızı başarıyla çözdünüz!',
      icon: 'medical-bag',
      color: COLORS.primary,
      date: '15 Mart 2024',
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Hızlı Çözüm',
      description: '5 dakikadan kısa sürede vaka çözdünüz',
      icon: 'lightning-bolt',
      color: COLORS.warning,
      date: '18 Mart 2024',
      category: 'badge'
    },
    {
      id: '3',
      title: '10 Vaka Ustası',
      description: '10 vakanızı başarıyla tamamladınız',
      icon: 'trophy',
      color: COLORS.accent,
      date: '25 Mart 2024',
      category: 'milestone'
    },
    {
      id: '4',
      title: '7 Günlük Seri',
      description: '7 gün üst üste vaka çözdünüz',
      icon: 'fire',
      color: COLORS.error,
      date: '2 Nisan 2024',
      category: 'streak'
    },
    {
      id: '5',
      title: 'Mükemmel Skor',
      description: '%100 doğrulukla vaka çözdünüz',
      icon: 'star',
      color: COLORS.success,
      date: '8 Nisan 2024',
      category: 'badge'
    },
    {
      id: '6',
      title: 'Uzman Tanı',
      description: 'Karmaşık bir vakanı doğru teşhis ettiniz',
      icon: 'brain',
      color: COLORS.primary,
      date: '12 Nisan 2024',
      category: 'special'
    },
    {
      id: '7',
      title: 'Takım Oyuncusu',
      description: 'Başka öğrencilerle tartışma başlattınız',
      icon: 'account-group',
      color: COLORS.accent,
      date: '15 Nisan 2024',
      category: 'badge'
    },
    {
      id: '8',
      title: 'Araştırmacı',
      description: 'Vaka çözümünde kaynak araştırması yaptınız',
      icon: 'magnify',
      color: COLORS.textMuted,
      date: '20 Nisan 2024',
      category: 'badge'
    }
  ];

  const categoryFilters = [
    { key: 'all', label: 'Tümü', icon: 'view-grid' },
    { key: 'milestone', label: 'Kilometre Taşları', icon: 'flag' },
    { key: 'badge', label: 'Rozetler', icon: 'medal' },
    { key: 'streak', label: 'Seriler', icon: 'fire' },
    { key: 'special', label: 'Özel', icon: 'star-circle' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return COLORS.primary;
      case 'badge': return COLORS.warning;
      case 'streak': return COLORS.error;
      case 'special': return COLORS.accent;
      default: return COLORS.textMuted;
    }
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <View style={styles.achievementCard}>
      <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '15' }]}>
        <MaterialCommunityIcons name={achievement.icon as any} size={32} color={achievement.color} />
      </View>
      <View style={styles.achievementContent}>
        <View style={styles.achievementHeader}>
          <Text style={styles.achievementTitle}>{achievement.title}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(achievement.category) + '20' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor(achievement.category) }]}>
              {categoryFilters.find(f => f.key === achievement.category)?.label}
            </Text>
          </View>
        </View>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.achievementDate}>{achievement.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
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
          <Text style={styles.headerTitle}>Başarılarım</Text>
          <Pressable accessibilityRole="button" hitSlop={8} style={styles.headerIconButton}>
            <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Stats Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Başarı Özeti</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>8</Text>
              <Text style={styles.summaryLabel}>Toplam Rozet</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Kilometre Taşı</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>7</Text>
              <Text style={styles.summaryLabel}>En Uzun Seri</Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {categoryFilters.map((filter) => (
            <Pressable key={filter.key} style={styles.filterTab}>
              <MaterialCommunityIcons name={filter.icon as any} size={20} color={COLORS.primary} />
              <Text style={styles.filterText}>{filter.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Achievements List */}
        <View style={styles.achievementsList}>
          <Text style={styles.sectionTitle}>Kazanılan Başarılar</Text>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        {/* Progress to Next Achievement */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Sonraki Başarı</Text>
          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <MaterialCommunityIcons name="target" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressName}>50 Vaka Ustası</Text>
              <Text style={styles.progressDescription}>50 vakanızı tamamlayın</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '94%' }]} />
              </View>
              <Text style={styles.progressText}>47/50 tamamlandı</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  summaryTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  summaryLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  filterContainer: {
    marginBottom: SPACING.lg,
  },
  filterContent: {
    paddingHorizontal: SPACING.sm,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
    marginHorizontal: SPACING.xs,
    gap: SPACING.xs,
    ...SHADOWS.small,
  },
  filterText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  achievementsList: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  achievementCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...SHADOWS.small,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  achievementTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
    marginLeft: SPACING.sm,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  achievementDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  achievementDate: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textLight,
  },
  progressCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  progressTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  progressContent: {
    flex: 1,
  },
  progressName: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  progressDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border + '30',
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
  },
});