import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { FacultySelector } from '@/components/shared/FacultySelector';

export default function AcademicInfoScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [academicInfo, setAcademicInfo] = useState({
    university: 'İstanbul Üniversitesi',
    faculty: 'Eczacılık Fakültesi',
    department: 'Eczacılık',
    year: '3. Sınıf'
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Başarılı', 'Akademik bilgileriniz güncellendi.');
  };

  const InfoItem = ({ label, value, icon }: any) => (
    <View style={styles.infoItem}>
      <View style={styles.infoHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={COLORS.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.headerShadow}>
        <View style={styles.headerContainer}>
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            style={styles.headerIconButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Akademik Bilgiler</Text>
          <Pressable 
            accessibilityRole="button" 
            hitSlop={8} 
            style={styles.headerIconButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <MaterialCommunityIcons 
              name={isEditing ? "check" : "pencil"} 
              size={24} 
              color={COLORS.primary} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* University Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="school" size={24} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Eğitim Bilgileri</Text>
          </View>

          <InfoItem 
            label="Üniversite" 
            value={academicInfo.university} 
            icon="domain" 
          />
          <InfoItem 
            label="Fakülte" 
            value={academicInfo.faculty} 
            icon="library" 
          />
          <InfoItem 
            label="Bölüm" 
            value={academicInfo.department} 
            icon="book-open-variant" 
          />
          <InfoItem 
            label="Sınıf" 
            value={academicInfo.year} 
            icon="calendar-account" 
          />
        </View>

        {/* Academic Stats Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="trophy" size={24} color={COLORS.warning} />
            <Text style={styles.cardTitle}>Akademik İstatistikler</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="book-check" size={24} color={COLORS.success} />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Tamamlanan Ders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock" size={24} color={COLORS.warning} />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Devam Eden Ders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="medal" size={24} color={COLORS.primary} />
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Onur Listesi</Text>
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>İptal</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerShadow: {
    ...SHADOWS.small,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
  },
  headerIconButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  infoItem: {
    marginBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border + '30',
    paddingBottom: SPACING.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  value: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginLeft: SPACING.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.cardBackground,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
});