"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff, User, Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthLayout from "@/components/layout/auth-layout";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "provider">(
    searchParams?.get("type") === "provider" ? "provider" : "customer"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if user exists in localStorage (in real app, this would be API call)
      const storageKey = userType === "customer" ? "customerData" : "providerData";
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        const userData = JSON.parse(storedData);

        // Simple validation (in real app, this would be secure server-side validation)
        if (userData.email === formData.email) {
          // Store login session
          if (userType === "customer") {
            localStorage.setItem("customerLoggedIn", "true");
            localStorage.setItem("currentCustomer", JSON.stringify(userData));
            window.location.href = "/customer/dashboard";
          } else {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(userData));
            window.location.href = "/provider/dashboard";
          }
        } else {
          setError("Invalid email or password");
        }
      } else {
        setError("Account not found. Please register first.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your Haven account."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Label className="text-slate-700">I am a:</Label>
          <RadioGroup
            value={userType}
            onValueChange={(value) =>
              setUserType(value as "customer" | "provider")
            }
            className="flex gap-4"
          >
            <label
              htmlFor="customer"
              className={`flex-1 relative flex items-center justify-center gap-2 cursor-pointer rounded-xl border-2 p-3 transition-all ${
                userType === "customer" 
                  ? "border-blue-600 bg-blue-50/50 text-blue-700" 
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
              }`}
            >
              <RadioGroupItem value="customer" id="customer" className="sr-only" />
              <User className="h-4 w-4" />
              <span className="font-semibold text-sm">Customer</span>
            </label>

            <label
              htmlFor="provider"
              className={`flex-1 relative flex items-center justify-center gap-2 cursor-pointer rounded-xl border-2 p-3 transition-all ${
                userType === "provider" 
                  ? "border-blue-600 bg-blue-50/50 text-blue-700" 
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
              }`}
            >
              <RadioGroupItem value="provider" id="provider" className="sr-only" />
              <Briefcase className="h-4 w-4" />
              <span className="font-semibold text-sm">Provider</span>
            </label>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-blue-600 transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-blue-600 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                handleInputChange("rememberMe", checked as boolean)
              }
              className="rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label htmlFor="rememberMe" className="text-sm font-medium text-slate-600 cursor-pointer select-none">
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <p className="text-center text-slate-600 font-medium pt-2">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors"
          >
            Create one now
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
