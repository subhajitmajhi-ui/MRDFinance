import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT } from '@env';

// API Response Types
export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: any;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    phone: string;
    email: string;
    email_verified_at: string | null;
    api_token: string;
    created_at: string;
    updated_at: string;
  };
}

export interface SignupResponse {
  status: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    api_token: string;
    created_at: string;
    updated_at: string;
  };
}

// API Configuration
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: parseInt(API_TIMEOUT || '30000'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('user_data');
          // You can add navigation to login screen here
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.request(config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      // Server responded with error status
      return {
        status: false,
        message: error.response.data?.message || 'Server error occurred',
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        status: false,
        message: 'Network error. Please check your connection.',
        statusCode: 0,
      };
    } else {
      // Other error
      return {
        status: false,
        message: error.message || 'An unexpected error occurred',
        statusCode: 0,
      };
    }
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>({
      method: 'POST',
      url: '/login',
      data: credentials,
    });
  }

  async signup(credentials: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    return this.request<SignupResponse>({
      method: 'POST',
      url: '/register',
      data: credentials,
    });
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
  }

  // User methods
  async getProfile(): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/profile',
    });
  }

  // Add more API methods as needed
}

export const apiService = new ApiService();
export default apiService;