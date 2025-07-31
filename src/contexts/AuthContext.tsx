import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService, LoginRequest, SignupRequest, LoginResponse, SignupResponse } from '../config/api';
import CustomPopup from '../components/CustomPopup';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  signup: (credentials: SignupRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupConfig, setPopupConfig] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    type: 'error',
    title: '',
    message: '',
  });

  const showPopup = (type: 'success' | 'error', title: string, message: string) => {
    console.log('Showing popup:', { type, title, message });
    setPopupConfig({ type, title, message });
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await apiService.login(credentials);
      
      if (response.status && response.token && response.user) {
        await AsyncStorage.setItem('auth_token', response.token);
        await AsyncStorage.setItem('user_data', JSON.stringify(response.user));
        
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      } else {
        showPopup('error', 'Login Failed', response.message);
        throw new Error(response.message);
      }
    } catch (error: any) {
      showPopup('error', 'Login Failed', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupRequest): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await apiService.signup(credentials);
      
      if (response.status && response.token && response.user) {
        await AsyncStorage.setItem('auth_token', response.token);
        await AsyncStorage.setItem('user_data', JSON.stringify(response.user));
        
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <CustomPopup
        visible={popupVisible}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
        buttonText="OK"
        onClose={handlePopupClose}
      />
    </AuthContext.Provider>
  );
};