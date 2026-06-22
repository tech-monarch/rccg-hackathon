// All dummy/sample data removed — replaced by real API calls via lib/api.ts

export interface Provider {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  category: string;
  location: string;
  description: string;
  services?: string;
  experience?: string;
  website?: string;
  isVerified: boolean;
  isPublished: boolean;
  avgRating: number | string;
  totalReviews: number;
  profileViews: number;
  portfolioImages?: PortfolioImage[];
  user?: { email: string };
}

export interface PortfolioImage {
  id: string;
  imageUrl: string;
  publicId: string;
  sortOrder: number;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  providerReply?: string;
  createdAt: string;
  customer?: { fullName: string; avatarUrl?: string };
}

export interface Inquiry {
  id: string;
  service: string;
  message: string;
  reply?: string;
  status: "NEW" | "REPLIED" | "CLOSED";
  createdAt: string;
  customer?: { fullName: string; phone: string; avatarUrl?: string };
}
