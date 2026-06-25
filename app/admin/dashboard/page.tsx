"use client";

import { useState, useEffect } from "react";
import { AdminAuthGuard } from "@/components/admin-auth-guard";
import { 
  mockDb, 
  MockUser, 
  MockProvider, 
  MockServiceRequest 
} from "@/utils/mockDb";
import { 
  Menu, 
  X,
  LayoutDashboard,
  Clock,
  Briefcase,
  Users
} from "lucide-react";
import { toast } from "sonner";
import { clearTokens } from "@/lib/api";

// Sub-components
import Sidebar from "./sidebar";
import OverviewTab from "./overview-tab";
import RequestsTab from "./requests-tab";
import ProvidersTab from "./providers-tab";
import UsersTab from "./users-tab";

type TabType = "overview" | "requests" | "providers" | "users";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<MockUser[]>([]);
  const [providers, setProviders] = useState<MockProvider[]>([]);
  const [requests, setRequests] = useState<MockServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);
    setStats(mockDb.getStats());
    setUsers(mockDb.getUsers());
    setProviders(mockDb.getProviders());
    setRequests(mockDb.getServiceRequests());
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    clearTokens();
    localStorage.removeItem("haven_admin_profile");
    window.location.href = "/auth/login";
  };

  const toggleProviderVerification = (providerId: string, currentVal: boolean) => {
    const updated = providers.map(p => {
      if (p.id === providerId) {
        return { ...p, isVerified: !currentVal };
      }
      return p;
    });
    mockDb.setProviders(updated);
    setProviders(updated);
    setStats(mockDb.getStats());
    toast.success(`Provider ${!currentVal ? 'verified' : 'unverified'} successfully.`);
  };

  const toggleProviderPublish = (providerId: string, currentVal: boolean) => {
    const updated = providers.map(p => {
      if (p.id === providerId) {
        return { ...p, isPublished: !currentVal };
      }
      return p;
    });
    mockDb.setProviders(updated);
    setProviders(updated);
    toast.success(`Listing is now ${!currentVal ? 'published' : 'hidden'}.`);
  };

  const toggleUserStatus = (userId: string, currentVal: boolean) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        return { ...u, isActive: !currentVal };
      }
      return u;
    });
    mockDb.setUsers(updated);
    setUsers(updated);
    toast.success(`User has been ${!currentVal ? 'activated' : 'suspended'}.`);
  };

  const updateServiceRequestStatus = (requestId: string, newStatus: 'APPROVED' | 'DECLINED') => {
    const updated = requests.map(r => {
      if (r.id === requestId) {
        return { ...r, status: newStatus };
      }
      return r;
    });
    mockDb.setServiceRequests(updated);
    setRequests(updated);
    
    if (newStatus === 'APPROVED') {
      const request = requests.find(r => r.id === requestId);
      const bookings = mockDb.getBookings();
      const randomProvider = providers[Math.floor(Math.random() * providers.length)] || providers[0];
      
      const newBooking = {
        id: `b_sim_${Date.now()}`,
        serviceRequestId: requestId,
        customerName: request?.customerName || "John Doe",
        providerId: randomProvider?.id || "p1",
        providerName: randomProvider?.businessName || "Elite Campus Cleaners",
        category: request?.category || "Home Services",
        description: request?.description || "",
        address: request?.address || "",
        amount: 5000,
        status: 'PAID' as const, 
        scheduledAt: `${request?.preferredDate}T${request?.preferredTime}:00Z`,
        pointsAwarded: 50,
        createdAt: new Date().toISOString()
      };
      
      mockDb.setBookings([...bookings, newBooking]);
    }
    
    toast.success(`Service request ${newStatus.toLowerCase()} successfully.`);
    setStats(mockDb.getStats());
  };

  if (isLoading || !stats) {
    return (
      <AdminAuthGuard>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </AdminAuthGuard>
    );
  }

  const getHeaderIcon = () => {
    switch (activeTab) {
      case "overview": return <LayoutDashboard className="h-4 w-4 text-blue-600" />;
      case "requests": return <Clock className="h-4 w-4 text-blue-600" />;
      case "providers": return <Briefcase className="h-4 w-4 text-blue-600" />;
      case "users": return <Users className="h-4 w-4 text-blue-600" />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "overview": return "System Metrics";
      case "requests": return "Service Requests Inbox";
      case "providers": return "Providers Vetting";
      case "users": return "User Permissions & Access";
    }
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
        
        {/* Mobile Header */}
        <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between md:hidden shadow-sm z-30">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              haven<span className="text-blue-600">.</span>
            </span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors border border-slate-200"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar Component */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          requestsCount={requests.filter(r => r.status === "PENDING").length}
          platformName="Haven Marketplace"
          onLogout={handleLogout}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Right Main Content */}
        <main className="flex-1 min-h-screen overflow-y-auto flex flex-col bg-slate-50/50">
          
          {/* Main Area Header */}
          <header className="bg-white border-b border-slate-200/80 px-8 py-5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2">
                {getHeaderIcon()} {getHeaderTitle()}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">System Admin</p>
                <p className="text-[10px] text-slate-400 font-medium">admin@haven.com</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50 flex items-center justify-center font-bold text-xs shadow-sm">
                SA
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-8 max-w-6xl w-full mx-auto flex-1">
            {activeTab === "overview" && <OverviewTab stats={stats} />}
            
            {activeTab === "requests" && (
              <RequestsTab 
                requests={requests} 
                updateStatus={updateServiceRequestStatus} 
              />
            )}
            
            {activeTab === "providers" && (
              <ProvidersTab 
                providers={providers} 
                toggleVerification={toggleProviderVerification} 
                togglePublish={toggleProviderPublish} 
              />
            )}
            
            {activeTab === "users" && (
              <UsersTab 
                users={users} 
                toggleUserStatus={toggleUserStatus} 
              />
            )}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
