"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "provider">(
    searchParams.get("type") === "provider" ? "provider" : "customer"
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
      const storageKey =
        userType === "customer" ? "customerData" : "providerData";
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

          alert("Login successful! Welcome back!");
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="text-xl font-bold text-blue-600">UniHub</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                New to UniHub?
              </span>
              <Link href="/auth/register">
                <Button variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Sign In</h1>
            <p className="text-muted-foreground">
              Access your account and get started
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In to Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <Label>I am a:</Label>
                  <RadioGroup
                    value={userType}
                    onValueChange={(value) =>
                      setUserType(value as "customer" | "provider")
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label
                        htmlFor="customer"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="h-4 w-4" />
                        <span>Customer</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="provider" id="provider" />
                      <Label
                        htmlFor="provider"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Service provider</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
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
                    />
                    <label htmlFor="rememberMe" className="text-sm">
                      Remember me
                    </label>
                  </div>
                  <Link
                    href={
                      userType === "customer"
                        ? "/customer/forgot-password"
                        : "/provider/forgot-password"
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 hover:underline"
                  >
                    Create an account
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
