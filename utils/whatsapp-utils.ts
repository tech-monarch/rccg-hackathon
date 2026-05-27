// Utility functions for WhatsApp integration

export function formatPhoneForWhatsApp(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Handle Nigerian phone numbers
  if (cleaned.startsWith("234")) {
    return cleaned;
  }

  // If starts with 0, remove it and add 234
  if (cleaned.startsWith("0")) {
    return `234${cleaned.substring(1)}`;
  }

  // If starts with common Nigerian mobile prefixes, add 234
  if (cleaned.match(/^[789]/)) {
    return `234${cleaned}`;
  }

  // Default case - assume it needs 234 prefix
  return `234${cleaned}`;
}

export function createWhatsAppUrl(
  phoneNumber: string,
  message?: string
): string {
  const formattedNumber = formatPhoneForWhatsApp(phoneNumber);
  const encodedMessage = message ? encodeURIComponent(message) : "";

  return `https://wa.me/${formattedNumber}${
    message ? `?text=${encodedMessage}` : ""
  }`;
}

export function createWhatsAppAppUrl(
  phoneNumber: string,
  message?: string
): string {
  const formattedNumber = formatPhoneForWhatsApp(phoneNumber);
  const encodedMessage = message ? encodeURIComponent(message) : "";

  return `whatsapp://send?phone=${formattedNumber}${
    message ? `&text=${encodedMessage}` : ""
  }`;
}

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function openWhatsApp(phoneNumber: string, message?: string): void {
  const isMobile = isMobileDevice();

  if (isMobile) {
    // Try to open WhatsApp app first
    const appUrl = createWhatsAppAppUrl(phoneNumber, message);
    window.location.href = appUrl;

    // Fallback to web WhatsApp if app doesn't open
    setTimeout(() => {
      const webUrl = createWhatsAppUrl(phoneNumber, message);
      window.open(webUrl, "_blank");
    }, 1500);
  } else {
    // On desktop, open WhatsApp Web
    const webUrl = createWhatsAppUrl(phoneNumber, message);
    window.open(webUrl, "_blank");
  }
}

// Pre-defined message templates
export const messageTemplates = {
  inquiry: (providerName: string, category: string) =>
    `Hi ${providerName}! I'm interested in your ${category} services. Can you provide more information?`,

  quote: (providerName: string, category: string) =>
    `Hi ${providerName}! I found your profile on UniHub and would like to request a quote for ${category} services.`,

  booking: (providerName: string, category: string) =>
    `Hi ${providerName}! I'd like to book your ${category} services. When are you available?`,

  support: () => `Hi! I need help with UniHub. Can you assist me?`,

  general: (providerName: string) =>
    `Hi ${providerName}! I found your profile on UniHub and would like to connect.`,
};
