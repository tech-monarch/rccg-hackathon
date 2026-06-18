"use client";

import { User, Mail, Phone, CalendarDays, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CustomerUser } from "@/types/user";

interface ProfileTabProps {
  userData: CustomerUser;
  formatDate: (dateString: string) => string;
}

export default function ProfileTab({ userData, formatDate }: ProfileTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-6 px-8 pt-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Personal Information</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Manage your account details and security settings.</p>
          </div>
          <Button variant="outline" className="shadow-sm border-slate-200 hidden sm:flex">
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Avatar Section */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group mb-6">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 font-bold">
                    {userData?.fullName
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-white text-xs font-medium">Change</span>
                </div>
              </div>
              <Button variant="outline" className="w-full shadow-sm max-w-[200px]">
                Update Photo
              </Button>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <User className="h-4 w-4" />
                    <p className="text-sm font-medium">Full Name</p>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{userData.fullName}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm font-medium">Email Address</p>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{userData.email}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <Phone className="h-4 w-4" />
                    <p className="text-sm font-medium">Phone Number</p>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{userData.phone}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    <p className="text-sm font-medium">Member Since</p>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">
                    {userData.registrationDate
                      ? formatDate(userData.registrationDate)
                      : "Recently joined"}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Account Security</h4>
                    <p className="text-sm text-slate-500">Keep your account secure with a strong password.</p>
                  </div>
                </div>
                <Button variant="outline" className="shadow-sm">
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
