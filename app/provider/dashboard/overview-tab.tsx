"use client";

import { Star, Eye, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  providerData: any;
  stats: any;
}

export default function OverviewTab({ providerData, stats }: OverviewTabProps) {
  const avgRating = parseFloat(providerData?.avgRating) || 0;

  const statCards = [
    { label: "Profile Views", value: stats?.profileViews ?? 0, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Avg Rating", value: avgRating > 0 ? avgRating.toFixed(1) : "—", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Reviews", value: stats?.totalReviews ?? providerData?.totalReviews ?? 0, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Completed Jobs", value: stats?.completedBookings ?? 0, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-white shadow-sm`}>
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Profile completeness */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <h3 className="font-bold text-slate-900">Profile Status</h3>
        </div>
        <div className="space-y-2">
          {[
            { label: "Business name", done: !!providerData?.businessName },
            { label: "Description", done: !!providerData?.description },
            { label: "Portfolio images", done: (providerData?.portfolioImages?.length || 0) > 0 },
            { label: "Services listed", done: !!providerData?.services },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-green-100" : "bg-slate-100"}`}>
                {item.done ? <CheckCircle className="h-3 w-3 text-green-600" /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
              </div>
              <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-sm">
        <h3 className="font-bold text-lg mb-1">Your public profile</h3>
        <p className="text-blue-100 text-sm mb-4">See how customers see your profile.</p>
        <Link href={`/provider/${providerData?.id}`} target="_blank">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm">View Public Profile →</Button>
        </Link>
      </div>
    </div>
  );
}
