'use client';

import { type ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/types/index.type';
import { storage } from '@/utils/storage';
import { APP_CONFIG } from '@/constants/config';

/**
 * Auth Context Value
 */
interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
}

/**
 * Auth Context
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    try {
      const storedUser = storage.get<User>(APP_CONFIG.STORAGE_KEYS.USER);
      const storedToken = storage.get<string>(APP_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);

      if (storedUser && storedToken) {
        setUser(storedUser);
        setAccessToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Set authentication data
   */
  const setAuth = useCallback((newUser: User, newAccessToken: string) => {
    setUser(newUser);
    setAccessToken(newAccessToken);

    // Persist user data to localStorage for hydration
    storage.set(APP_CONFIG.STORAGE_KEYS.USER, newUser);
    // Temporarily store access token for server-side validation
    storage.set(APP_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
  }, []);

  /**
   * Clear authentication data
   */
  const clearAuth = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    storage.remove(APP_CONFIG.STORAGE_KEYS.USER);
    storage.remove(APP_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  /**
   * Update user data
   */
  const updateUser = useCallback((newUser: User) => {
    setUser(newUser);
    storage.set(APP_CONFIG.STORAGE_KEYS.USER, newUser);
  }, []);

  const value: AuthContextValue = {
    user,
    accessToken,
    isAuthenticated: !!accessToken,
    isLoading,
    setAuth,
    clearAuth,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Use Auth Hook
 * Access auth context in components
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
