"use client";

import type React from "react";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/image-upload";
import AuthLayout from "@/components/layout/auth-layout";

const categories = [
  "Academic Support",
  "Digital Services",
  "Home Services",
  "Cooking Services",
  "Laundry Services",
  "Home Cleaning Services",
  "Hair Styling Services",
  "Farming Services",
];

const states = [
  "Lagos", "Abuja", "Kano", "Kaduna", "Port Harcourt", "Ibadan",
  "Benin City", "Jos", "Ilorin", "Enugu", "Aba", "Onitsha",
  "Warri", "Sokoto", "Katsina",
];

export default function ProviderRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    category: "",
    location: "",
    description: "",
    experience: "",
    services: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImagesChange = (images: File[]) => {
    setPortfolioImages(images);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.agreeToTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processImages = async (images: File[]): Promise<string[]> => {
    const imageUrls: string[] = [];
    for (const image of images) {
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
        imageUrls.push(base64);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const processedImages = await processImages(portfolioImages);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = {
        ...formData,
        portfolioImages: processedImages,
        portfolioCount: portfolioImages.length,
        registrationDate: new Date().toISOString(),
      };

      localStorage.setItem("providerData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert("Registration successful! Welcome to Haven!");
      window.location.href = "/provider/dashboard";
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Join as a Provider" 
      subtitle="Start connecting with customers and grow your business today."
      maxWidthClass="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        {/* Section 1: Basic Info */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Business Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                placeholder="e.g. Adebayo Interiors"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${errors.businessName ? "border-red-500" : ""}`}
              />
              {errors.businessName && <p className="text-red-500 text-xs font-medium mt-1">{errors.businessName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName">Your Full Name *</Label>
              <Input
                id="ownerName"
                placeholder="Owner/Manager Name"
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${errors.ownerName ? "border-red-500" : ""}`}
              />
              {errors.ownerName && <p className="text-red-500 text-xs font-medium mt-1">{errors.ownerName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="category">Service Category *</Label>
              <Select value={formData.category} onValueChange={(val) => handleInputChange("category", val)}>
                <SelectTrigger className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 ${errors.category ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-xs font-medium mt-1">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select value={formData.location} onValueChange={(val) => handleInputChange("location", val)}>
                <SelectTrigger className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 ${errors.location ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((st) => (
                    <SelectItem key={st} value={st}>{st}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-red-500 text-xs font-medium mt-1">{errors.location}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-xs font-medium mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-xs font-medium mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Details & Portfolio */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Services & Portfolio</h3>
          
          <div className="space-y-2">
            <Label htmlFor="description">Business Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what makes your services unique..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-red-500 text-xs font-medium mt-1">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Specific Services (Optional)</Label>
            <Textarea
              id="services"
              placeholder="List specific services (e.g. interior design, deep cleaning...)"
              rows={2}
              value={formData.services}
              onChange={(e) => handleInputChange("services", e.target.value)}
              className="rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none"
            />
          </div>

          <div className="space-y-2 pt-2">
            <Label>Student ID (Optional)</Label>
            <p className="text-xs text-slate-500 mb-3">Upload an image of your student ID to verify your status.</p>
            <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <ImageUpload
                images={portfolioImages}
                onImagesChange={handleImagesChange}
                maxImages={2}
                maxSizeMB={5}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Security & Submit */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Account Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-medium mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`h-12 px-4 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs font-medium mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-start space-x-3 mb-6">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              className={`mt-1 ${errors.terms ? "border-red-500" : "border-slate-300"}`}
            />
            <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed cursor-pointer select-none">
              I agree to Haven's <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. I understand my profile will be reviewed before publication.
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs font-medium -mt-4 mb-4 ml-7">{errors.terms}</p>}

          <Button
            type="submit"
            disabled={!formData.agreeToTerms || isSubmitting}
            className="w-full h-14 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating Profile...</>
            ) : "Create Provider Account"}
          </Button>

          <p className="text-center text-slate-600 font-medium pt-6">
            Already have a provider account?{" "}
            <Link href="/provider/login" className="text-blue-600 hover:text-blue-700 hover:underline font-bold">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
