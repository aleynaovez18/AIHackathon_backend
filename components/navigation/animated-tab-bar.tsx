import React from 'react';
import { View, Pressable, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TabItem } from '@/types';
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING, TYPOGRAPHY } from '@/constants/design-system';
import { useAnimatedTab } from '@/hooks/use-animated-tab';

interface AnimatedTabBarProps {
  tabItems: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string, route: string) => void;
}

/**
 * Animated Tab Bar Component
 * Implements:
 * - Single Responsibility Principle: Only handles tab navigation UI
 * - Open/Closed Principle: Easily extensible with new tab types
 * - Interface Segregation: Clean props interface
 */
export const AnimatedTabBar: React.FC<AnimatedTabBarProps> = ({
  tabItems,
  activeTab,
  onTabPress,
}) => {
  const { slideAnim, tabWidth } = useAnimatedTab(activeTab, tabItems);

  const handleTabPress = (tab: TabItem) => {
    onTabPress(tab.id, tab.route);
  };

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarInner}>
        {/* Animated Slide Indicator */}
        <Animated.View 
          style={[
            styles.slideIndicator,
            {
              width: tabWidth,
              transform: [{ translateX: slideAnim }]
            }
          ]} 
        />
        
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TabItemComponent
              key={tab.id}
              tab={tab}
              isActive={isActive}
              onPress={() => handleTabPress(tab)}
            />
          );
        })}
      </View>
    </View>
  );
};

/**
 * Individual Tab Item Component
 * Follows Single Responsibility Principle
 */
interface TabItemComponentProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
}

const TabItemComponent: React.FC<TabItemComponentProps> = ({ tab, isActive, onPress }) => (
  <Pressable
    style={({ pressed }) => [
      styles.tabItem,
      isActive && styles.tabItemActive,
      pressed && styles.tabItemPressed
    ]}
    onPress={onPress}
    accessibilityRole="tab"
    accessibilityState={{ selected: isActive }}
    accessibilityLabel={tab.label}
  >
    <View style={[
      styles.tabIconContainer,
      isActive && styles.tabIconContainerActive
    ]}>
      <MaterialCommunityIcons 
        name={tab.icon as any}
        size={22} 
        color={isActive ? COLORS.cardBackground : COLORS.textMuted}
      />
    </View>
    <Text style={[
      styles.tabLabel,
      isActive && styles.tabLabelActive
    ]}>
      {tab.label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 0,
    ...SHADOWS.large,
    paddingBottom: SPACING.sm + 4,
    paddingTop: SPACING.md,
    borderTopLeftRadius: BORDER_RADIUS.xlarge,
    borderTopRightRadius: BORDER_RADIUS.xlarge,
    marginTop: -BORDER_RADIUS.xlarge,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    position: 'relative',
  },
  slideIndicator: {
    position: 'absolute',
    bottom: -SPACING.sm,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    left: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.large,
    position: 'relative',
    minHeight: 64,
  },
  tabItemActive: {
    backgroundColor: COLORS.primary + '10',
  },
  tabItemPressed: {
    backgroundColor: COLORS.primary + '05',
    transform: [{ scale: 0.96 }],
  },
  tabIconContainer: {
    width: 42,
    height: 42,
    borderRadius: BORDER_RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
    backgroundColor: 'transparent',
  },
  tabIconContainerActive: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
  },
  tabLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textAlign: 'center',
    lineHeight: 14,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
});