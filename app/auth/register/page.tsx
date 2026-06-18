"use client";

import { useState } from "react";
import { User, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthLayout from "@/components/layout/auth-layout";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"customer" | "provider">(
    searchParams?.get("type") === "provider" ? "provider" : "customer",
  );

  return (
    <AuthLayout 
      title="Create Your Account" 
      subtitle="Join Haven and get started today."
    >
      <div className="space-y-8">
        <RadioGroup
          value={userType}
          onValueChange={(value) =>
            setUserType(value as "customer" | "provider")
          }
          className="grid gap-4"
        >
          <label
            htmlFor="customer"
            className={`relative flex cursor-pointer rounded-2xl border-2 p-5 shadow-sm transition-all hover:shadow-md ${
              userType === "customer" 
                ? "border-blue-600 bg-blue-50/50" 
                : "border-slate-200 bg-white hover:border-blue-200"
            }`}
          >
            <RadioGroupItem value="customer" id="customer" className="sr-only" />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  userType === "customer" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  <User className="h-6 w-6" />
                </div>
                <div className="grid gap-1">
                  <p className={`font-bold text-lg leading-none ${userType === "customer" ? "text-blue-900" : "text-slate-900"}`}>
                    Customer
                  </p>
                  <p className="text-sm text-slate-500">
                    Find and hire trusted service professionals
                  </p>
                </div>
              </div>
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                userType === "customer" ? "border-blue-600" : "border-slate-300"
              }`}>
                {userType === "customer" && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
              </div>
            </div>
          </label>

          <label
            htmlFor="provider"
            className={`relative flex cursor-pointer rounded-2xl border-2 p-5 shadow-sm transition-all hover:shadow-md ${
              userType === "provider" 
                ? "border-blue-600 bg-blue-50/50" 
                : "border-slate-200 bg-white hover:border-blue-200"
            }`}
          >
            <RadioGroupItem value="provider" id="provider" className="sr-only" />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  userType === "provider" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="grid gap-1">
                  <p className={`font-bold text-lg leading-none ${userType === "provider" ? "text-blue-900" : "text-slate-900"}`}>
                    Service Provider
                  </p>
                  <p className="text-sm text-slate-500">
                    Offer your services and grow your business
                  </p>
                </div>
              </div>
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                userType === "provider" ? "border-blue-600" : "border-slate-300"
              }`}>
                {userType === "provider" && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
              </div>
            </div>
          </label>
        </RadioGroup>

        <Link
          href={
            userType === "customer"
              ? "/customer/register"
              : "/provider/register"
          }
          className="block w-full"
        >
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 transition-all group"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <p className="text-center text-slate-600 font-medium">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
