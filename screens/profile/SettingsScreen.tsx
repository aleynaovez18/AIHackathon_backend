import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '@/constants/design-system';

type Language = 'tr' | 'en';
type Theme = 'light' | 'dark' | 'blue';

export default function SettingsScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('tr');
  const [theme, setTheme] = useState<Theme>('light');
  const [notifications, setNotifications] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Kişiselleştirme */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kişiselleştirme</Text>
          
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dil</Text>
              <View style={styles.languageSelector}>
                <Pressable 
                  style={[styles.languageBtn, language === 'tr' && styles.languageBtnActive]}
                  onPress={() => setLanguage('tr')}
                >
                  <Text style={[styles.languageText, language === 'tr' && styles.languageTextActive]}>
                    TR
                  </Text>
                </Pressable>
                <Pressable 
                  style={[styles.languageBtn, language === 'en' && styles.languageBtnActive]}
                  onPress={() => setLanguage('en')}
                >
                  <Text style={[styles.languageText, language === 'en' && styles.languageTextActive]}>
                    EN
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Bildirimler</Text>
              <Pressable 
                style={[styles.toggle, notifications && styles.toggleActive]}
                onPress={() => setNotifications(!notifications)}
              >
                <View style={[styles.toggleThumb, notifications && styles.toggleThumbActive]} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Diğer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diğer</Text>
          
          <View style={styles.card}>
            <Pressable style={styles.settingRow}>
              <Text style={styles.settingLabel}>Gizlilik Politikası</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textMuted} />
            </Pressable>
            
            <Pressable style={styles.settingRow}>
              <Text style={styles.settingLabel}>Kullanım Koşulları</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textMuted} />
            </Pressable>
            
            <Pressable style={styles.settingRow}>
              <Text style={styles.settingLabel}>Hakkımızda</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textMuted} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    ...SHADOWS.small,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLabel: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  languageSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 2,
  },
  languageBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 6,
  },
  languageBtnActive: {
    backgroundColor: COLORS.primary,
  },
  languageText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  languageTextActive: {
    color: COLORS.cardBackground,
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: COLORS.border,
    borderRadius: 15,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 13,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
});