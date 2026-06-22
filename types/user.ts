// Keep type interfaces; all sample data removed — replaced by real API calls

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  totalPoints: number;
  address?: string;
  createdAt?: string;
  user?: { email: string; createdAt: string };
}

export interface ServiceHistoryItem {
  id: string;
  amount: number;
  status: string;
  scheduledAt: string;
  completedAt?: string;
  pointsAwarded: number;
  provider?: { businessName: string; category: string; phone: string };
  serviceRequest?: { category: string; description: string; address: string };
  review?: { rating: number; comment?: string };
  payment?: { status: string; amount: number };
}
