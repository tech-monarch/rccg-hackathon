"use client";

import { Calendar, Coins, MessageSquare, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceHistoryItem } from "@/types/user";

interface ServiceHistoryTabProps {
  serviceHistory: ServiceHistoryItem[];
  formatDate: (dateString: string) => string;
}

export default function ServiceHistoryTab({
  serviceHistory,
  formatDate,
}: ServiceHistoryTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="border-b border-slate-50 bg-white/50 pb-6">
          <CardTitle className="text-xl font-bold text-slate-900">Service History</CardTitle>
          <p className="text-sm text-slate-500 mt-1">Review your past appointments and track upcoming services.</p>
        </CardHeader>
        <CardContent className="p-0">
          {serviceHistory.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {serviceHistory.map((service) => (
                <div key={service.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="font-bold text-slate-900 text-lg">
                          {service.serviceName}
                        </h4>
                        <Badge
                          variant="secondary"
                          className={`uppercase tracking-wider px-2.5 py-0.5 text-xs font-semibold ${
                            service.status === "completed"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {service.status}
                        </Badge>
                        {service.pointsEarned > 0 && (
                          <div className="flex items-center bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                            <Coins className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                            {service.pointsEarned} points
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Provided by: <span className="font-semibold text-slate-900">{service.providerName}</span>
                      </p>
                      <div className="flex items-center text-sm text-slate-500 font-medium">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(service.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      {service.status === "completed" ? (
                        <Button variant="outline" className="w-full md:w-auto shadow-sm hover:bg-slate-50 text-slate-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Leave Review
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full md:w-auto shadow-sm border-blue-200 text-blue-700 hover:bg-blue-50">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Provider
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchX className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No services found</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-6">
                You haven't requested any services yet. When you do, they will appear here.
              </p>
              <Link href="/providers">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                  Browse Service Providers
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
