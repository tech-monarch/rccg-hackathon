// app/admin/dashboard/providers-tab.tsx
"use client";

import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MockProvider } from "@/utils/mockDb";

interface ProvidersTabProps {
  providers: MockProvider[];
  toggleVerification: (id: string, currentVal: boolean) => void;
  togglePublish: (id: string, currentVal: boolean) => void;
}

export default function ProvidersTab({
  providers,
  toggleVerification,
  togglePublish
}: ProvidersTabProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.01)] overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <h3 className="font-bold text-slate-900 text-sm">Registered Providers</h3>
        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[10px] font-bold px-2.5 py-0.5">
          {providers.length} Listings
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-6">Business Name</th>
              <th className="py-3 px-6">Owner Profile</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Location</th>
              <th className="py-3 px-6">Rating</th>
              <th className="py-3 px-6">Vetting</th>
              <th className="py-3 px-6">Visibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {providers.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-900">{p.businessName}</td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-semibold text-slate-800">{p.ownerName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{p.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-600 text-[11px]">{p.category}</td>
                <td className="py-4 px-6 text-slate-500 font-medium">{p.location}</td>
                <td className="py-4 px-6">
                  <span className="font-bold text-amber-500">★ {p.avgRating.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-400"> ({p.totalReviews})</span>
                </td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => toggleVerification(p.id, p.isVerified)}
                    className={`flex items-center gap-1.5 text-[10px] font-bold border rounded-lg py-1 px-2.5 transition-colors cursor-pointer ${p.isVerified ? 'bg-emerald-50/80 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50' : 'bg-slate-100 text-slate-500 border-slate-200/60 hover:bg-slate-200/50'}`}
                  >
                    {p.isVerified ? (
                      <><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Verified</>
                    ) : (
                      <><ShieldAlert className="h-3.5 w-3.5 text-slate-400" /> Unverified</>
                    )}
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => togglePublish(p.id, p.isPublished)}
                    className={`flex items-center gap-1 text-[10px] font-bold border rounded-lg py-1 px-2.5 transition-colors cursor-pointer ${p.isPublished ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100/50' : 'bg-amber-50/80 text-amber-700 border-amber-100 hover:bg-amber-100/50'}`}
                  >
                    {p.isPublished ? "Published" : "Hidden"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
