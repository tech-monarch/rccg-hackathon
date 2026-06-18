"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recentReviews, recentInquiries } from "@/types/providers";

// Import our new modular dashboard components
import WelcomeSection from "./welcome-section";
import OverviewTab from "./overview-tab";
import ProfileTab from "./profile-tab";
import InquiriesTab from "./inquiries-tab";
import ReviewsTab from "./reviews-tab";

export default function ProviderDashboard() {
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium tracking-wide">Loading dashboard...</p>
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
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <WelcomeSection 
          providerName={providerData.name} 
          category={providerData.category}
          isVerified={providerData.isVerified}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="w-full overflow-x-auto pb-2 -mb-2">
            <TabsList className="bg-white border border-slate-200 shadow-sm rounded-lg p-1 min-w-max md:w-auto inline-flex h-auto">
              <TabsTrigger 
                value="overview" 
                className="rounded-md px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-600 font-medium"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="profile"
                className="rounded-md px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-600 font-medium"
              >
                Profile & Portfolio
              </TabsTrigger>
              <TabsTrigger 
                value="inquiries"
                className="rounded-md px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-600 font-medium"
              >
                Inquiries
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-md px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-slate-600 font-medium"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <OverviewTab
              profileViews={providerData.profileViews}
              contactRequests={providerData.contactRequests}
              rating={providerData.rating}
              totalReviews={providerData.totalReviews}
              portfolioImagesCount={providerData.portfolioImages}
            />
          </TabsContent>

          <TabsContent value="profile" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <ProfileTab
              providerData={providerData}
              userData={userData}
              portfolioImages={portfolioImages}
              handlePortfolioUpdate={handlePortfolioUpdate}
            />
          </TabsContent>

          <TabsContent value="inquiries" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <InquiriesTab inquiries={recentInquiries} />
          </TabsContent>

          <TabsContent value="reviews" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <ReviewsTab 
              reviews={recentReviews}
              totalReviews={providerData.totalReviews}
              averageRating={providerData.rating}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
