"use client";

import Link from "next/link";
import { Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerUser } from "@/types/user";

function WhatsAppBotButton({
  variant = "default",
}: {
  variant?: "default" | "outline";
}) {
  const handleClick = () => {
    const phoneNumber = "2349067296455";
    const message =
      "Hello Haven Bot, I need help finding a service professional";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant === "outline" ? "outline" : "default"}
      className={`gap-2 transition-all ${
        variant === "outline"
          ? "border-green-600 text-green-700 hover:bg-green-50 shadow-sm"
          : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg text-white"
      }`}
    >
      <Bot className="w-4 h-4" />
      Haven Bot
    </Button>
  );
}

interface WelcomeSectionProps {
  userData: CustomerUser;
}

export default function WelcomeSection({ userData }: WelcomeSectionProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Welcome, {userData.fullName}!
          </h1>
          <p className="text-slate-500 max-w-xl text-base mb-6">
            Manage your service requests, track appointments, and view your service history all in one place.
          </p>

          <WhatsAppBotButton variant="outline" />
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
