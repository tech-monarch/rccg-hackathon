"use client";

import { Star, Clock, CheckCircle, Gift, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PointsRedemptionModal from "./points-redemption-modal";
import { useState } from "react";

interface OverviewTabProps {
  customerData: any;
  serviceHistory: any[];
  points: number;
  onPointsRedeemed: () => void;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  COMPLETED: { label: "Completed", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  PAID: { label: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  PENDING_PAYMENT: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  CANCELLED: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200", icon: Clock },
  IN_PROGRESS: { label: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
};

export default function OverviewTab({ customerData, serviceHistory, points, onPointsRedeemed }: OverviewTabProps) {
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);

  const completed = serviceHistory.filter((s) => s.status === "COMPLETED").length;
  const pending = serviceHistory.filter((s) => s.status === "PENDING_PAYMENT" || s.status === "PAID" || s.status === "IN_PROGRESS").length;
  const recentHistory = serviceHistory.slice(0, 3);
  const REDEMPTION_THRESHOLD = 5000;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Services", value: serviceHistory.length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Completed", value: completed, color: "text-green-600", bg: "bg-green-50" },
          { label: "Active", value: pending, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Reward Points", value: points.toLocaleString(), color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-white shadow-sm`}>
            <p className="text-xs text-slate-500 font-medium mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Points card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gift className="h-4 w-4 text-amber-400" />
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Reward Points</p>
            </div>
            <p className="text-4xl font-bold">{points.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-1">
              {points >= REDEMPTION_THRESHOLD
                ? "🎉 You're eligible to redeem!"
                : `${(REDEMPTION_THRESHOLD - points).toLocaleString()} points until ₦1,000 airtime`}
            </p>
          </div>
          <Button
            onClick={() => setShowRedemptionModal(true)}
            disabled={points < REDEMPTION_THRESHOLD}
            className={`flex items-center gap-2 text-sm font-semibold ${points >= REDEMPTION_THRESHOLD ? "bg-amber-400 hover:bg-amber-500 text-slate-900" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
          >
            <Zap className="h-4 w-4" />Redeem
          </Button>
        </div>
        {points < REDEMPTION_THRESHOLD && (
          <div className="mt-3">
            <div className="h-1.5 bg-slate-700 rounded-full">
              <div className="h-1.5 bg-amber-400 rounded-full transition-all" style={{ width: `${Math.min((points / REDEMPTION_THRESHOLD) * 100, 100)}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Request service CTA */}
      <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-sm">
        <h3 className="font-bold text-lg mb-1">Need a service?</h3>
        <p className="text-blue-100 text-sm mb-4">Find and book trusted professionals near you.</p>
        <Link href="/customer/request-service">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm">
            Request a Service <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Recent services */}
      {recentHistory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Recent Services</h3>
          <div className="space-y-3">
            {recentHistory.map((item: any) => {
              const status = statusConfig[item.status] || statusConfig.PENDING_PAYMENT;
              const StatusIcon = status.icon;
              return (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{item.provider?.businessName || item.serviceRequest?.category}</p>
                    <p className="text-slate-400 text-xs">{item.serviceRequest?.category} • ₦{Number(item.amount).toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${status.color}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />{status.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <PointsRedemptionModal
        open={showRedemptionModal}
        onClose={() => setShowRedemptionModal(false)}
        points={points}
        onRedeemed={onPointsRedeemed}
      />
    </div>
  );
}
