"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import * as authApi from "@/apis/auth.api";
import { AuthContext, type AuthContextType } from "@/contexts/auth.context";
import type { Profile } from "@/apis/auth.api";
import {
  clearLocalTokens,
  saveTokensToLocal,
  hasLocalTokens,
} from "@/lib/auth.client";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  /** 🔹 FETCH PROFILE */
  const fetchUserProfile = useCallback(async (): Promise<Profile | null> => {
    try {
      const res = await authApi.profile();
      const profile = res?.data || null;
      setUser(profile);
      return profile;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  /** 🔹 INITIAL LOAD */
  useEffect(() => {
    (async () => {
      if (!hasLocalTokens()) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      await fetchUserProfile();
      setIsLoading(false);
    })();
  }, [fetchUserProfile]);

  /** 🔹 AUTO LOGOUT ON 401 */
  useEffect(() => {
    const handleUnauthorized = () => {
      console.warn("Session expired → logging out");
      clearLocalTokens();
      setUser(null);
      router.replace("/login");
    };
    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, [router]);

  /** 🔹 LOGIN */
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await authApi.login({ email, password });
        const tokens = res.data?.tokens;
        if (!tokens) throw new Error("No token received from server");

        saveTokensToLocal(tokens);
        const profile = await fetchUserProfile();
        if (!profile) throw new Error("Failed to fetch user profile");

        router.replace(profile.role === "ADMIN" ? "/admin" : "/");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchUserProfile, router]
  );

  /** 🔹 REGISTER */
  const register = useCallback(
    async (email: string, password: string): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await authApi.register({ email, password });
        if (res.data?.tokens) {
          saveTokensToLocal(res.data.tokens);
          await login(email, password);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  /** 🔹 LOGOUT */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      clearLocalTokens();
      setUser(null);
      router.replace("/login");
      setIsLoading(false);
    }
  }, [router]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refetchUser: fetchUserProfile,
    }),
    [user, isLoading, login, register, logout, fetchUserProfile]
  );

  const isAuthPage =
    pathname.endsWith("/login") || pathname.endsWith("/register");
  const showInitialLoading = isLoading && !user && !isAuthPage;

  if (showInitialLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Waiting...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
