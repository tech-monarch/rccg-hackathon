"use client";

import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";

interface ContactActionsProps {
  phone: string;
  email: string;
  providerName: string;
  category: string;
  className?: string;
}

export function ContactActions({
  phone,
  email,
  providerName,
  category,
  className = "",
}: ContactActionsProps) {
  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Inquiry about ${category} services`);
    const body = encodeURIComponent(`Hi ${providerName},

I found your profile on UniHub and I'm interested in your ${category} services.

Could you please provide more information about:
- Your availability
- Pricing
- Portfolio examples

Looking forward to hearing from you.

Best regards`);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <WhatsAppButton
        phoneNumber={phone}
        message={`Hi ${providerName}! I'm interested in your ${category} services. Can we discuss my requirements?`}
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        WhatsApp Now
      </WhatsAppButton>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        size="lg"
        onClick={handlePhoneClick}
      >
        <Phone className="h-4 w-4 mr-2" />
        Call Now
      </Button>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        size="lg"
        onClick={handleEmailClick}
      >
        <Mail className="h-4 w-4 mr-2" />
        Send Email
      </Button>
    </div>
  );
}
