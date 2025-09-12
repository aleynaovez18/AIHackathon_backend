import React from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/design-system';
import { ProfileMenuItem, UserProfile } from '../types/profile.types';

export const useProfileData = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Mock user data - in real app this would come from a user context/state
  const user: UserProfile = {
    id: '1',
    name: 'Furkan Demir',
    title: 'Eczacılık Fakültesi - 3. Sınıf',
    university: 'İstanbul Üniversitesi',
    stats: {
      casesCompleted: 47,
      badges: 8,
      successRate: 92
    }
  };

  const menuItems: ProfileMenuItem[] = [
    {
      id: 'personal-info',
      title: 'Kişisel Bilgiler',
      subtitle: 'Ad, soyad, e-posta düzenle',
      icon: 'account-edit',
      color: COLORS.primary,
      onPress: () => {},
    },
    {
      id: 'academic-info',
      title: 'Akademik Bilgiler',
      subtitle: 'Üniversite, bölüm bilgileri',
      icon: 'school',
      color: COLORS.accent,
      onPress: () => {},
    },
    {
      id: 'achievements',
      title: 'Başarılarım',
      subtitle: 'Çözülen vakalar ve rozetler',
      icon: 'trophy',
      color: COLORS.warning,
      badge: user.stats.badges.toString(),
      onPress: () => {},
    },
    {
      id: 'statistics',
      title: 'İstatistikler',
      subtitle: 'Detaylı performans analizi',
      icon: 'chart-line',
      color: COLORS.success,
      onPress: () => {},
    },
    {
      id: 'preferences',
      title: 'Tercihler',
      subtitle: 'Bildirimler, tema ayarları',
      icon: 'cog',
      color: COLORS.textMuted,
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Yardım & Destek',
      subtitle: 'SSS, iletişim',
      icon: 'help-circle',
      color: COLORS.textLight,
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    router.replace('/login');
  };

  const handleEditAvatar = () => {
    // Implementation for avatar editing
  };

  return {
    user,
    menuItems,
    isLoading,
    handleLogout,
    handleEditAvatar
  };
};