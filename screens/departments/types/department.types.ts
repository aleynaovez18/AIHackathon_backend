import { Department } from '@/constants/faculty-system';
import { CaseStats } from '@/utils/case-calculator';
import { UserProgress } from '@/utils/progress-manager';

export interface DepartmentScreenProps {
  userFaculty?: string;
}

export interface DepartmentData {
  departments: Department[];
  departmentStats: Record<string, CaseStats>;
  welcomeData: any;
  userProgress: UserProgress;
}

export interface QuickAction {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  route: string;
}

export interface ActivityData {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}