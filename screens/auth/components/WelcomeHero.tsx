import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '@/constants/design-system';

interface WelcomeHeroProps {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ fadeAnim, scaleAnim }) => (
  <Animated.View 
    style={[
      styles.contentContainer,
      {
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      },
    ]}
  >
    {/* Enhanced Logo Section */}
    <View style={styles.logoPlaceholder}>
      <View style={styles.logoOuterRing}>
        <View style={styles.logoGradientCircle}>
          <View style={styles.logoInnerCircle}>
            <MaterialCommunityIcons name="stethoscope" size={80} color={COLORS.primary} />
          </View>
        </View>
      </View>
      
      {/* Floating Particles */}
      <View style={styles.particlesContainer}>
        <View style={[styles.particle, styles.particle1]} />
        <View style={[styles.particle, styles.particle2]} />
        <View style={[styles.particle, styles.particle3]} />
        <View style={[styles.particle, styles.particle4]} />
      </View>
    </View>

    {/* Enhanced Text Section */}
    <View style={styles.textContainer}>
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>Ortak Vaka Çözümü</Text>
        <View style={styles.titleGradientBackground}>
          <Text style={styles.titleTextAccent}>Platformu</Text>
        </View>
      </View>
      
      <Text style={styles.subtitleText}>
        Eczacılık ve tıp fakültesi öğrencilerinin birlikte öğrendiği, geliştiği ve vakaları
        çözdüğü yenilikçi eğitim alanı.
      </Text>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureCard}>
          <MaterialCommunityIcons name="brain" size={24} color={COLORS.primary} />
          <Text style={styles.featureText}>AI Destekli</Text>
        </View>
        <View style={styles.featureCard}>
          <MaterialCommunityIcons name="account-group" size={24} color={COLORS.accent} />
          <Text style={styles.featureText}>Disiplinler Arası</Text>
        </View>
        <View style={styles.featureCard}>
          <MaterialCommunityIcons name="trophy" size={24} color={COLORS.warning} />
          <Text style={styles.featureText}>Gamifikasyon</Text>
        </View>
      </View>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  logoPlaceholder: {
    marginBottom: SPACING.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoOuterRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    padding: 8,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.large,
  },
  logoGradientCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 102,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  logoInnerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particlesContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
  particle1: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.primary + '40',
    top: 20,
    right: 40,
  },
  particle2: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.accent + '60',
    bottom: 60,
    left: 30,
  },
  particle3: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.warning + '30',
    top: 80,
    left: 20,
  },
  particle4: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.success + '50',
    bottom: 20,
    right: 60,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 350,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  titleText: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.fontWeights.extraBold,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: SPACING.sm,
  },
  titleGradientBackground: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.primary,
  },
  titleTextAccent: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.fontWeights.extraBold,
    color: COLORS.cardBackground,
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    lineHeight: 24,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.fontWeights.regular,
    marginBottom: SPACING.xl,
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  featureCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
    gap: SPACING.xs,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '40',
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});