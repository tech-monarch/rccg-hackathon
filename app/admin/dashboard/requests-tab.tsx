// app/admin/dashboard/requests-tab.tsx
"use client";

import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MockServiceRequest } from "@/utils/mockDb";

interface RequestsTabProps {
  requests: MockServiceRequest[];
  updateStatus: (id: string, newStatus: 'APPROVED' | 'DECLINED') => void;
}

export default function RequestsTab({ requests, updateStatus }: RequestsTabProps) {
  const urgencyConfig = {
    STANDARD: "bg-emerald-50 text-emerald-700 border-emerald-100",
    URGENT: "bg-amber-50 text-amber-700 border-amber-100",
    EMERGENCY: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const statusConfig = {
    PENDING: "bg-slate-100 text-slate-700 border-slate-200/60",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    DECLINED: "bg-slate-100 text-slate-400 border-slate-200/60",
    BOOKED: "bg-blue-50 text-blue-700 border-blue-100",
    COMPLETED: "bg-indigo-50 text-indigo-700 border-indigo-100",
    CANCELLED: "bg-rose-50/50 text-rose-500 border-rose-100/50",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.01)] overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <h3 className="font-bold text-slate-900 text-sm">Inbox Requests</h3>
        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[10px] font-bold px-2.5 py-0.5">
          {requests.length} Total
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Category / Job Details</th>
              <th className="py-3 px-6">Scheduled For</th>
              <th className="py-3 px-6">Urgency</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {requests.map(r => (
              <tr key={r.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-900">{r.customerName}</td>
                <td className="py-4 px-6">
                  <div className="max-w-[260px]">
                    <p className="font-semibold text-slate-800">{r.category}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5" title={r.description}>{r.description}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{new Date(r.preferredDate).toLocaleDateString()} @ {r.preferredTime}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge variant="outline" className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${urgencyConfig[r.urgency]}`}>{r.urgency}</Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge variant="outline" className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${statusConfig[r.status]}`}>{r.status}</Badge>
                </td>
                <td className="py-4 px-6 text-right">
                  {r.status === "PENDING" ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        onClick={() => updateStatus(r.id, "APPROVED")} 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-7 px-2.5 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => updateStatus(r.id, "DECLINED")} 
                        size="sm" 
                        variant="outline" 
                        className="border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-100 rounded-lg h-7 px-2.5 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        Decline
                      </Button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold mr-2">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
