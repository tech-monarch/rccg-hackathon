"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthGuard } from "@/components/auth-guard";
import WelcomeSection from "./welcome-section";
import OverviewTab from "./overview-tab";
import ProfileTab from "./profile-tab";
import InquiriesTab from "./inquiries-tab";
import ReviewsTab from "./reviews-tab";
import { providersApi } from "@/lib/api";

export default function ProviderDashboardPage() {
  const [providerData, setProviderData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [profileRes, inquiriesRes, reviewsRes] = await Promise.all([
      providersApi.getMe(),
      providersApi.getMyInquiries({ limit: 50 }),
      providersApi.getMyReviews({ limit: 50 }),
    ]);
    if (profileRes.success) {
      setProviderData(profileRes.data.provider);
      setStats(profileRes.data.stats);
      localStorage.setItem("haven_provider_profile", JSON.stringify(profileRes.data.provider));
    }
    if (inquiriesRes.success) setInquiries(inquiriesRes.data);
    if (reviewsRes.success) setReviews(reviewsRes.data);
    setIsLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Loading your dashboard...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <WelcomeSection providerData={providerData} stats={stats} />
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl mb-6 w-full sm:w-auto">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">Overview</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">Profile & Portfolio</TabsTrigger>
              <TabsTrigger value="inquiries" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">
                Inquiries {inquiries.filter((i) => i.status === "NEW").length > 0 && <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full px-1.5">{inquiries.filter((i) => i.status === "NEW").length}</span>}
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white text-sm">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><OverviewTab providerData={providerData} stats={stats} /></TabsContent>
            <TabsContent value="profile"><ProfileTab providerData={providerData} onUpdated={loadData} /></TabsContent>
            <TabsContent value="inquiries"><InquiriesTab inquiries={inquiries} onUpdated={loadData} /></TabsContent>
            <TabsContent value="reviews"><ReviewsTab reviews={reviews} onUpdated={loadData} /></TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
}
