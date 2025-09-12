# 🔧 Frontend API Integration Guide

## 🎯 **Quick Integration Steps**

### **Step 1: Enable Real API**
```typescript
// config/env-config.ts
export const ENV_CONFIG = {
  API: {
    USE_REAL_API: true, // Change to true when backend is ready
  }
};
```

### **Step 2: Update API Base URL**
```typescript
// services/api/config/api-config.ts
export const API_CONFIG = {
  BASE_URLS: {
    DEVELOPMENT: 'http://localhost:3000/api/v1', // Your backend URL
    PRODUCTION: 'https://api.vakacoz.com/api/v1'
  }
};
```

### **Step 3: Replace Hooks in Components**

#### **Login Screen Migration:**
```typescript
// BEFORE (Mock)
import { useLoginForm } from './hooks/useLoginForm';

// AFTER (Real API)
import { useLoginForm } from './hooks/useLoginForm';
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
      router.push('/departments');
    }
  };
  
  return {
    // ... other form logic
    handleLogin,
    isLoading: apiLoading
  };
};
```

#### **Department Screen Migration:**
```typescript
// BEFORE (Mock)
import { useDepartmentData } from './hooks/useDepartmentData';

// AFTER (Real API)
import { useApiFaculty, useApiProgress } from '@/services/hooks/useApi';

export const useDepartmentData = (userFaculty: string) => {
  const { departments, getDepartments } = useApiFaculty();
  const { stats, getUserStats } = useApiProgress();
  
  React.useEffect(() => {
    getDepartments(userFaculty);
    getUserStats();
  }, [userFaculty]);
  
  return {
    departments,
    userProgress: stats,
    // ... other data
  };
};
```

## 🧪 **Testing API Integration**

### **Test Individual Services:**
```typescript
import { authService, caseService } from '@/services/api';

// Test auth
const testAuth = async () => {
  try {
    const result = await authService.login({
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Auth successful:', result);
  } catch (error) {
    console.log('❌ Auth failed:', error.message);
  }
};

// Test cases
const testCases = async () => {
  try {
    const cases = await caseService.getCases({ page: 1, limit: 10 });
    console.log('✅ Cases loaded:', cases.data.length);
  } catch (error) {
    console.log('❌ Cases failed:', error.message);
  }
};
```

### **Environment Testing:**
```typescript
// Test with different environments
import { API_CONFIG } from '@/services/api/config/api-config';

console.log('Current API URL:', API_CONFIG.BASE_URL);
console.log('Environment:', __DEV__ ? 'Development' : 'Production');
```

## 🚀 **Deployment Checklist**

### **Before Production:**
- [ ] Update production API URL
- [ ] Test all authentication flows
- [ ] Verify error handling
- [ ] Test offline scenarios
- [ ] Check token refresh logic
- [ ] Validate all form submissions
- [ ] Test image uploads
- [ ] Verify push notifications
- [ ] Test on different devices
- [ ] Performance testing

### **Production Environment:**
```typescript
// config/env-config.ts (Production)
export const ENV_CONFIG = {
  API: {
    USE_REAL_API: true,
    REAL: {
      ENABLE_REQUEST_LOGGING: false, // Disable in production
      ENABLE_RESPONSE_LOGGING: false,
      RETRY_ATTEMPTS: 3,
      RETRY_DELAY: 1000,
    }
  },
  UI: {
    SHOW_DEBUG_INFO: false, // Disable in production
    SHOW_API_STATUS: false,
  }
};
```

## 🔍 **Debugging Guide**

### **API Call Logging:**
```typescript
// Enable detailed logging
import { DevUtils } from '@/config/env-config';

// In any component
DevUtils.log('Testing API call', { userId: 'user_123' });
DevUtils.apiCall('POST', '/auth/login', { email: 'test@test.com' });
```

### **Token Debugging:**
```typescript
import { authService } from '@/services/api';

// Check token status
const debugTokens = async () => {
  const tokenInfo = await authService.getTokenInfo();
  console.log('Token Info:', tokenInfo);
};
```

### **Network Error Handling:**
```typescript
import { ErrorUtils } from '@/services/api';

// In error boundaries or catch blocks
try {
  await apiCall();
} catch (error) {
  if (ErrorUtils.isNetworkError(error)) {
    // Handle network errors
    console.log('Network issue detected');
  } else if (ErrorUtils.isAuthError(error)) {
    // Handle auth errors
    console.log('Authentication required');
  }
}
```

## 📱 **Mobile-Specific Considerations**

### **Token Storage:**
- Uses **SecureStore** on mobile devices
- Uses **AsyncStorage** on web
- Automatic platform detection

### **Network Handling:**
- Automatic retry for network failures
- Offline mode preparation
- Background app state handling

### **Performance:**
- Request/response compression
- Image optimization for uploads
- Caching strategy implementation

## 🔄 **Migration Phases**

### **Phase 1: Authentication**
1. Update login/register screens
2. Test token management
3. Verify logout flow

### **Phase 2: User Data**
1. Profile management
2. Preferences sync
3. Avatar upload

### **Phase 3: Core Features**
1. Cases loading
2. Department data
3. Progress tracking

### **Phase 4: Advanced Features**
1. AI services integration
2. Push notifications
3. Offline capabilities

### **Phase 5: Optimization**
1. Performance tuning
2. Error rate monitoring
3. User experience improvements

This guide ensures smooth API integration while maintaining app stability throughout the migration process.