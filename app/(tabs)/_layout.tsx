import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { AnimatedTabBar } from '@/components/navigation/animated-tab-bar';
import { TAB_ITEMS } from '@/constants/design-system';
import { COLORS } from '@/constants/design-system';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine active tab based on current pathname
  const getActiveTab = () => {
    // Check for exact matches first
    const exactMatch = TAB_ITEMS.find(tab => pathname === tab.route);
    if (exactMatch) return exactMatch.id;
    
    // Handle special cases for nested routes
    if (pathname === '/' || pathname === '') {
      return 'departments';
    }
    
    // Default to departments if no match
    return 'departments';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [pathname]);

  const handleTabPress = (tabId: string, route: string) => {
    setActiveTab(tabId);
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      
      {/* Enhanced Tab Bar */}
      <AnimatedTabBar
        tabItems={TAB_ITEMS}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});