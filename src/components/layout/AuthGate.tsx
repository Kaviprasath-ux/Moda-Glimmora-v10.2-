"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, login, setLoading } = useAuthStore();

  useEffect(() => {
    // On hard refresh, nothing else may mount `useAuth()` to finish the session check.
    // Bootstrap it here so platform pages never hang on "Preparing your session...".
    const bootstrap = async () => {
      if (!isLoading) return;
      try {
        const currentUser = await api.getCurrentUser();
        if (currentUser) {
          login(currentUser, "existing_token");
          return;
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    void bootstrap();
  }, [isLoading, login, setLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return <LoadingIntelligence message="Preparing your session..." />;
  }

  if (!isAuthenticated) {
    // Redirect will happen in effect; keep UI quiet.
    return null;
  }

  return <>{children}</>;
}


