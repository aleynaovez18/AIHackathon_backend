import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Animated
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';
import { Department } from '@/constants/faculty-system';

// Import organized components
import { HeroSection } from './components/HeroSection';
import { QuickActionCard } from './components/QuickActionCard';
import { DepartmentCard } from './components/DepartmentCard';
import { ActivityItem } from './components/ActivityItem';

// Import hooks
import { useDepartmentData } from './hooks/useDepartmentData';
import { useGreeting } from './hooks/useGreeting';

// Import types
import { QuickAction, ActivityData } from './types/department.types';

/**
 * Enhanced Departments Screen Component
 * 
 * Features:
 * - Modern hero section with gradient
 * - Stats cards
 * - Categorized departments
 * - Quick actions
 * - Enhanced animations
 */
export default function DepartmentsScreen() {
  const router = useRouter();
  const [userFaculty] = React.useState('Tıp Fakültesi'); // This should come from user storage
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // Use custom hooks
  const greeting = useGreeting();
  const { departments, departmentStats, welcomeData, userProgress } = useDepartmentData(userFaculty);

  const handleDepartmentPress = (department: Department) => {
    router.push({ 
      pathname: '/case', 
      params: { deptId: department.id } 
    });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Quick actions data
  const quickActions: QuickAction[] = [
    {
      icon: userFaculty === 'Tıp Fakültesi' ? 'stethoscope' : 'pill',
      title: userFaculty === 'Tıp Fakültesi' ? 'AI Tanı Desteği' : 'İlaç AI Kontrolü',
      subtitle: userFaculty === 'Tıp Fakültesi' ? 'Semptom analizi ile tanı' : 'İlaç etkileşim kontrolü',
      color: COLORS.warning,
      route: '/case'
    },
    {
      icon: 'account-group',
      title: 'Disiplinler Arası',
      subtitle: 'Tıp-Eczacılık işbirliği',
      color: COLORS.success,
      route: '/case'
    }
  ];

  // Recent activities data
  const recentActivities: ActivityData[] = [
    {
      icon: 'check-circle',
      title: 'Kardiyoloji Vakası Tamamlandı',
      subtitle: '2 saat önce',
      color: COLORS.success
    },
    {
      icon: 'account-plus',
      title: 'Yeni Takipçi',
      subtitle: '5 saat önce',
      color: COLORS.primary
    },
    {
      icon: 'trophy',
      title: 'Rozet Kazanıldı: Nöroloji Uzmanı',
      subtitle: '1 gün önce',
      color: COLORS.warning
    }
  ];

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>VakaÇöz</Text>
          <Pressable style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.text} />
            <View style={styles.notificationBadge} />
          </Pressable>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <HeroSection
          greeting={greeting}
          userName="Furkan"
          facultyName={userFaculty}
          userProgress={userProgress}
        />

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>
            {welcomeData ? welcomeData.title : 'Hızlı Aksiyonlar'}
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                icon={action.icon}
                title={action.title}
                subtitle={action.subtitle}
                color={action.color}
                onPress={() => router.push(action.route as any)}
              />
            ))}
          </View>
        </View>

        {/* Department Categories */}
        <View style={styles.departmentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bölümler</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color={COLORS.primary} />
            </Pressable>
          </View>
          
          <View style={styles.departmentsGrid}>
            {departments.slice(0, 6).map((dept) => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                caseStats={departmentStats[dept.id]}
                onPress={() => handleDepartmentPress(dept)}
              />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <View style={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={activity.icon}
                title={activity.title}
                subtitle={activity.subtitle}
                color={activity.color}
              />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

/* ==================== STYLES ==================== */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  notificationButton: {
    position: 'relative',
    padding: SPACING.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Quick Actions Section
  quickActionsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },

  // Departments Section
  departmentsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  seeAllText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  departmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },

  // Recent Activity Section
  recentSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  activityList: {
    gap: SPACING.md,
  },
});