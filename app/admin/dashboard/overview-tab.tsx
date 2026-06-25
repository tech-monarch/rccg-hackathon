// app/admin/dashboard/overview-tab.tsx
"use client";

import { 
  Users, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Sparkles 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OverviewTabProps {
  stats: {
    customers: number;
    providers: number;
    bookings: number;
    completedBookings: number;
    totalRevenue: number;
  };
}

export default function OverviewTab({ stats }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Active Customers", value: stats.customers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Providers", value: stats.providers, icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Bookings", value: stats.bookings, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Platform Revenue", value: `₦${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((s, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{s.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${s.bg} border border-transparent`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* SVG Area Chart Section */}
      <div className="bg-white rounded-xl border border-slate-200/70 p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Platform Bookings Volume</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Continuous request tracking over time</p>
          </div>
          <Badge className="bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-50 text-[10px] font-bold px-2 py-0.5 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +14.2% Growth
          </Badge>
        </div>

        {/* Premium SVG Area Chart */}
        <div className="h-64 w-full relative pt-2">
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

            {/* Area Path */}
            <path 
              d="M 0 170 C 50 150, 100 130, 150 90 C 200 50, 250 120, 300 70 C 350 30, 400 40, 450 20 C 475 10, 500 15, 500 15 L 500 200 L 0 200 Z" 
              fill="url(#chartGradient)"
            />
            {/* Line Path */}
            <path 
              d="M 0 170 C 50 150, 100 130, 150 90 C 200 50, 250 120, 300 70 C 350 30, 400 40, 450 20 C 475 10, 500 15, 500 15" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            {/* Glowing point dots */}
            <circle cx="150" cy="90" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" className="shadow" />
            <circle cx="300" cy="70" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" className="shadow" />
            <circle cx="450" cy="20" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" className="shadow" />
          </svg>
          {/* X-axis labels */}
          <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase mt-2 pt-2 border-t border-slate-100">
            <span>May 1</span>
            <span>May 10</span>
            <span>May 20</span>
            <span>May 30</span>
            <span>Jun 10</span>
            <span>Jun 20</span>
            <span>Jun 30</span>
          </div>
        </div>
      </div>
    </div>
  );
}
