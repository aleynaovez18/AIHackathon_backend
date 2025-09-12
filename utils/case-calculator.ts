import { Department } from '@/constants/faculty-system';
import { UserProgress } from './progress-manager';

export interface CaseStats {
  total: number;
  available: number;
  completed: number;
  locked: number;
  newThisWeek: number;
  difficulty: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}



/**
 * Calculate case statistics based on department and user progress
 */
export const calculateCaseStats = (
  department: Department, 
  userProgress: UserProgress
): CaseStats => {
  
  const baseMultiplier = getBaesMultiplierByDepartment(department.id);
  const facultyMultiplier = getFacultyMultiplier(department.targetFaculty, userProgress.faculty);
  const levelMultiplier = getLevelMultiplier(userProgress.level);
  
  // Calculate total cases for this department
  const totalCases = Math.floor(baseMultiplier * facultyMultiplier * levelMultiplier);
  
  // Calculate available cases based on user level
  const availableCases = Math.floor(totalCases * getAvailabilityRatio(userProgress.level));
  
  // Calculate completed cases (simulated based on user progress)
  const completedCases = Math.min(
    Math.floor(userProgress.completedCases * getDepartmentCompletionRatio(department.id)),
    availableCases
  );
  
  // Calculate locked cases
  const lockedCases = totalCases - availableCases;
  
  // Calculate new cases this week (simulated)
  const newThisWeek = Math.floor(Math.random() * 3) + 1;
  
  // Calculate difficulty distribution
  const difficulty = calculateDifficultyDistribution(totalCases);
  
  return {
    total: totalCases,
    available: availableCases,
    completed: completedCases,
    locked: lockedCases,
    newThisWeek,
    difficulty
  };
};

/**
 * Get base case multiplier for different departments
 */
const getBaesMultiplierByDepartment = (departmentId: string): number => {
  const multipliers: Record<string, number> = {
    // Medicine departments (generally more cases)
    'cardiology': 35,
    'neurology': 28,
    'pediatrics': 22,
    'emergency': 45,
    
    // Pharmacy departments (more focused case sets)
    'clinical-pharmacy': 38,
    'pharmacology': 31,
    'pharmaceutical-care': 26,
    'drug-safety': 19,
    
    // Collaborative departments (specialized)
    'interdisciplinary': 15,
    'precision-medicine': 12
  };
  
  return multipliers[departmentId] || 20;
};

/**
 * Get faculty-based multiplier
 */
const getFacultyMultiplier = (departmentTarget: string, userFaculty: string): number => {
  if (departmentTarget === 'both') return 1.0;
  
  const isTargetFaculty = (
    (departmentTarget === 'medicine' && userFaculty === 'Tıp Fakültesi') ||
    (departmentTarget === 'pharmacy' && userFaculty === 'Eczacılık Fakültesi')
  );
  
  return isTargetFaculty ? 1.0 : 0.7; // Non-target faculty gets 70% of cases
};

/**
 * Get level-based multiplier for case availability
 */
const getLevelMultiplier = (userLevel: number): number => {
  // More advanced users see more cases
  return Math.min(1.0 + (userLevel - 1) * 0.1, 1.5);
};

/**
 * Get availability ratio based on user level
 */
const getAvailabilityRatio = (userLevel: number): number => {
  // Level 1: 60% of cases available
  // Level 5: 80% of cases available
  // Level 10: 100% of cases available
  return Math.min(0.6 + (userLevel - 1) * 0.04, 1.0);
};

/**
 * Get department-specific completion ratio for simulation
 */
const getDepartmentCompletionRatio = (departmentId: string): number => {
  // Some departments are completed more than others
  const ratios: Record<string, number> = {
    'cardiology': 0.15,
    'emergency': 0.08,
    'pediatrics': 0.12,
    'clinical-pharmacy': 0.18,
    'drug-safety': 0.22,
    'interdisciplinary': 0.05
  };
  
  return ratios[departmentId] || 0.10;
};

/**
 * Calculate difficulty distribution
 */
const calculateDifficultyDistribution = (totalCases: number) => {
  return {
    beginner: Math.floor(totalCases * 0.4),     // 40% beginner
    intermediate: Math.floor(totalCases * 0.45), // 45% intermediate  
    advanced: Math.floor(totalCases * 0.15)     // 15% advanced
  };
};

/**
 * Generate realistic case count display string
 */
export const formatCaseCount = (stats: CaseStats): string => {
  const { available, completed, newThisWeek } = stats;
  
  if (newThisWeek > 0) {
    return `${available} vaka (+${newThisWeek} yeni)`;
  }
  
  if (completed > 0) {
    return `${available} vaka (${completed} tamamlandı)`;
  }
  
  return `${available} vaka`;
};

/**
 * Get mock user progress - in real app this would come from backend/storage
 */
export const getMockUserProgress = (): UserProgress => {
  return {
    level: 3,
    totalPoints: 2500,
    completedCases: 47,
    currentStreak: 12,
    faculty: 'Tıp Fakültesi', // This should come from user data
    achievements: [],
    weeklyGoal: 5,
    weeklyProgress: 3
  };
};