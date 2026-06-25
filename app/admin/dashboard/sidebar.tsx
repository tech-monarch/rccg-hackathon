// app/admin/dashboard/sidebar.tsx
"use client";

import { 
  Users, 
  Briefcase, 
  Clock, 
  LayoutDashboard, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "overview" | "requests" | "providers" | "users";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  requestsCount: number;
  platformName: string;
  onLogout: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  requestsCount,
  platformName,
  onLogout,
  isMobileOpen,
  setIsMobileOpen
}: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "requests", label: "Requests Inbox", icon: Clock, count: requestsCount },
    { id: "providers", label: "Providers Vetting", icon: Briefcase },
    { id: "users", label: "Users Access", icon: Users },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white text-slate-700 border-r border-slate-200/80 flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:h-screen shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100 flex flex-col">
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            haven<span className="text-blue-600">.</span>
          </span>
          <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-1 block">Management Console</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer group
                  ${isActive 
                    ? "bg-blue-50/80 text-blue-600" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-blue-600 text-white" : "bg-red-500 text-white"}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t border-slate-100">
          <Button 
            onClick={onLogout}
            variant="ghost" 
            className="w-full text-slate-500 hover:text-red-600 hover:bg-red-50/50 rounded-lg flex items-center justify-start gap-3 px-3.5 py-5 text-xs font-semibold cursor-pointer border border-transparent hover:border-red-100/40"
          >
            <LogOut className="h-4.5 w-4.5 text-slate-400" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
}
