import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface RegisterHeaderProps {
  title: string;
  subtitle: string;
  onBack: () => void;
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = ({ 
  title, 
  subtitle, 
  onBack 
}) => (
  <View style={styles.container}>
    <View style={styles.backgroundGradient} />
    
    {/* Back Button */}
    <Pressable onPress={onBack} style={styles.backButton}>
      <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.cardBackground} />
    </Pressable>
    
    {/* Content */}
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account-plus" size={48} color={COLORS.cardBackground} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    minHeight: 280,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: BORDER_RADIUS.xlarge,
    borderBottomRightRadius: BORDER_RADIUS.xlarge,
  },
  backButton: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    padding: SPACING.sm,
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.cardBackground + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.cardBackground,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.cardBackground + 'DD',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
});