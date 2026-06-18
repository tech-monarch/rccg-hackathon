"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerUser, sampleServiceHistory } from "@/types/user";

// Import new modular dashboard components
import DashboardHeader from "./dashboard-header";
import WelcomeSection from "./welcome-section";
import OverviewTab from "./overview-tab";
import ServiceHistoryTab from "./service-history-tab";
import ProfileTab from "./profile-tab";
import PointsRedemptionModal from "./points-redemption-modal";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const totalPoints = sampleServiceHistory.reduce(
  (sum, service) => sum + (service.pointsEarned || 0),
  0,
);

export default function CustomerDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<CustomerUser | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const serviceHistory = sampleServiceHistory;
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("customerLoggedIn");
    const currentUser = localStorage.getItem("currentCustomer");

    if (!isLoggedIn || !currentUser) {
      // Redirect to login if not authenticated
      window.location.href = "/customer/login";
      return;
    }

    try {
      const user = JSON.parse(currentUser);
      setUserData(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      window.location.href = "/customer/login";
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

  const handleLogout = () => {
    localStorage.removeItem("customerLoggedIn");
    localStorage.removeItem("currentCustomer");
    window.location.href = "/customer/login";
  };

  // Check if points are enough for redemption
  const canRedeemPoints = totalPoints >= 5000;

  const confirmRedemption = () => {
    // In a real app, this would call an API to process the redemption
    alert(
      "Congratulations! ₦1,000 airtime will be sent to your registered phone number.",
    );
    setShowRedeemModal(false);
    // Here we would update the points balance after redemption
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader userData={userData} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <WelcomeSection userData={userData} />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="bg-white border border-slate-200 shadow-sm rounded-lg p-1 w-full max-w-md mx-auto sm:mx-0 flex">
            <TabsTrigger 
              value="overview" 
              className="flex-1 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="services"
              className="flex-1 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              History
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="flex-1 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <OverviewTab
              serviceHistory={serviceHistory}
              totalPoints={totalPoints}
              canRedeemPoints={canRedeemPoints}
              onRedeemClick={() => setShowRedeemModal(true)}
              onViewAllClick={() => setActiveTab("services")}
              formatDate={formatDate}
            />
          </TabsContent>

          <TabsContent value="services" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <ServiceHistoryTab
              serviceHistory={serviceHistory}
              formatDate={formatDate}
            />
          </TabsContent>

          <TabsContent value="profile" className="focus-visible:outline-none focus-visible:ring-0 m-0">
            <ProfileTab 
              userData={userData} 
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>
      </main>

      <PointsRedemptionModal
        isOpen={showRedeemModal}
        onOpenChange={setShowRedeemModal}
        totalPoints={totalPoints}
        userData={userData}
        onConfirm={confirmRedemption}
      />
    </div>
  );
}
