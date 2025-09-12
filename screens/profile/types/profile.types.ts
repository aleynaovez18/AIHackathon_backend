export interface ProfileMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  badge?: string;
  onPress: () => void;
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  university: string;
  avatar?: string;
  stats: {
    casesCompleted: number;
    badges: number;
    successRate: number;
  };
}

export interface ProfileState {
  user: UserProfile;
  menuItems: ProfileMenuItem[];
  isLoading: boolean;
}