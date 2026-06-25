"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { getStoredRole, isLoggedIn } from "@/lib/api";

interface AdminAuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AdminAuthGuard({ children, redirectTo = "/auth/login" }: AdminAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = isLoggedIn() || (typeof window !== "undefined" && !!localStorage.getItem("haven_admin_profile"));
    const role = getStoredRole();

    if (loggedIn && role === "ADMIN") {
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
          <p>Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
