"use client";

import { Calendar, CheckCircle, Gift, Coins } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ServiceHistoryItem } from "@/types/user";

interface OverviewTabProps {
  serviceHistory: ServiceHistoryItem[];
  totalPoints: number;
  canRedeemPoints: boolean;
  onRedeemClick: () => void;
  onViewAllClick: () => void;
  formatDate: (dateString: string) => string;
}

export default function OverviewTab({
  serviceHistory,
  totalPoints,
  canRedeemPoints,
  onRedeemClick,
  onViewAllClick,
  formatDate,
}: OverviewTabProps) {
  const upcomingCount = serviceHistory.filter((s) => s.status === "scheduled").length;
  const completedCount = serviceHistory.filter((s) => s.status === "completed").length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Services
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {serviceHistory.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Upcoming Services
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {upcomingCount}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Completed Services
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {completedCount}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`border-slate-100 shadow-sm transition-shadow ${
            canRedeemPoints ? "ring-2 ring-green-500 ring-offset-2" : "hover:shadow-md"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Reward Points
                </p>
                <p className="text-3xl font-bold text-slate-900">{totalPoints}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Coins className="h-6 w-6 text-amber-500" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Progress to ₦1k airtime</span>
                <span>{totalPoints} / 5000</span>
              </div>
              <Progress
                value={Math.min((totalPoints / 5000) * 100, 100)}
                className="h-2 bg-slate-100"
              />
              <Button
                onClick={onRedeemClick}
                variant={canRedeemPoints ? "default" : "outline"}
                className={`w-full text-xs h-8 ${
                  canRedeemPoints
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-sm"
                    : "text-slate-400 border-slate-200"
                }`}
                disabled={!canRedeemPoints}
              >
                <Gift className="h-3.5 w-3.5 mr-1.5" />
                {canRedeemPoints ? "Redeem Now" : "Not Enough Points"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Services & CTA */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Services</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              onClick={onViewAllClick}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {serviceHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">No recent services found.</p>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                {serviceHistory.slice(0, 3).map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="font-semibold text-slate-900 truncate">
                          {service.serviceName}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                            service.status === "completed"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {service.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 truncate mb-1">
                        Provider: <span className="font-medium text-slate-900">{service.providerName}</span>
                      </p>
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>{formatDate(service.date)}</span>
                      </div>
                    </div>
                    
                    {service.pointsEarned > 0 && (
                      <div className="shrink-0 flex items-center justify-center bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                        <Coins className="h-4 w-4 mr-1.5 text-amber-500" />
                        +{service.pointsEarned} pts
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-64 h-64 transform translate-x-1/4 -translate-y-1/4">
              <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,68.8,-55.4,78.2,-41.2C87.6,-27,96.5,-12.5,95.6,1.6C94.7,15.7,84,29.4,73.5,41.2C63.1,53,52.8,62.9,40.7,70.5C28.6,78.1,14.3,83.4,-0.6,84.4C-15.5,85.4,-31,82.1,-43.5,74.1C-56,66.1,-65.5,53.4,-72.6,39.8C-79.7,26.2,-84.4,11.7,-84,-2.5C-83.6,-16.7,-78.1,-30.6,-69.5,-42C-60.9,-53.4,-49.2,-62.3,-36.5,-69.7C-23.8,-77.1,-11.9,-83,2.4,-86.3C16.7,-89.6,32.5,-83.5,45.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-white">
              Need a service professional?
            </h3>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Fill out our simple request form and get instant quotes from verified providers in your area.
            </p>
            <Link href="/customer/request-service" className="block mt-auto">
              <Button className="w-full bg-white text-blue-600 hover:bg-slate-50 hover:text-blue-700 shadow-md font-semibold py-6 text-base">
                Request a Service
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
