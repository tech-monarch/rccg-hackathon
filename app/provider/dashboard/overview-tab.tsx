"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, MessageSquare, Star, Image as ImageIcon, TrendingUp } from "lucide-react";

interface OverviewTabProps {
  profileViews: number;
  contactRequests: number;
  rating: number;
  totalReviews: number;
  portfolioImagesCount: number;
}

export default function OverviewTab({
  profileViews,
  contactRequests,
  rating,
  totalReviews,
  portfolioImagesCount,
}: OverviewTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Profile Views
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {profileViews}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1.5" />
              <span className="text-emerald-600 font-medium">+12%</span>
              <span className="text-slate-500 ml-1.5">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Contact Requests
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {contactRequests}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1.5" />
              <span className="text-emerald-600 font-medium">+8%</span>
              <span className="text-slate-500 ml-1.5">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {rating}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-slate-500">
                Based on <span className="font-semibold text-slate-700">{totalReviews}</span> reviews
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Portfolio Images
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {portfolioImagesCount}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-slate-500">Uploaded to gallery</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
