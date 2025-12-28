"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import * as api from "@/lib/api";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const currentUser = await api.getCurrentUser();
        if (currentUser) {
          login(currentUser, "existing_token");
        }
      } catch {
        // Not authenticated
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [login, setLoading]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await api.signIn(email, password);
        login(result.user, result.token);
        router.push("/intelligence");
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Sign in failed",
        };
      }
    },
    [login, router]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        const result = await api.createAccount({ email, password, name });
        login(result.user, "new_token");
        router.push("/identity/philosophy");
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Sign up failed",
        };
      }
    },
    [login, router]
  );

  const signOut = useCallback(async () => {
    await api.signOut();
    logout();
    router.push("/");
  }, [logout, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
}
