"use client";

import Link from "next/link";
import { Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeSectionProps {
  customerData: any;
  points: number;
}

export default function WelcomeSection({ customerData, points }: WelcomeSectionProps) {
  const handleBotClick = () => {
    const phoneNumber = "2349017335663";
    const message = "Hello Haven Bot, I need help finding a service professional";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Welcome, {customerData?.fullName?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-slate-500 max-w-xl text-base mb-6">
            Manage your service requests, track appointments, and view your service history all in one place.
          </p>
          <Button
            onClick={handleBotClick}
            variant="outline"
            className="gap-2 border-green-600 text-green-700 hover:bg-green-50 shadow-sm"
          >
            <Bot className="w-4 h-4" />
            Haven Bot
          </Button>
        </div>
        <Link href="/customer/request-service" className="w-full md:w-auto">
          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-6 py-6 h-auto text-base">
            <Plus className="h-5 w-5 mr-2" />
            Request New Service
          </Button>
        </Link>
      </div>
    </div>
  );
}
