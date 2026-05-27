"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"customer" | "provider">(
    searchParams.get("type") === "provider" ? "provider" : "customer"
  );

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
                Already have an account?
              </span>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Join UniHub and get started</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Choose Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>I want to register as a:</Label>
                  <RadioGroup
                    value={userType}
                    onValueChange={(value) =>
                      setUserType(value as "customer" | "provider")
                    }
                    className="flex flex-col space-y-4"
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value="customer"
                        id="customer"
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor="customer"
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <User className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Customer</span>
                        </Label>
                        <p className="text-sm text-muted-foreground ml-7 mt-1">
                          Find and hire service professionals for your needs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value="provider"
                        id="provider"
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor="provider"
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Service provider</span>
                        </Label>
                        <p className="text-sm text-muted-foreground ml-7 mt-1">
                          Offer your services and connect with customers
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-4">
                  <Link
                    href={
                      userType === "customer"
                        ? "/customer/register"
                        : "/provider/register"
                    }
                  >
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Continue
                    </Button>
                  </Link>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:underline"
                  >
                    Sign in here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
