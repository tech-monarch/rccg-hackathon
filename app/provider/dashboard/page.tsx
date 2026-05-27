"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Edit,
  Upload,
  Eye,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageUpload } from "@/components/image-upload";

const recentReviews = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely amazing work! Transformed our living room beautifully.",
    date: "2 days ago",
  },
  {
    id: 2,
    customerName: "Michael Okafor",
    rating: 5,
    comment: "Perfect event decoration for our wedding. Highly recommended!",
    date: "1 week ago",
  },
  {
    id: 3,
    customerName: "Grace Adamu",
    rating: 4,
    comment: "Very satisfied with the consultation. Professional service.",
    date: "2 weeks ago",
  },
];

const recentInquiries = [
  {
    id: 1,
    customerName: "John Doe",
    service: "Living Room Design",
    message: "I need help designing my new apartment living room...",
    date: "1 hour ago",
    status: "new",
  },
  {
    id: 2,
    customerName: "Mary Smith",
    service: "Event Decoration",
    message: "Looking for birthday party decoration services...",
    date: "3 hours ago",
    status: "replied",
  },
  {
    id: 3,
    customerName: "David Wilson",
    service: "Office Interior",
    message: "Need consultation for office space renovation...",
    date: "1 day ago",
    status: "new",
  },
];

export default function providerDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (!isLoggedIn || !currentUser) {
      // Redirect to login if not authenticated
      window.location.href = "/provider/login";
      return;
    }

    try {
      const user = JSON.parse(currentUser);
      setUserData(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      window.location.href = "/provider/login";
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const providerData = {
    name: userData?.businessName || "Your Business",
    category: userData?.category || "Service provider",
    rating: 4.8,
    totalReviews: 124,
    profileViews: 1250,
    contactRequests: 45,
    location: userData?.location || "Nigeria",
    phone: userData?.phone || "+234 800 000 0000",
    email: userData?.email || "your@email.com",
    joinDate: userData?.registrationDate
      ? new Date(userData.registrationDate).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Recently",
    portfolioImages: userData?.portfolioCount || 0,
    isVerified: true,
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("providerData");
    window.location.href = "/provider/login";
  };

  const handlePortfolioUpdate = async (images: File[]) => {
    setPortfolioImages(images);

    try {
      // Process images and update user data
      const processedImages: string[] = [];

      for (const image of images) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
        processedImages.push(base64);
      }

      // Update stored user data
      const updatedUserData = {
        ...userData,
        portfolioImages: [
          ...(userData.portfolioImages || []),
          ...processedImages,
        ],
        portfolioCount: (userData.portfolioCount || 0) + images.length,
      };

      localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
      localStorage.setItem("providerData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);

      alert("Portfolio updated successfully!");
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("Failed to update portfolio. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="text-xl font-bold text-blue-600">UniHub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href={`/provider/${providerData.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar>
                <AvatarFallback>
                  {userData?.ownerName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {providerData.name}!
              </h1>
              <p className="text-muted-foreground">
                Manage your profile and track your business performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              {providerData.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  ✓ Verified provider
                </Badge>
              )}
              <Badge variant="outline">{providerData.category}</Badge>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Profile Views
                      </p>
                      <p className="text-2xl font-bold">
                        {providerData.profileViews}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Contact Requests
                      </p>
                      <p className="text-2xl font-bold">
                        {providerData.contactRequests}
                      </p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+8%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Average Rating
                      </p>
                      <p className="text-2xl font-bold">
                        {providerData.rating}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">
                      Based on {providerData.totalReviews} reviews
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Portfolio Images
                      </p>
                      <p className="text-2xl font-bold">
                        {providerData.portfolioImages}
                      </p>
                    </div>
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">
                      Showcase your work
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInquiries.slice(0, 3).map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="flex items-start gap-3 p-3 border rounded-lg"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {inquiry.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">
                              {inquiry.customerName}
                            </p>
                            <Badge
                              variant={
                                inquiry.status === "new"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {inquiry.service}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {inquiry.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {inquiry.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                  >
                    View All Inquiries
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {review.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {review.customerName}
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.date}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                  >
                    View All Reviews
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Business Name
                        </label>
                        <p className="font-medium">{providerData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Category
                        </label>
                        <p className="font-medium">{providerData.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Member Since
                        </label>
                        <p className="font-medium">{providerData.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>{providerData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>{providerData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>{providerData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Portfolio Management</h3>
                  <ImageUpload
                    images={portfolioImages}
                    onImagesChange={handlePortfolioUpdate}
                    maxImages={6}
                    maxSizeMB={5}
                  />

                  {/* Display existing portfolio images */}
                  {userData?.portfolioImages &&
                    userData.portfolioImages.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Current Portfolio</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {userData.portfolioImages.map(
                            (imageUrl: string, index: number) => (
                              <div
                                key={index}
                                className="aspect-square overflow-hidden rounded-lg border"
                              >
                                <img
                                  src={imageUrl || "/placeholder.svg"}
                                  alt={`Portfolio ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {inquiry.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">
                            {inquiry.customerName}
                          </h4>
                          <Badge
                            variant={
                              inquiry.status === "new" ? "default" : "secondary"
                            }
                          >
                            {inquiry.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground ml-auto">
                            {inquiry.date}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-2">
                          Service: {inquiry.service}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {inquiry.message}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm">Reply</Button>
                          <Button size="sm" variant="outline">
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">
                              {review.customerName}
                            </h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-auto">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
