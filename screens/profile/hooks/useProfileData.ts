import React from 'react';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/design-system';
import { ProfileMenuItem, UserProfile } from '../types/profile.types';

export const useProfileData = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<UserProfile>({
    id: '1',
    name: 'Furkan Demir',
    title: 'Eczacılık Fakültesi - 3. Sınıf',
    university: 'İstanbul Üniversitesi',
    stats: {
      casesCompleted: 47,
      badges: 8,
      successRate: 92
    }
  });

  const menuItems: ProfileMenuItem[] = [
    {
      id: 'personal-info',
      title: 'Kişisel Bilgiler',
      subtitle: 'Ad, soyad, e-posta düzenle',
      icon: 'account-edit',
      color: COLORS.primary,
      onPress: () => router.push('/personal-info' as any),
    },
    {
      id: 'academic-info',
      title: 'Akademik Bilgiler',
      subtitle: 'Üniversite, bölüm bilgileri',
      icon: 'school',
      color: COLORS.accent,
      onPress: () => router.push('/academic-info' as any),
    },
    {
      id: 'achievements',
      title: 'Başarılarım',
      subtitle: 'Çözülen vakalar ve rozetler',
      icon: 'trophy',
      color: COLORS.warning,
      badge: user.stats.badges.toString(),
      onPress: () => router.push('/achievements' as any),
    },
    {
      id: 'statistics',
      title: 'İstatistikler',
      subtitle: 'Detaylı performans analizi',
      icon: 'chart-line',
      color: COLORS.success,
      onPress: () => router.push('/statistics' as any),
    },
    {
      id: 'preferences',
      title: 'Ayarlar',
      subtitle: 'Bildirimler, tema ayarları',
      icon: 'cog',
      color: COLORS.textMuted,
      onPress: () => router.push('/settings' as any),
    },
    {
      id: 'help',
      title: 'Yardım & Destek',
      subtitle: 'SSS, iletişim',
      icon: 'help-circle',
      color: COLORS.textLight,
      onPress: () => router.push('/help-support' as any),
    },
  ];

  const handleLogout = () => {
    router.replace('/login');
  };

  const handleEditAvatar = () => {
    // Implementation for avatar editing - would typically upload to server
    console.log('Avatar updated');
  };

  const handleUpdateName = (newName: string) => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName
    }));
    // In real app, this would also update the backend
    console.log('Name updated to:', newName);
  };

  return {
    user,
    menuItems,
    isLoading,
    handleLogout,
    handleEditAvatar,
    handleUpdateName
  };
};