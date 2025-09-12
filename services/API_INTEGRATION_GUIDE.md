/**
 * API Integration Guide
 * How to integrate the new API infrastructure with existing components
 */

/* ================================
   STEP 1: Update Login Form Hook
   ================================ */

// BEFORE (current mock implementation):
// File: screens/auth/hooks/useLoginForm.ts

const handleLogin = async () => {
  if (!validateForm()) return;
  
  setIsLoading(true);
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    Alert.alert('Giriş', 'Giriş başarılı!');
    router.push('/user-onboarding');
  } catch (error) {
    Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
  } finally {
    setIsLoading(false);
  }
};

// AFTER (with real API):
import { useApiAuth } from '@/services/hooks/useApi';

export const useLoginForm = () => {
  const { login: apiLogin, isLoading: apiLoading } = useApiAuth();
  
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    const success = await apiLogin({
      email: formData.email,
      password: formData.password
    });
    
    if (success) {
      router.push('/departments'); // Skip onboarding if user exists
    }
  };
  
  // Use apiLoading instead of local loading state
  const isLoading = apiLoading;
};

/* ================================
   STEP 2: Update Onboarding Hook
   ================================ */

// BEFORE (current implementation):
// File: screens/onboarding/OnboardingScreen.tsx

const handleComplete = () => {
  Alert.alert(
    'Hoş geldin!',
    `Merhaba ${formData.firstName}! Profilen başarıyla oluşturuldu.`,
    [{ text: 'Başla', onPress: () => router.replace('/departments') }]
  );
};

// AFTER (with real API):
import { useApiAuth } from '@/services/hooks/useApi';

export default function OnboardingScreen() {
  const { register, isLoading } = useApiAuth();
  
  const handleComplete = async () => {
    const success = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: 'user@email.com', // Get from login
      password: 'temp', // Handle this appropriately
      university: formData.university,
      faculty: formData.faculty
    });
    
    if (success) {
      Alert.alert(
        'Hoş geldin!',
        `Merhaba ${formData.firstName}! Profilen başarıyla oluşturuldu.`,
        [{ text: 'Başla', onPress: () => router.replace('/departments') }]
      );
    }
  };
}

/* ================================
   STEP 3: Update Department Data Hook
   ================================ */

// BEFORE (current mock implementation):
// File: screens/departments/hooks/useDepartmentData.ts

export const useDepartmentData = (userFaculty: string) => {
  const [departments, setDepartments] = React.useState<Department[]>([]);
  
  React.useEffect(() => {
    const facultyDepartments = getUserDepartments(userFaculty);
    setDepartments(facultyDepartments);
  }, [userFaculty]);
};

// AFTER (with real API):
import { useApiFaculty, useApiProgress } from '@/services/hooks/useApi';

export const useDepartmentData = (userFaculty: string) => {
  const { departments, getDepartments, isLoading: deptLoading } = useApiFaculty();
  const { stats, getUserStats, isLoading: statsLoading } = useApiProgress();
  
  React.useEffect(() => {
    getDepartments(userFaculty);
    getUserStats();
  }, [userFaculty]);
  
  return {
    departments,
    userProgress: stats,
    isLoading: deptLoading || statsLoading
  };
};

/* ================================
   STEP 4: Update Case Screens
   ================================ */

// BEFORE (current mock implementation):
// File: screens/case/hooks/useCaseData.ts

export const useCaseData = (caseId: string) => {
  const [caseData, setCaseData] = React.useState(null);
  
  React.useEffect(() => {
    const mockCase = getMockCaseData(caseId);
    setCaseData(mockCase);
  }, [caseId]);
};

// AFTER (with real API):
import { useApiCases } from '@/services/hooks/useApi';

export const useCaseData = (caseId: string) => {
  const { getCaseById, submitDiagnosis, isLoading } = useApiCases();
  const [caseData, setCaseData] = React.useState(null);
  
  React.useEffect(() => {
    loadCase();
  }, [caseId]);
  
  const loadCase = async () => {
    const case_ = await getCaseById(caseId);
    setCaseData(case_);
  };
  
  const handleDiagnosisSubmit = async (diagnosis: string, reasoning: string, aiHintUsed: boolean) => {
    return await submitDiagnosis({
      caseId,
      selectedDiagnosis: diagnosis,
      reasoning,
      aiHintUsed
    });
  };
  
  return {
    caseData,
    isLoading,
    submitDiagnosis: handleDiagnosisSubmit
  };
};

/* ================================
   STEP 5: Gradual Migration Strategy
   ================================ */

// You can migrate gradually by creating wrapper functions:

// File: services/migration-helper.ts
import { API_CONFIG } from '@/services/api';

export const USE_REAL_API = false; // Toggle this to switch

export const authHelper = {
  async login(credentials: any) {
    if (USE_REAL_API) {
      return await authService.login(credentials);
    } else {
      // Current mock implementation
      return mockLogin(credentials);
    }
  }
};

/* ================================
   STEP 6: Environment Configuration
   ================================ */

// File: services/api/config/api-config.ts
// Update the BASE_URL getter:

get BASE_URL() {
  if (__DEV__) {
    // During development, you can easily switch between mock and real API
    const USE_MOCK_API = true; // Set to false when backend is ready
    return USE_MOCK_API 
      ? 'http://localhost:3001/mock-api/v1' // Mock server
      : this.BASE_URLS.DEVELOPMENT; // Real API
  }
  return this.BASE_URLS.PRODUCTION;
}

/* ================================
   STEP 7: Testing the Integration
   ================================ */

// You can test API calls immediately:

import { authService, caseService } from '@/services/api';

// Test authentication
const testAuth = async () => {
  try {
    const result = await authService.login({
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Auth successful:', result);
  } catch (error) {
    console.log('Auth failed (expected if no backend):', error);
  }
};

// Test case fetching
const testCases = async () => {
  try {
    const cases = await caseService.getCases({ page: 1, limit: 10 });
    console.log('Cases loaded:', cases);
  } catch (error) {
    console.log('Cases failed (expected if no backend):', error);
  }
};

/* ================================
   BENEFITS OF THIS APPROACH
   ================================ */

/*
1. **Non-Breaking**: Current app continues working
2. **Gradual**: Migrate one screen at a time
3. **Testable**: Can test API calls immediately
4. **Flexible**: Easy to switch between mock and real data
5. **Type-Safe**: Full TypeScript support
6. **Error Handling**: Comprehensive error management
7. **Secure**: Token management and refresh logic
8. **Scalable**: Follows SOLID principles
9. **Clean**: Separates concerns properly
10. **Maintainable**: Easy to update and extend
*/