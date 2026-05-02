'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  role?: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.role !== 'ADMIN') {
            throw new Error('Unauthorized access');
          }
          setUser(parsedUser);
          apiClient.setToken(storedToken);
        } catch (error) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Call the real login API
      const response = await apiClient.login({ email, password });

      if (response.role !== 'ADMIN') {
        throw new Error('Chỉ tài khoản ADMIN mới được phép đăng nhập');
      }

      // Store user and token
      const newUser: User = {
        id: response.user_id,
        email: response.email,
        role: response.role,
        fullName: response.full_name,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', response.token);
      
      // Set token in API client for subsequent requests
      apiClient.setToken(response.token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.register({ email, password, full_name: fullName });

      const newUser: User = {
        id: response.user_id,
        email: response.email,
        role: response.role,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', response.token);
      apiClient.setToken(response.token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    apiClient.clearToken();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
