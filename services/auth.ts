interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
  error?: string;
}

class AuthService {
  private static instance: AuthService;
  private baseUrl: string = 'https://api.vakacoz.com';

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          token: data.token,
          user: data.user,
        };
      } else {
        return {
          success: false,
          error: data.message || 'Giriş başarısız',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Bağlantı hatası. Lütfen tekrar deneyin.',
      };
    }
  }

  async googleLogin(): Promise<AuthResponse> {
    try {
      // TODO: Implement Google authentication
      return {
        success: false,
        error: 'Google girişi henüz implementeed değil',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Google giriş hatası',
      };
    }
  }
}

export default AuthService;
export type { AuthResponse, LoginCredentials };
