export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface LoginState {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isPasswordVisible: boolean;
  isValid: boolean;
  isLoading: boolean;
}

export interface WelcomeData {
  title: string;
  subtitle: string;
  features: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
}