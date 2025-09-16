import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';
import { UserProfile } from '../types/profile.types';

interface ProfileCardProps {
  user: UserProfile;
  onEditAvatar: () => void;
  onUpdateName: (newName: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEditAvatar, onUpdateName }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [profileImage, setProfileImage] = useState<string | null>(user.avatar || null);

  const handleImagePicker = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('İzin Gerekli', 'Fotoğraf seçmek için galeri erişim izni gerekiyor.');
        return;
      }

      // Show options
      Alert.alert(
        'Profil Fotoğrafı',
        'Nasıl bir fotoğraf eklemek istiyorsunuz?',
        [
          { text: 'Kameradan Çek', onPress: () => openCamera() },
          { text: 'Galeriden Seç', onPress: () => openGallery() },
          { text: 'İptal', style: 'cancel' }
        ]
      );
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf yüklenirken bir hata oluştu.');
    }
  };

  const openCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.granted === false) {
      Alert.alert('İzin Gerekli', 'Fotoğraf çekmek için kamera erişim izni gerekiyor.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      onEditAvatar();
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      onEditAvatar();
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setTempName(user.name);
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleNameCancel = () => {
    setTempName(user.name);
    setIsEditingName(false);
  };

  return (
  <View style={styles.profileCard}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatarBackground}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <MaterialCommunityIcons name="account" size={48} color={COLORS.primary} />
        )}
      </View>
      <Pressable style={styles.editAvatarButton} onPress={handleImagePicker}>
        <MaterialCommunityIcons name="camera" size={16} color={COLORS.cardBackground} />
      </Pressable>
    </View>

    <View style={styles.profileInfo}>
      <View style={styles.nameContainer}>
        {isEditingName ? (
          <View style={styles.nameEditContainer}>
            <TextInput
              style={styles.nameInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Ad Soyad"
              autoFocus
              onBlur={handleNameCancel}
            />
            <View style={styles.nameEditButtons}>
              <Pressable style={styles.nameEditButton} onPress={handleNameSave}>
                <MaterialCommunityIcons name="check" size={16} color={COLORS.success} />
              </Pressable>
              <Pressable style={styles.nameEditButton} onPress={handleNameCancel}>
                <MaterialCommunityIcons name="close" size={16} color={COLORS.error} />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.nameDisplayContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Pressable style={styles.editNameButton} onPress={handleNameEdit}>
              <MaterialCommunityIcons name="pencil" size={16} color={COLORS.textMuted} />
            </Pressable>
          </View>
        )}
      </View>
      <Text style={styles.profileTitle}>{user.title}</Text>
      <Text style={styles.profileUniversity}>{user.university}</Text>
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.casesCompleted}</Text>
        <Text style={styles.statLabel}>Çözülen Vaka</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.badges}</Text>
        <Text style={styles.statLabel}>Rozet</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.successRate}%</Text>
        <Text style={styles.statLabel}>Başarı Oranı</Text>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xlarge,
    padding: SPACING.xxl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.large,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.xl,
  },
  avatarBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.cardBackground,
    ...SHADOWS.medium,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  profileName: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profileTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginBottom: SPACING.xs,
  },
  profileUniversity: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  nameContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  nameDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  editNameButton: {
    padding: SPACING.xs,
  },
  nameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    width: '100%',
  },
  nameInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    paddingVertical: SPACING.xs,
  },
  nameEditButtons: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  nameEditButton: {
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
    backgroundColor: COLORS.cardBackground,
    ...SHADOWS.small,
  },
});