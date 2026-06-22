"use client"

import type React from "react"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function WhatsAppButton({
  phoneNumber,
  message = "",
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  children,
}: WhatsAppButtonProps) {
  // Clean phone number - remove spaces, dashes, and format for WhatsApp
  const cleanPhoneNumber = phoneNumber.replace(/[\s\-$$$$]/g, "")

  // Ensure the number starts with country code (Nigeria +234)
  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove any leading + or 0
    const cleaned = phone.replace(/^[+0]+/, "")

    // If it starts with 234, it's already formatted
    if (cleaned.startsWith("234")) {
      return cleaned
    }

    // If it starts with Nigerian mobile prefixes, add 234
    if (cleaned.match(/^[789]/)) {
      return `234${cleaned}`
    }

    // Default: assume it needs 234 prefix
    return `234${cleaned}`
  }

  const whatsappNumber = formatPhoneForWhatsApp(cleanPhoneNumber)

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message)

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}${message ? `?text=${encodedMessage}` : ""}`

  const handleClick = () => {
    // Check if we're on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      // On mobile, try to open WhatsApp app first, fallback to web
      const whatsappAppUrl = `whatsapp://send?phone=${whatsappNumber}${message ? `&text=${encodedMessage}` : ""}`

      // Try to open WhatsApp app
      window.location.href = whatsappAppUrl

      // Fallback to web WhatsApp after a short delay if app doesn't open
      setTimeout(() => {
        window.open(whatsappUrl, "_blank")
      }, 1000)
    } else {
      // On desktop, open WhatsApp Web
      window.open(whatsappUrl, "_blank")
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick} type="button">
      {showIcon && <MessageCircle className="h-4 w-4 mr-2" />}
      {children || "WhatsApp"}
    </Button>
  )
}

// Hook for WhatsApp functionality
export function useWhatsApp() {
  const openWhatsApp = (phoneNumber: string, message?: string) => {
    const cleanPhoneNumber = phoneNumber.replace(/[\s\-$$$$]/g, "")

    const formatPhoneForWhatsApp = (phone: string) => {
      const cleaned = phone.replace(/^[+0]+/, "")

      if (cleaned.startsWith("234")) {
        return cleaned
      }

      if (cleaned.match(/^[789]/)) {
        return `234${cleaned}`
      }

      return `234${cleaned}`
    }

    const whatsappNumber = formatPhoneForWhatsApp(cleanPhoneNumber)
    const encodedMessage = message ? encodeURIComponent(message) : ""
    const whatsappUrl = `https://wa.me/${whatsappNumber}${message ? `?text=${encodedMessage}` : ""}`

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      const whatsappAppUrl = `whatsapp://send?phone=${whatsappNumber}${message ? `&text=${encodedMessage}` : ""}`
      window.location.href = whatsappAppUrl

      setTimeout(() => {
        window.open(whatsappUrl, "_blank")
      }, 1000)
    } else {
      window.open(whatsappUrl, "_blank")
    }
  }

  return { openWhatsApp }
}
