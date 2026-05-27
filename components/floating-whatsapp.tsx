"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";

interface FloatingWhatsAppProps {
  supportNumber?: string;
  message?: string;
  position?: "bottom-right" | "bottom-left";
}

export function FloatingWhatsApp({
  supportNumber = "+234 901 733 5663",
  message = "Hi! I need help with UniHub. Can you assist me?",
  position = "bottom-right",
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the floating button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {isOpen && (
        <Card className="mb-4 w-80 shadow-lg animate-in slide-in-from-bottom-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">UniHub Support</p>
                  <p className="text-xs text-green-600">● Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Hi there! 👋 How can we help you today?
            </p>

            <WhatsAppButton
              phoneNumber={supportNumber}
              message={message}
              className="w-full bg-green-600 hover:bg-green-700"
              size="sm"
            >
              Start Chat
            </WhatsAppButton>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        size="sm"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
}
