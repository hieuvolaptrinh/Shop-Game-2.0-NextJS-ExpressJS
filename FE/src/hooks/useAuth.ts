'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type LoginPayload, type RegisterPayload } from '@/services/auth.service';
import type { User } from '@/types/index.type';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { setContextAccessToken } from '@/lib/fetch';

/**
 * Query keys
 */
export const AUTH_QUERY_KEYS = {
  currentUser: ['auth', 'current-user'] as const,
};

/**
 * Use Auth Hook
 */
export function useAuth() {
  const { user, accessToken, isAuthenticated, isLoading, setAuth, clearAuth, updateUser } =
    useAuthContext();
  const queryClient = useQueryClient();

  // Sync access token to fetch lib whenever it changes
  useEffect(() => {
    setContextAccessToken(accessToken);
  }, [accessToken]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    setAuth,
    clearAuth,
    updateUser,
  };
}

/**
 * Use current user query
 */
export function useCurrentUser() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Use login mutation
 */
export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      // Store user and access token in context
      setAuth(data.user, data.accessToken);

      // Set user in React Query cache
      queryClient.setQueryData<User>(AUTH_QUERY_KEYS.currentUser, data.user);

      // Redirect to dashboard
      router.push(ROUTES.DASHBOARD.HOME);
    },
  });
}

/**
 * Use register mutation
 */
export function useRegister() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      // Store user and access token in context
      setAuth(data.user, data.accessToken);

      // Set user in React Query cache
      queryClient.setQueryData<User>(AUTH_QUERY_KEYS.currentUser, data.user);

      // Redirect to dashboard
      router.push(ROUTES.DASHBOARD.HOME);
    },
  });
}

/**
 * Use logout mutation
 */
export function useLogout() {
  const router = useRouter();
  const { clearAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth context
      clearAuth();

      // Clear all queries
      queryClient.clear();

      // Redirect to login
      router.push(ROUTES.AUTH.LOGIN);
    },
    onError: () => {
      // Even if API call fails, clear local state
      clearAuth();
      queryClient.clear();
      router.push(ROUTES.AUTH.LOGIN);
    },
  });
}
