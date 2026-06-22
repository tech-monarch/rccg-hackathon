"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/layout/auth-layout";
import { authApi, saveSession } from "@/lib/api";

export default function CustomerRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", password: "", agreeToTerms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.agreeToTerms) newErrors.terms = "You must agree to the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setApiError("");
    try {
      const res = await authApi.registerCustomer({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      if (!res.success) { setApiError(res.message || "Registration failed. Please try again."); return; }
      saveSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        role: res.data.user.role,
        profileId: res.data.customer?.id,
        userId: res.data.user.id,
      });
      localStorage.setItem("haven_customer_profile", JSON.stringify(res.data.customer));
      window.location.href = "/customer/dashboard";
    } catch {
      setApiError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join Haven to find and hire trusted service professionals.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {apiError && <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium">{apiError}</div>}

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="e.g. John Doe" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-blue-600 transition-colors ${errors.fullName ? "border-red-500" : ""}`} />
          {errors.fullName && <p className="text-red-500 text-xs font-medium mt-1">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-blue-600 transition-colors ${errors.email ? "border-red-500" : ""}`} />
          {errors.email && <p className="text-red-500 text-xs font-medium mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="e.g. +234 800 000 0000" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-blue-600 transition-colors ${errors.phone ? "border-red-500" : ""}`} />
          {errors.phone && <p className="text-red-500 text-xs font-medium mt-1">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password (min 6 chars)" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-blue-600 transition-colors ${errors.password ? "border-red-500" : ""}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs font-medium mt-1">{errors.password}</p>}
        </div>

        <div className="pt-2">
          <div className="flex items-start space-x-3">
            <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={(c) => handleInputChange("agreeToTerms", c as boolean)} className={`mt-1 rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 ${errors.terms ? "border-red-500" : ""}`} />
            <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed cursor-pointer select-none">
              I agree to Haven's{" "}
              <Link href="/terms" className="text-blue-600 hover:underline font-medium">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs font-medium mt-1 ml-7">{errors.terms}</p>}
        </div>

        <Button type="submit" disabled={!formData.agreeToTerms || isSubmitting} className="w-full h-14 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-6">
          {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating Account...</> : "Create Account"}
        </Button>

        <p className="text-center text-slate-600 font-medium pt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors">Sign in here</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
