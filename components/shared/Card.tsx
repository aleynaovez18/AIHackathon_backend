import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  onPress, 
  shadow = true 
}) => {
  if (onPress) {
    return (
      <Pressable 
        style={({ pressed }) => [
          styles.card,
          shadow && SHADOWS.small,
          style,
          pressed && styles.cardPressed
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, shadow && SHADOWS.small, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
});