"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { getStoredRole, isLoggedIn, getAccessToken } from "@/lib/api";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = "/provider/login" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    const role = getStoredRole();
    const stored = typeof window !== "undefined" ? localStorage.getItem("haven_provider_profile") : null;

    if (loggedIn && role === "PROVIDER" && stored) {
      setIsAuthenticated(true);
    } else {
      window.location.href = redirectTo;
    }
    setIsLoading(false);
  }, [redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
