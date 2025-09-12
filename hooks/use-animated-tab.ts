import { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ANIMATIONS } from '@/constants/design-system';
import { TabItem } from '@/types';

/**
 * Custom hook for managing animated tab transitions
 * Follows Single Responsibility Principle - only handles tab animations
 */
export const useAnimatedTab = (activeTab: string, tabItems: TabItem[]) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  // Calculate tab width based on number of tabs
  const tabWidth = screenWidth / tabItems.length;

  /**
   * Animate to specific tab
   * @param tabId - Target tab identifier
   */
  const animateToTab = (tabId: string) => {
    const currentIndex = tabItems.findIndex(tab => tab.id === activeTab);
    const newIndex = tabItems.findIndex(tab => tab.id === tabId);
    
    // Calculate slide distance
    const slideDistance = newIndex * tabWidth;
    
    // Animate with spring physics
    Animated.spring(slideAnim, {
      toValue: slideDistance,
      ...ANIMATIONS.slide,
    }).start();
  };

  // Initialize position on mount
  useEffect(() => {
    const currentIndex = tabItems.findIndex(tab => tab.id === activeTab);
    slideAnim.setValue(currentIndex * tabWidth);
  }, []);

  return {
    slideAnim,
    tabWidth,
    animateToTab,
  };
};