import { ColorScheme, Spacing, Typography, AnimationConfig } from '@/types';

// Design System - Enhanced with vibrant colors
export const COLORS: ColorScheme = {
  primary: '#4f46e5',     // Rich indigo - more vibrant
  accent: '#0ea5e9',      // Bright sky blue
  background: '#f8fafc',  // Light gray background
  cardBackground: '#ffffff',
  text: '#0f172a',        // Darker text for better contrast
  textMuted: '#475569',   // Medium gray with more contrast
  textLight: '#64748b',   // Light gray with better visibility
  border: '#cbd5e1',      // More visible border
  success: '#059669',     // Richer green
  warning: '#d97706',     // Vibrant orange
  error: '#dc2626',       // Strong red
  shadow: '#000000',
};

export const SPACING: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const TYPOGRAPHY: Typography = {
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
  },
  fontWeights: {
    regular: '400',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extraBold: '800',
  },
} as const;

// Animation configurations
export const ANIMATIONS: Record<string, AnimationConfig> = {
  spring: {
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  },
  fade: {
    tension: 80,
    friction: 6,
    duration: 300,
    useNativeDriver: true,
  },
  slide: {
    tension: 120,
    friction: 10,
    useNativeDriver: true,
  },
};

// Enhanced Shadow configurations for better depth
export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,     // Slightly more visible
    shadowRadius: 10,        // Softer shadow
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.12,     // More pronounced
    shadowRadius: 18,        // Larger spread
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.16,     // Strong shadow
    shadowRadius: 30,        // Very soft edges
    shadowOffset: { width: 0, height: 15 },
    elevation: 12,
  },
};

// Border radius configurations
export const BORDER_RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  round: 50,
};

// Department data - moved from component for better separation of concerns
export const DEPARTMENTS = [
  {
    id: 'cardiology',
    name: 'Kardiyoloji',
    description: 'Kalp ve damar hastalıkları ile ilgili vakalar.',
    color: '#fee2e2',
    iconColor: '#ef4444',
    iconName: 'cardiology',
  },
  {
    id: 'neurology',
    name: 'Nöroloji',
    description: 'Beyin ve sinir sistemi hastalıkları üzerine vakalar.',
    color: '#dbeafe',
    iconColor: '#3b82f6',
    iconName: 'neurology',
  },
  {
    id: 'pediatrics',
    name: 'Pediatri',
    description: 'Çocuk sağlığı ve hastalıklarına odaklanan vakalar.',
    color: '#dcfce7',
    iconColor: '#22c55e',
    iconName: 'pediatrics',
  },
  {
    id: 'psychiatry',
    name: 'Psikiyatri',
    description: 'Ruhsal bozukluklar ve davranışsal problemler.',
    color: '#f3e8ff',
    iconColor: '#a855f7',
    iconName: 'psychiatry',
  },
  {
    id: 'endocrinology',
    name: 'Endokrinoloji',
    description: 'Hormonal sistem ve metabolik hastalıklar.',
    color: '#fef08a',
    iconColor: '#eab308',
    iconName: 'endocrinology',
  },
  {
    id: 'dermatology',
    name: 'Dermatoloji',
    description: 'Cilt, saç ve tırnak hastalıkları ile ilgili vakalar.',
    color: '#ccfbf1',
    iconColor: '#14b8a6',
    iconName: 'dermatology',
  },
];

// Tab configuration
export const TAB_ITEMS = [
  {
    id: 'departments',
    label: 'Bölümler',
    icon: 'folder-multiple',
    route: '/departments'
  },
  {
    id: 'cases',
    label: 'Çözülen Vakalar',
    icon: 'check-circle',
    route: '/cases'
  },
  {
    id: 'favorites',
    label: 'Favoriler',
    icon: 'heart',
    route: '/favorites'
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: 'account-circle',
    route: '/profile'
  }
];