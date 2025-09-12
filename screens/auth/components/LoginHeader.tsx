import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '@/constants/design-system';

interface LoginHeaderProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ imageUrl, title, subtitle }) => (
  <>
    <View style={styles.headerImageContainer}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.headerImage}
        contentFit="cover"
      />
      <View style={styles.headerImageOverlay} />
      {/* Floating Elements */}
      <View style={styles.floatingElements}>
        <View style={styles.floatingCircle1} />
        <View style={styles.floatingCircle2} />
        <View style={styles.floatingCircle3} />
      </View>
    </View>
    
    <View style={styles.titleSection}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.titleUnderline} />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  headerImageContainer: {
    height: 300,                          // Slightly taller
    position: 'relative',
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(79, 70, 229, 0.6)', // Primary color overlay
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircle1: {
    position: 'absolute',
    top: 60,
    right: 40,
    width: 100,                           // Larger circles
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.accent + '40', // More visible
  },
  floatingCircle2: {
    position: 'absolute',
    top: 140,
    left: 30,
    width: 80,                            // Larger
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.warning + '35', // More visible
  },
  floatingCircle3: {
    position: 'absolute',
    bottom: 60,
    right: 80,
    width: 60,                            // Larger
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.success + '40', // More visible
  },
  titleSection: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl + 8,     // More padding
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    marginTop: -20,                       // Overlap effect
    borderTopLeftRadius: 24,              // Rounded top corners
    borderTopRightRadius: 24,
    ...SHADOWS.large,                     // Add shadow
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,             // More spacing
  },
  title: {
    fontSize: 36,                         // Larger title
    fontWeight: TYPOGRAPHY.fontWeights.extraBold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
    letterSpacing: -0.8,                  // Better letter spacing
    lineHeight: 42,                       // Better line height
  },
  titleUnderline: {
    width: 80,                            // Longer underline
    height: 5,                            // Thicker
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    ...SHADOWS.small,                     // Add shadow to underline
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,    // Larger subtitle
    color: COLORS.textMuted,
    lineHeight: 26,                       // Better line height
    textAlign: 'center',
    maxWidth: 320,                        // Wider
    fontWeight: TYPOGRAPHY.fontWeights.medium, // Slightly bolder
  },
});