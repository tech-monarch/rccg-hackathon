"use client";

import { useState, useEffect } from "react";

interface UserData {
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
  portfolioImages: number;
  registrationDate: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const currentUser = localStorage.getItem("currentUser");

      if (isLoggedIn && currentUser) {
        const user = JSON.parse(currentUser);
        setUserData(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedData = localStorage.getItem("providerData");

        if (storedData) {
          const userData = JSON.parse(storedData);

          if (userData.email === email) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(userData));
            setUserData(userData);
            setIsAuthenticated(true);
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }, 1500);
    });
  };

  const register = (
    formData: any,
    portfolioImages: File[]
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          ...formData,
          portfolioImages: portfolioImages.length,
          registrationDate: new Date().toISOString(),
        };

        localStorage.setItem("providerData", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(userData));

        setUserData(userData);
        setIsAuthenticated(true);
        resolve(true);
      }, 2000);
    });
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("providerData");
    setUserData(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    userData,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus,
  };
}
