import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Furkan Demir',
    email: 'furkan.demir@istanbulu.edu.tr',
    birthDate: '15.03.2000'
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Başarılı', 'Kişisel bilgileriniz güncellendi.');
  };

  const InfoItem = ({ label, value, field, editable = true }: any) => (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => setPersonalInfo({ ...personalInfo, [field]: text })}
          placeholder={label}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
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
          <Text style={styles.headerTitle}>Kişisel Bilgiler</Text>
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
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="account-edit" size={24} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Kişisel Bilgilerim</Text>
          </View>

          <InfoItem label="Ad Soyad" value={personalInfo.name} field="name" />
          <InfoItem label="E-posta" value={personalInfo.email} field="email" />
          <InfoItem label="Doğum Tarihi" value={personalInfo.birthDate} field="birthDate" />
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
  label: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  value: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  input: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.small,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
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