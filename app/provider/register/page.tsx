"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/image-upload";

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
  "Lagos",
  "Abuja",
  "Kano",
  "Kaduna",
  "Port Harcourt",
  "Ibadan",
  "Benin City",
  "Jos",
  "Ilorin",
  "Enugu",
  "Aba",
  "Onitsha",
  "Warri",
  "Sokoto",
  "Katsina",
];

export default function providerRegisterPage() {
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImagesChange = (images: File[]) => {
    setPortfolioImages(images);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.businessName.trim())
      newErrors.businessName = "Helper name is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.description.trim())
      newErrors.description = "Helper description is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    if (!formData.agreeToTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processImages = async (images: File[]): Promise<string[]> => {
    const imageUrls: string[] = [];

    for (const image of images) {
      try {
        // Convert image to base64 for storage (in a real app, you'd upload to a server)
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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Process uploaded images
      const processedImages = await processImages(portfolioImages);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store user data in localStorage (in real app, this would be handled by your auth system)
      const userData = {
        ...formData,
        portfolioImages: processedImages,
        portfolioCount: portfolioImages.length,
        registrationDate: new Date().toISOString(),
      };

      localStorage.setItem("providerData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert("Registration successful! Welcome to UniHub!");
      window.location.href = "/provider/dashboard";
    } catch (error) {
      alert("Registration failed. Please try again.");
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
                Already have an account?
              </span>
              <Link href="/provider/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join UniHub as a Helper</h1>
            <p className="text-muted-foreground">
              Start connecting with customers and grow your Helper today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Helper Information */}
            <Card>
              <CardHeader>
                <CardTitle>Helper Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Helper Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="e.g., Adebayo Interiors"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      required
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm">
                        {errors.businessName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                    <Input
                      id="ownerName"
                      placeholder="Your full name"
                      value={formData.ownerName}
                      onChange={(e) =>
                        handleInputChange("ownerName", e.target.value)
                      }
                      required
                    />
                    {errors.ownerName && (
                      <p className="text-red-500 text-sm">{errors.ownerName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Service Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your service category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Helper Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your services, experience, and what makes your Helper unique..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    required
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                {/* <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 5 years"
                      value={formData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                    />
                  </div>
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="services">Specific Services Offered</Label>
                  <Textarea
                    id="services"
                    placeholder="List the specific services you offer (e.g., Interior design consultation, Event decoration, Space planning...)"
                    rows={3}
                    value={formData.services}
                    onChange={(e) =>
                      handleInputChange("services", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+234 801 234 5678"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location/State *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      handleInputChange("location", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <p className="text-red-500 text-sm">{errors.location}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Student ID*</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your student ID.
                </p>

                <ImageUpload
                  images={portfolioImages}
                  onImagesChange={handleImagesChange}
                  maxImages={6}
                  maxSizeMB={5}
                />
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
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
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked as boolean)
                      }
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      . I understand that my profile will be reviewed before
                      being published.
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-sm">{errors.terms}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    disabled={!formData.agreeToTerms || isSubmitting}
                  >
                    {isSubmitting
                      ? "Creating Account..."
                      : "Create provider Account"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/provider/login"
                      className="text-blue-600 hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
