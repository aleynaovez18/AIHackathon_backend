import { useCallback, useState } from 'react';

interface LoginFormData {
  username: string;
  password: string;
}

interface ValidationErrors {
  username?: string;
  password?: string;
}

interface LoginFormHook {
  formData: LoginFormData;
  errors: ValidationErrors;
  isPasswordVisible: boolean;
  isValid: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  togglePasswordVisibility: () => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

const useLoginForm = (): LoginFormHook => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const setUsername = useCallback((username: string) => {
    setFormData(prev => ({ ...prev, username }));
    // Clear username error when user starts typing
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  }, [errors.username]);

  const setPassword = useCallback((password: string) => {
    setFormData(prev => ({ ...prev, password }));
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  }, [errors.password]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı gereklidir';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({ username: '', password: '' });
    setErrors({});
    setIsPasswordVisible(false);
  }, []);

  const isValid = formData.username.trim().length >= 3 && formData.password.length >= 6;

  return {
    formData,
    errors,
    isPasswordVisible,
    isValid,
    setUsername,
    setPassword,
    togglePasswordVisibility,
    validateForm,
    resetForm,
  };
};

export default useLoginForm;