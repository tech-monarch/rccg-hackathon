"use client";

import { Edit, Phone, Mail, MapPin, User, CalendarDays, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/image-upload";

interface ProfileTabProps {
  providerData: any;
  userData: any;
  portfolioImages: File[];
  handlePortfolioUpdate: (images: File[]) => void;
}

export default function ProfileTab({
  providerData,
  userData,
  portfolioImages,
  handlePortfolioUpdate,
}: ProfileTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 max-w-5xl">
      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-6 px-8 pt-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Profile Information</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Manage your public business details and contact info.</p>
          </div>
          <Button variant="outline" className="shadow-sm border-slate-200 hidden sm:flex">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Basic Information</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <User className="h-4 w-4" />
                    <label className="text-sm font-medium">Business Name</label>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{providerData.name}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <Tag className="h-4 w-4" />
                    <label className="text-sm font-medium">Category</label>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{providerData.category}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    <label className="text-sm font-medium">Member Since</label>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{providerData.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Contact Information</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <Phone className="h-4 w-4" />
                    <label className="text-sm font-medium">Phone Number</label>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{providerData.phone}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <Mail className="h-4 w-4" />
                    <label className="text-sm font-medium">Email Address</label>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{providerData.email}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <label className="text-sm font-medium">Location</label>
                  </div>
                  <p className="font-semibold text-slate-900 text-base">{providerData.location}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-6 px-8 pt-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Portfolio Management</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Upload images of your past work to attract more customers.</p>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="max-w-xl mx-auto mb-8">
            <ImageUpload
              images={portfolioImages}
              onImagesChange={handlePortfolioUpdate}
              maxImages={6}
              maxSizeMB={5}
            />
          </div>

          {/* Display existing portfolio images */}
          {userData?.portfolioImages && userData.portfolioImages.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="font-semibold text-slate-900 mb-6">Current Portfolio Showcase</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {userData.portfolioImages.map((imageUrl: string, index: number) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="destructive" size="sm" className="shadow-lg">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
