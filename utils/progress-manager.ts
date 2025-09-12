// User Progress Management System
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProgress {
  level: number;
  totalPoints: number;
  completedCases: number;
  currentStreak: number;
  faculty: string;
  achievements: Achievement[];
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

export interface CaseResult {
  caseId: string;
  score: number;
  timeSpent: number; // in minutes
  hintsUsed: number;
  completed: boolean;
  diagnosis: string;
  isCorrect: boolean;
}

const STORAGE_KEYS = {
  USER_PROGRESS: 'user_progress',
  CASE_RESULTS: 'case_results',
  ACHIEVEMENTS: 'achievements'
};

// Default progress for new users
const getDefaultProgress = (): UserProgress => ({
  level: 1,
  totalPoints: 0,
  completedCases: 0,
  currentStreak: 0,
  faculty: 'Tıp Fakültesi',
  achievements: [],
  weeklyGoal: 5,
  weeklyProgress: 0
});

// Level calculation system
export const calculateLevel = (totalPoints: number): number => {
  // Every 1000 points = 1 level, but with exponential growth
  if (totalPoints < 500) return 1;
  if (totalPoints < 1500) return 2;
  if (totalPoints < 3000) return 3;
  if (totalPoints < 5000) return 4;
  if (totalPoints < 8000) return 5;
  return Math.floor(Math.sqrt(totalPoints / 100)) + 1;
};

// Points calculation based on case performance
export const calculateCasePoints = (result: CaseResult): number => {
  let basePoints = result.isCorrect ? 100 : 20; // Base points for correct/incorrect
  
  // Bonus for perfect score
  if (result.score >= 90) basePoints += 50;
  else if (result.score >= 80) basePoints += 30;
  else if (result.score >= 70) basePoints += 15;
  
  // Penalty for hints
  const hintPenalty = result.hintsUsed * 10;
  
  // Time bonus (faster is better, but not too fast)
  let timeBonus = 0;
  if (result.timeSpent >= 5 && result.timeSpent <= 15) {
    timeBonus = 25; // Sweet spot
  } else if (result.timeSpent <= 25) {
    timeBonus = 10;
  }
  
  return Math.max(10, basePoints - hintPenalty + timeBonus);
};

// Achievement definitions
const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_case',
    title: 'İlk Adım',
    description: 'İlk vakayı tamamladın!',
    icon: 'medical-bag',
    points: 50
  },
  {
    id: 'perfect_score',
    title: 'Mükemmel Tanı',
    description: '100 puan ile bir vaka çözdün!',
    icon: 'trophy',
    points: 100
  },
  {
    id: 'streak_5',
    title: 'Tutarlılık',
    description: '5 vaka üst üste doğru çözdün!',
    icon: 'fire',
    points: 150
  },
  {
    id: 'pharmacy_collab',
    title: 'İşbirlikçi',
    description: 'Eczacılık konsültasyonu yaptın!',
    icon: 'account-group',
    points: 75
  },
  {
    id: 'level_5',
    title: 'Uzman Adayı',
    description: '5. seviyeye ulaştın!',
    icon: 'school',
    points: 200
  },
  {
    id: 'weekly_goal',
    title: 'Hedefi Vurdu',
    description: 'Haftalık hedefini tamamladın!',
    icon: 'target',
    points: 100
  }
];

// Storage functions
export const getUserProgress = async (): Promise<UserProgress> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
    return getDefaultProgress();
  } catch (error) {
    console.error('Error loading user progress:', error);
    return getDefaultProgress();
  }
};

export const saveUserProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const saveCaseResult = async (result: CaseResult): Promise<UserProgress> => {
  try {
    // Get current progress
    const currentProgress = await getUserProgress();
    
    // Calculate points for this case
    const earnedPoints = calculateCasePoints(result);
    
    // Update progress
    const newTotalPoints = currentProgress.totalPoints + earnedPoints;
    const newLevel = calculateLevel(newTotalPoints);
    const newCompletedCases = currentProgress.completedCases + (result.completed ? 1 : 0);
    const newStreak = result.isCorrect ? currentProgress.currentStreak + 1 : 0;
    
    // Check for new achievements
    const newAchievements = [...currentProgress.achievements];
    
    // First case achievement
    if (newCompletedCases === 1 && !hasAchievement(currentProgress, 'first_case')) {
      newAchievements.push(createAchievement('first_case'));
    }
    
    // Perfect score achievement
    if (result.score === 100 && !hasAchievement(currentProgress, 'perfect_score')) {
      newAchievements.push(createAchievement('perfect_score'));
    }
    
    // Streak achievement
    if (newStreak === 5 && !hasAchievement(currentProgress, 'streak_5')) {
      newAchievements.push(createAchievement('streak_5'));
    }
    
    // Level achievement
    if (newLevel === 5 && !hasAchievement(currentProgress, 'level_5')) {
      newAchievements.push(createAchievement('level_5'));
    }
    
    const updatedProgress: UserProgress = {
      ...currentProgress,
      level: newLevel,
      totalPoints: newTotalPoints,
      completedCases: newCompletedCases,
      currentStreak: newStreak,
      achievements: newAchievements,
      weeklyProgress: Math.min(currentProgress.weeklyProgress + 1, currentProgress.weeklyGoal)
    };
    
    // Save updated progress
    await saveUserProgress(updatedProgress);
    
    // Save case result for history
    const caseResults = await getCaseResults();
    caseResults.push(result);
    await AsyncStorage.setItem(STORAGE_KEYS.CASE_RESULTS, JSON.stringify(caseResults));
    
    return updatedProgress;
    
  } catch (error) {
    console.error('Error saving case result:', error);
    return await getUserProgress();
  }
};

export const getCaseResults = async (): Promise<CaseResult[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.CASE_RESULTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading case results:', error);
    return [];
  }
};

export const recordPharmacyConsultation = async (): Promise<UserProgress> => {
  try {
    const currentProgress = await getUserProgress();
    
    // Award points for pharmacy collaboration
    const collaborationPoints = 75;
    const newTotalPoints = currentProgress.totalPoints + collaborationPoints;
    const newLevel = calculateLevel(newTotalPoints);
    
    // Check for collaboration achievement
    const newAchievements = [...currentProgress.achievements];
    if (!hasAchievement(currentProgress, 'pharmacy_collab')) {
      newAchievements.push(createAchievement('pharmacy_collab'));
    }
    
    const updatedProgress: UserProgress = {
      ...currentProgress,
      level: newLevel,
      totalPoints: newTotalPoints,
      achievements: newAchievements
    };
    
    await saveUserProgress(updatedProgress);
    return updatedProgress;
    
  } catch (error) {
    console.error('Error recording pharmacy consultation:', error);
    return await getUserProgress();
  }
};

// Helper functions
const hasAchievement = (progress: UserProgress, achievementId: string): boolean => {
  return progress.achievements.some(achievement => achievement.id === achievementId);
};

const createAchievement = (achievementId: string): Achievement => {
  const template = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!template) throw new Error(`Achievement ${achievementId} not found`);
  
  return {
    ...template,
    unlockedAt: new Date().toISOString()
  };
};

// Progress analytics
export const getProgressAnalytics = (progress: UserProgress) => {
  const pointsToNextLevel = getPointsToNextLevel(progress.totalPoints);
  const levelProgress = getLevelProgress(progress.totalPoints);
  const weeklyProgressPercentage = (progress.weeklyProgress / progress.weeklyGoal) * 100;
  
  return {
    pointsToNextLevel,
    levelProgress,
    weeklyProgressPercentage,
    averageScore: calculateAverageScore(progress),
    totalPlayTime: estimateTotalPlayTime(progress)
  };
};

const getPointsToNextLevel = (currentPoints: number): number => {
  const currentLevel = calculateLevel(currentPoints);
  const nextLevelThresholds = [500, 1500, 3000, 5000, 8000];
  
  if (currentLevel <= 5) {
    return nextLevelThresholds[currentLevel - 1] - currentPoints;
  }
  
  // For levels beyond 5, use formula
  const nextLevelPoints = Math.pow(currentLevel + 1 - 1, 2) * 100;
  return nextLevelPoints - currentPoints;
};

const getLevelProgress = (currentPoints: number): number => {
  const currentLevel = calculateLevel(currentPoints);
  const currentLevelMin = currentLevel === 1 ? 0 : getPointsForLevel(currentLevel);
  const nextLevelMin = getPointsForLevel(currentLevel + 1);
  
  return ((currentPoints - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
};

const getPointsForLevel = (level: number): number => {
  if (level <= 1) return 0;
  if (level === 2) return 500;
  if (level === 3) return 1500;
  if (level === 4) return 3000;
  if (level === 5) return 5000;
  return Math.pow(level - 1, 2) * 100;
};

const calculateAverageScore = (progress: UserProgress): number => {
  return progress.completedCases > 0 ? Math.round(progress.totalPoints / progress.completedCases) : 0;
};

const estimateTotalPlayTime = (progress: UserProgress): number => {
  // Estimate based on completed cases (average 10 minutes per case)
  return progress.completedCases * 10;
};

// Reset progress (for testing)
export const resetUserProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    await AsyncStorage.removeItem(STORAGE_KEYS.CASE_RESULTS);
    await AsyncStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
};