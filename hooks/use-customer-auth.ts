"use client";

import { useState, useEffect } from "react";
import { authApi, saveSession, clearTokens, getStoredRole, isLoggedIn as checkLoggedIn } from "@/lib/api";

interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  totalPoints: number;
  address?: string;
  createdAt?: string;
}

export function useCustomerAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const role = getStoredRole();
      const loggedIn = checkLoggedIn();
      if (loggedIn && role === "CUSTOMER") {
        const stored = localStorage.getItem("haven_customer_profile");
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
    if (res.success && res.data?.role === "CUSTOMER") {
      saveSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        role: res.data.role,
        profileId: res.data.profile?.id,
        userId: res.data.user.id,
      });
      const profile = res.data.profile;
      localStorage.setItem("haven_customer_profile", JSON.stringify(profile));
      setUserData(profile);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = async (formData: any): Promise<boolean> => {
    const res = await authApi.registerCustomer({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    if (res.success) {
      saveSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        role: res.data.user.role,
        profileId: res.data.customer?.id,
        userId: res.data.user.id,
      });
      const profile = res.data.customer;
      localStorage.setItem("haven_customer_profile", JSON.stringify(profile));
      setUserData(profile);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("haven_customer_profile");
    setUserData(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, userData, isLoading, login, register, logout, checkAuthStatus };
}
