"use client";

import { useState } from "react";
import { Loader2, Save, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { customersApi } from "@/lib/api";
import { toast } from "sonner";

interface ProfileTabProps {
  customerData: any;
  onProfileUpdated: () => void;
}

export default function ProfileTab({ customerData, onProfileUpdated }: ProfileTabProps) {
  const [profileForm, setProfileForm] = useState({
    fullName: customerData?.fullName || "",
    phone: customerData?.phone || "",
    address: customerData?.address || "",
  });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileError("");
    const res = await customersApi.updateMe(profileForm);
    if (res.success) {
      toast.success("Profile updated successfully!");
      onProfileUpdated();
    } else {
      setProfileError(res.message || "Failed to update profile");
    }
    setSavingProfile(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    const res = await customersApi.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    if (res.success) {
      toast.success("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setPasswordError(res.message || "Failed to change password");
    }
    setSavingPassword(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Personal Information</h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          {profileError && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{profileError}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={profileForm.fullName} onChange={(e) => setProfileForm((p) => ({ ...p, fullName: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={customerData?.user?.email || ""} disabled className="h-11 rounded-xl border-slate-200 bg-slate-100 text-slate-400" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profileForm.phone} onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Default Address</Label>
              <Input id="address" placeholder="Your home or service address" value={profileForm.address} onChange={(e) => setProfileForm((p) => ({ ...p, address: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={savingProfile} className="bg-slate-900 hover:bg-slate-800 text-white px-6">
              {savingProfile ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" />Save Changes</>}
            </Button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="h-5 w-5 text-slate-600" />
          <h3 className="font-bold text-slate-900">Change Password</h3>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {passwordError && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{passwordError}</div>}
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" required />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={savingPassword} className="bg-slate-900 hover:bg-slate-800 text-white px-6">
              {savingPassword ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</> : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
