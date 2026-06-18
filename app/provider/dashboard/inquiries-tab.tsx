"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MessageSquareReply, CheckCircle2 } from "lucide-react";

interface Inquiry {
  id: number;
  customerName: string;
  service: string;
  message: string;
  date: string;
  status: string;
}

interface InquiriesTabProps {
  inquiries: Inquiry[];
}

export default function InquiriesTab({ inquiries }: InquiriesTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-6 px-8 pt-8">
          <CardTitle className="text-xl font-bold text-slate-900">Customer Inquiries</CardTitle>
          <p className="text-sm text-slate-500 mt-1">Manage and respond to service requests from potential customers.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`p-6 flex flex-col md:flex-row md:items-start gap-6 transition-colors hover:bg-slate-50/50 ${
                  inquiry.status === "new" ? "bg-blue-50/30" : ""
                }`}
              >
                <div className="shrink-0 flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold">
                      {inquiry.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-slate-900 text-lg">
                        {inquiry.customerName}
                      </h4>
                      <Badge
                        variant="secondary"
                        className={`uppercase tracking-wider px-2.5 py-0.5 text-[10px] font-bold ${
                          inquiry.status === "new"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {inquiry.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm font-medium text-slate-500 shrink-0">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {inquiry.date}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200">
                      Service: {inquiry.service}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-3xl">
                    "{inquiry.message}"
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                      <MessageSquareReply className="h-4 w-4 mr-2" />
                      Reply to Customer
                    </Button>
                    {inquiry.status === "new" && (
                      <Button size="sm" variant="outline" className="shadow-sm border-slate-200 text-slate-600 hover:bg-slate-50">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {inquiries.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquareReply className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No Inquiries Yet</h3>
              <p className="text-slate-500">When customers reach out to you, their messages will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
