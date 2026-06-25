// app/admin/dashboard/users-tab.tsx
"use client";

import { UserX, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MockUser } from "@/utils/mockDb";

interface UsersTabProps {
  users: MockUser[];
  toggleUserStatus: (id: string, currentVal: boolean) => void;
}

export default function UsersTab({ users, toggleUserStatus }: UsersTabProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.01)] overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <h3 className="font-bold text-slate-900 text-sm">Users Accounts</h3>
        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[10px] font-bold px-2.5 py-0.5">
          {users.length} Users
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-6">Full Name</th>
              <th className="py-3 px-6">Email Address</th>
              <th className="py-3 px-6">System Role</th>
              <th className="py-3 px-6">Access State</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-900">{u.fullName}</td>
                <td className="py-4 px-6 font-medium text-slate-500">{u.email}</td>
                <td className="py-4 px-6">
                  <Badge variant={u.role === "ADMIN" ? "default" : u.role === "PROVIDER" ? "secondary" : "outline"} className="text-[9px] font-bold px-1.5 py-0 rounded-md">
                    {u.role}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge variant="outline" className={`text-[9px] font-bold px-1.5 py-0 rounded-md ${u.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"}`}>
                    {u.isActive ? "Active" : "Suspended"}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-right">
                  {u.role !== "ADMIN" ? (
                    <Button
                      onClick={() => toggleUserStatus(u.id, u.isActive)}
                      size="sm"
                      variant="outline"
                      className={`rounded-lg h-7 px-2.5 text-[10px] font-bold flex items-center justify-end gap-1 ml-auto cursor-pointer ${u.isActive ? "border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-100" : "border-slate-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100"}`}
                    >
                      {u.isActive ? (
                        <><UserX className="h-3.5 w-3.5" /> Suspend</>
                      ) : (
                        <><UserCheck className="h-3.5 w-3.5" /> Activate</>
                      )}
                    </Button>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold mr-2">System Restricted</span>
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
