"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerAuthGuard } from "@/components/customer-auth-guard";
import WelcomeSection from "./welcome-section";
import OverviewTab from "./overview-tab";
import ServiceHistoryTab from "./service-history-tab";
import ProfileTab from "./profile-tab";
import { customersApi } from "@/lib/api";

export default function CustomerDashboardPage() {
  const [customerData, setCustomerData] = useState<any>(null);
  const [serviceHistory, setServiceHistory] = useState<any[]>([]);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [profileRes, historyRes, pointsRes] = await Promise.all([
      customersApi.getMe(),
      customersApi.getServiceHistory({ limit: 50 }),
      customersApi.getPoints(),
    ]);
    if (profileRes.success) {
      setCustomerData(profileRes.data);
      localStorage.setItem("haven_customer_profile", JSON.stringify(profileRes.data));
    }
    if (historyRes.success) setServiceHistory(historyRes.data);
    if (pointsRes.success) setPoints(pointsRes.data.totalPoints);
    setIsLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  if (isLoading) {
    return (
      <CustomerAuthGuard>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Loading your dashboard...</p>
          </div>
        </div>
      </CustomerAuthGuard>
    );
  }

  return (
    <CustomerAuthGuard>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <WelcomeSection customerData={customerData} points={points} />
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl mb-6 w-full sm:w-auto">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">Overview</TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">Service History</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <OverviewTab customerData={customerData} serviceHistory={serviceHistory} points={points} onPointsRedeemed={loadData} />
            </TabsContent>
            <TabsContent value="history">
              <ServiceHistoryTab serviceHistory={serviceHistory} />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileTab customerData={customerData} onProfileUpdated={loadData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CustomerAuthGuard>
  );
}
