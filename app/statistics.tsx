import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

const { width } = Dimensions.get('window');

interface StatPeriod {
  key: string;
  label: string;
}

interface ChartData {
  period: string;
  cases: number;
  accuracy: number;
}

export default function StatisticsScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');

  const periods: StatPeriod[] = [
    { key: 'week', label: 'Bu Hafta' },
    { key: 'month', label: 'Bu Ay' },
    { key: 'year', label: 'Bu Yıl' },
    { key: 'all', label: 'Tüm Zamanlar' }
  ];

  const weeklyData: ChartData[] = [
    { period: 'Pzt', cases: 3, accuracy: 85 },
    { period: 'Sal', cases: 5, accuracy: 92 },
    { period: 'Çar', cases: 2, accuracy: 88 },
    { period: 'Per', cases: 4, accuracy: 95 },
    { period: 'Cum', cases: 6, accuracy: 89 },
    { period: 'Cmt', cases: 1, accuracy: 100 },
    { period: 'Paz', cases: 2, accuracy: 90 }
  ];

  const getMaxCases = () => Math.max(...weeklyData.map(d => d.cases));

  const StatCard = ({ title, value, subtitle, icon, color, trend }: any) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <View style={styles.statValueContainer}>
          <Text style={[styles.statValue, { color }]}>{value}</Text>
          {trend && (
            <View style={[styles.trendContainer, { backgroundColor: trend > 0 ? COLORS.success + '20' : COLORS.error + '20' }]}>
              <MaterialCommunityIcons 
                name={trend > 0 ? "trending-up" : "trending-down"} 
                size={12} 
                color={trend > 0 ? COLORS.success : COLORS.error} 
              />
              <Text style={[styles.trendText, { color: trend > 0 ? COLORS.success : COLORS.error }]}>
                {Math.abs(trend)}%
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.statSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  const ChartBar = ({ data, maxValue }: { data: ChartData; maxValue: number }) => {
    const height = (data.cases / maxValue) * 100;
    return (
      <View style={styles.chartBarContainer}>
        <View style={styles.chartBar}>
          <View style={[styles.chartBarFill, { height: `${height}%` }]} />
        </View>
        <Text style={styles.chartBarValue}>{data.cases}</Text>
        <Text style={styles.chartBarLabel}>{data.period}</Text>
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>İstatistikler</Text>
          <Pressable accessibilityRole="button" hitSlop={8} style={styles.headerIconButton}>
            <MaterialCommunityIcons name="download" size={24} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Period Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.periodContainer}
          contentContainerStyle={styles.periodContent}
        >
          {periods.map((period) => (
            <Pressable 
              key={period.key} 
              style={[
                styles.periodTab,
                selectedPeriod === period.key && styles.periodTabActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.key && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Key Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Toplam Vaka"
            value="47"
            subtitle="Son 30 günde"
            icon="medical-bag"
            color={COLORS.primary}
            trend={+12}
          />
          <StatCard
            title="Başarı Oranı"
            value="92%"
            subtitle="Ortalama doğruluk"
            icon="target"
            color={COLORS.success}
            trend={+5}
          />
          <StatCard
            title="Çalışma Süresi"
            value="24h"
            subtitle="Bu ay toplam"
            icon="clock"
            color={COLORS.warning}
            trend={-8}
          />
          <StatCard
            title="Sıralama"
            value="#12"
            subtitle="Sınıf içinde"
            icon="trophy"
            color={COLORS.accent}
            trend={+3}
          />
        </View>

        {/* Activity Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Haftalık Aktivite</Text>
            <Text style={styles.chartSubtitle}>Çözülen vaka sayısı</Text>
          </View>
          
          <View style={styles.chart}>
            {weeklyData.map((data, index) => (
              <ChartBar key={index} data={data} maxValue={getMaxCases()} />
            ))}
          </View>
        </View>

        {/* Performance Breakdown */}
        <View style={styles.performanceCard}>
          <Text style={styles.sectionTitle}>Performans Analizi</Text>
          
          <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceLabel}>Kardiyoloji</Text>
              <Text style={styles.performanceValue}>95%</Text>
            </View>
            <View style={styles.performanceBar}>
              <View style={[styles.performanceBarFill, { width: '95%', backgroundColor: COLORS.success }]} />
            </View>
          </View>

          <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceLabel}>Nöroloji</Text>
              <Text style={styles.performanceValue}>87%</Text>
            </View>
            <View style={styles.performanceBar}>
              <View style={[styles.performanceBarFill, { width: '87%', backgroundColor: COLORS.primary }]} />
            </View>
          </View>

          <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceLabel}>Gastroenteroloji</Text>
              <Text style={styles.performanceValue}>92%</Text>
            </View>
            <View style={styles.performanceBar}>
              <View style={[styles.performanceBarFill, { width: '92%', backgroundColor: COLORS.accent }]} />
            </View>
          </View>

          <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceLabel}>Dermatoloji</Text>
              <Text style={styles.performanceValue}>78%</Text>
            </View>
            <View style={styles.performanceBar}>
              <View style={[styles.performanceBarFill, { width: '78%', backgroundColor: COLORS.warning }]} />
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          
          {[
            { icon: 'check-circle', text: 'Kardiyak arrest vakası çözüldü', time: '2 saat önce', color: COLORS.success },
            { icon: 'lightning-bolt', text: 'Hızlı çözüm rozeti kazanıldı', time: '4 saat önce', color: COLORS.warning },
            { icon: 'brain', text: 'Nöroloji vakası başlatıldı', time: '1 gün önce', color: COLORS.primary },
            { icon: 'trophy', text: '10 vaka kilometretaşı', time: '2 gün önce', color: COLORS.accent }
          ].map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '15' }]}>
                <MaterialCommunityIcons name={activity.icon as any} size={16} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>{activity.text}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
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
  periodContainer: {
    marginBottom: SPACING.lg,
  },
  periodContent: {
    paddingHorizontal: SPACING.sm,
  },
  periodTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    marginHorizontal: SPACING.xs,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
  periodTabActive: {
    backgroundColor: COLORS.primary,
  },
  periodText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  periodTextActive: {
    color: COLORS.cardBackground,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    width: (width - SPACING.lg * 3) / 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...SHADOWS.small,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    marginRight: SPACING.xs,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.small,
    gap: SPACING.xs / 2,
  },
  trendText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  statSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textLight,
  },
  chartCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  chartHeader: {
    marginBottom: SPACING.lg,
  },
  chartTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  chartSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: COLORS.border + '30',
    borderRadius: BORDER_RADIUS.small,
    justifyContent: 'flex-end',
    marginBottom: SPACING.sm,
  },
  chartBarFill: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.small,
    minHeight: 4,
  },
  chartBarValue: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginBottom: SPACING.xs,
  },
  chartBarLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
  },
  performanceCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  performanceItem: {
    marginBottom: SPACING.lg,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  performanceLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  performanceValue: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  performanceBar: {
    height: 8,
    backgroundColor: COLORS.border + '30',
    borderRadius: 4,
  },
  performanceBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  activityCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  activityTime: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
  },
});