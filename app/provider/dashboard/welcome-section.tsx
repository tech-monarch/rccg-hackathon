"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface WelcomeSectionProps {
  providerName: string;
  category: string;
  isVerified: boolean;
}

export default function WelcomeSection({ providerName, category, isVerified }: WelcomeSectionProps) {
  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Welcome back, {providerName}!
          </h1>
          <p className="text-slate-500 text-base max-w-xl">
            Manage your profile, respond to inquiries, and track your business performance.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
          {isVerified && (
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-600" />
              Verified Provider
            </Badge>
          )}
          <Badge 
            variant="outline" 
            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-colors"
          >
            {category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
