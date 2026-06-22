"use client";

import { Star, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ServiceHistoryTabProps {
  serviceHistory: any[];
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  COMPLETED: { label: "Completed", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  PAID: { label: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  IN_PROGRESS: { label: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  PENDING_PAYMENT: { label: "Pending Payment", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  CANCELLED: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

export default function ServiceHistoryTab({ serviceHistory }: ServiceHistoryTabProps) {
  if (serviceHistory.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Clock className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">No service history yet</h3>
        <p className="text-slate-500 text-sm">Your completed service requests will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {serviceHistory.map((item: any) => {
        const status = statusConfig[item.status] || statusConfig.PENDING_PAYMENT;
        const StatusIcon = status.icon;
        const scheduledDate = item.scheduledAt ? new Date(item.scheduledAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" }) : "—";

        return (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-900 text-sm">{item.provider?.businessName || "Provider"}</h3>
                  <Badge variant="outline" className={`text-xs ${status.color}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />{status.label}
                  </Badge>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">{item.serviceRequest?.category} • {item.serviceRequest?.address}</p>
                <p className="text-slate-400 text-xs mt-1">Scheduled: {scheduledDate}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-slate-900">₦{Number(item.amount).toLocaleString()}</p>
                {item.pointsAwarded > 0 && (
                  <p className="text-xs text-green-600 font-medium mt-0.5">+{item.pointsAwarded} pts</p>
                )}
              </div>
            </div>

            {item.review && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3 w-3 ${s <= item.review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">Your review</span>
                </div>
                {item.review.comment && <p className="text-xs text-slate-600 italic">"{item.review.comment}"</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
