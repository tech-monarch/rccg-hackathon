"use client";

import { useState, useEffect } from "react";
import { authApi, saveSession, clearTokens, getStoredRole, isLoggedIn as checkLoggedIn, setAccessToken } from "@/lib/api";

interface ProviderData {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  description: string;
  experience: string;
  website: string;
  services: string;
  portfolioImages: any[];
  isVerified: boolean;
  avgRating: number;
  totalReviews: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<ProviderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const role = getStoredRole();
      const loggedIn = checkLoggedIn();
      if (loggedIn && role === "PROVIDER") {
        const stored = localStorage.getItem("haven_provider_profile");
        if (stored) {
          setUserData(JSON.parse(stored));
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await authApi.login(email, password);
    if (res.success && res.data?.role === "PROVIDER") {
      saveSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        role: res.data.role,
        profileId: res.data.profile?.id,
        userId: res.data.user.id,
      });
      const profile = res.data.profile;
      localStorage.setItem("haven_provider_profile", JSON.stringify(profile));
      setUserData(profile);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = async (formData: any, portfolioImages: File[]): Promise<boolean> => {
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== undefined && v !== null && k !== "confirmPassword" && k !== "agreeToTerms") {
        fd.append(k, String(v));
      }
    });
    portfolioImages.forEach((f) => fd.append("portfolioImages", f));

    const res = await authApi.registerProvider(fd);
    if (res.success) {
      saveSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        role: res.data.user.role,
        profileId: res.data.provider?.id,
        userId: res.data.user.id,
      });
      const profile = res.data.provider;
      localStorage.setItem("haven_provider_profile", JSON.stringify(profile));
      setUserData(profile);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("haven_provider_profile");
    setUserData(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, userData, isLoading, login, register, logout, checkAuthStatus };
}
