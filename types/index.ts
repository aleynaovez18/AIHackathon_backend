// Types for the application
export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  iconColor: string;
  iconName: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export interface ProfileMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  badge?: string;
  onPress: () => void;
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  university: string;
  avatar?: string;
  stats: {
    solvedCases: number;
    badges: number;
    successRate: number;
  };
}

export interface AnimationConfig {
  tension: number;
  friction: number;
  duration?: number;
  useNativeDriver: boolean;
}

// Navigation types
export type RouteParams = {
  deptId?: string;
  caseId?: string;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Theme types
export interface ColorScheme {
  primary: string;
  accent: string;
  background: string;
  cardBackground: string;
  text: string;
  textMuted: string;
  textLight: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  shadow: string;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface Typography {
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeights: {
    regular: '400';
    normal: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
    extraBold: '800';
  };
}