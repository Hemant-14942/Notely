"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, getSession, type AuthSession } from "@/lib/auth";

export const useAuthSession = () => {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const storedSession = getSession();

    if (!storedSession) {
      router.push("/login");
      return;
    }

    queueMicrotask(() => {
      setSession(storedSession);
      setIsCheckingSession(false);
    });
  }, [router]);

  const logout = () => {
    clearSession();
    router.push("/");
  };

  return { session, isCheckingSession, logout };
};
