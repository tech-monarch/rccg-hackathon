// utils/mockDb.ts

export interface MockUser {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  isActive: boolean;
  fullName: string;
  phone: string;
  businessName?: string;
  createdAt: string;
}

export interface MockProvider {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  description: string;
  isVerified: boolean;
  isPublished: boolean;
  avgRating: number;
  totalReviews: number;
  createdAt: string;
}

export interface MockServiceRequest {
  id: string;
  customerName: string;
  category: string;
  description: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  urgency: 'STANDARD' | 'URGENT' | 'EMERGENCY';
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface MockBooking {
  id: string;
  serviceRequestId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  category: string;
  description: string;
  address: string;
  amount: number;
  status: 'PENDING_PAYMENT' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  scheduledAt: string;
  pointsAwarded: number;
  createdAt: string;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

const INITIAL_PROVIDERS: MockProvider[] = [
  {
    id: "p1",
    businessName: "Elite Campus Cleaners",
    ownerName: "Tunde Bakare",
    email: "tunde@eliteclean.com",
    phone: "+234 803 111 2222",
    category: "Home Cleaning Services",
    location: "Off-Campus Hostels",
    description: "Professional cleaning services for students and staff. Fast, reliable, and affordable.",
    isVerified: true,
    isPublished: true,
    avgRating: 4.8,
    totalReviews: 24,
    createdAt: "2026-05-10T10:00:00Z"
  },
  {
    id: "p2",
    businessName: "Glow Hair Styling",
    ownerName: "Chioma Nze",
    email: "chioma@glowhair.com",
    phone: "+234 809 333 4444",
    category: "Hair Styling Services",
    location: "Female Hostel Area",
    description: "Braids, wigs, cuts, and dreadlocks. Book an appointment today and glow!",
    isVerified: false,
    isPublished: true,
    avgRating: 4.2,
    totalReviews: 12,
    createdAt: "2026-06-01T12:00:00Z"
  },
  {
    id: "p3",
    businessName: "Smart Laundry Hub",
    ownerName: "David Okoye",
    email: "david@smartlaundry.com",
    phone: "+234 812 555 6666",
    category: "Laundry Services",
    location: "Main Gate Complex",
    description: "Wash, dry-clean, iron, and fold. Free pickup and delivery within campus limits.",
    isVerified: true,
    isPublished: false,
    avgRating: 4.5,
    totalReviews: 8,
    createdAt: "2026-06-15T09:30:00Z"
  }
];

const INITIAL_USERS: MockUser[] = [
  {
    id: "u1",
    email: "admin@haven.com",
    role: "ADMIN",
    isActive: true,
    fullName: "System Administrator",
    phone: "+234 800 000 0000",
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "u2",
    email: "johndoe@example.com",
    role: "CUSTOMER",
    isActive: true,
    fullName: "John Doe",
    phone: "+234 802 345 6789",
    createdAt: "2026-04-12T14:22:00Z"
  },
  {
    id: "u3",
    email: "tunde@eliteclean.com",
    role: "PROVIDER",
    isActive: true,
    fullName: "Tunde Bakare",
    phone: "+234 803 111 2222",
    businessName: "Elite Campus Cleaners",
    createdAt: "2026-05-10T10:00:00Z"
  },
  {
    id: "u4",
    email: "chioma@glowhair.com",
    role: "PROVIDER",
    isActive: false,
    fullName: "Chioma Nze",
    phone: "+234 809 333 4444",
    businessName: "Glow Hair Styling",
    createdAt: "2026-06-01T12:00:00Z"
  }
];

const INITIAL_SERVICE_REQUESTS: MockServiceRequest[] = [
  {
    id: "sr1",
    customerName: "John Doe",
    category: "Home Cleaning Services",
    description: "Deep clean for a 2-bedroom hostel apartment.",
    address: "Block B, Room 204, Campus Hostel",
    preferredDate: "2026-06-28",
    preferredTime: "09:00",
    urgency: "STANDARD",
    status: "PENDING",
    createdAt: "2026-06-24T15:30:00Z"
  },
  {
    id: "sr2",
    customerName: "Sarah Alao",
    category: "Hair Styling Services",
    description: "Need box braids style done by tomorrow morning.",
    address: "Hall 3, Block C, Room 12",
    preferredDate: "2026-06-26",
    preferredTime: "08:00",
    urgency: "URGENT",
    status: "APPROVED",
    createdAt: "2026-06-25T11:15:00Z"
  },
  {
    id: "sr3",
    customerName: "Michael Udo",
    category: "Academic Support",
    description: "Urgent calculus exam prep coaching session.",
    address: "University Library, Study Room 4",
    preferredDate: "2026-06-27",
    preferredTime: "14:00",
    urgency: "EMERGENCY",
    status: "DECLINED",
    createdAt: "2026-06-25T08:00:00Z"
  }
];

const INITIAL_BOOKINGS: MockBooking[] = [
  {
    id: "b1",
    serviceRequestId: "sr2",
    customerName: "Sarah Alao",
    providerId: "p2",
    providerName: "Glow Hair Styling",
    category: "Hair Styling Services",
    description: "Need box braids style done by tomorrow morning.",
    address: "Hall 3, Block C, Room 12",
    amount: 8500,
    status: "COMPLETED",
    scheduledAt: "2026-06-20T08:00:00Z",
    pointsAwarded: 85,
    createdAt: "2026-06-19T14:00:00Z",
    review: {
      rating: 5,
      comment: "Absolutely amazing work! Very professional and friendly.",
      createdAt: "2026-06-21T18:30:00Z"
    }
  },
  {
    id: "b2",
    serviceRequestId: "sr4",
    customerName: "John Doe",
    providerId: "p1",
    providerName: "Elite Campus Cleaners",
    category: "Home Cleaning Services",
    description: "Standard hostel cleaning and scrubbing.",
    address: "Block B, Room 204, Campus Hostel",
    amount: 5000,
    status: "COMPLETED",
    scheduledAt: "2026-06-30T10:00:00Z",
    pointsAwarded: 50,
    createdAt: "2026-06-24T12:00:00Z"
  },
  {
    id: "b3",
    serviceRequestId: "sr5",
    customerName: "John Doe",
    providerId: "p3",
    providerName: "Smart Laundry Hub",
    category: "Laundry Services",
    description: "Dry cleaning of 2 suits.",
    address: "Block B, Room 204, Campus Hostel",
    amount: 3000,
    status: "PENDING_PAYMENT",
    scheduledAt: "2026-06-29T16:00:00Z",
    pointsAwarded: 0,
    createdAt: "2026-06-25T10:00:00Z"
  }
];

const getLocalStorage = <T>(key: string, initial: T): T => {
  if (typeof window === "undefined") return initial;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const mockDb = {
  getUsers: () => getLocalStorage<MockUser[]>("mock_users_v2", INITIAL_USERS),
  setUsers: (users: MockUser[]) => setLocalStorage("mock_users_v2", users),
  
  getProviders: () => getLocalStorage<MockProvider[]>("mock_providers_v2", INITIAL_PROVIDERS),
  setProviders: (providers: MockProvider[]) => setLocalStorage("mock_providers_v2", providers),
  
  getServiceRequests: () => getLocalStorage<MockServiceRequest[]>("mock_service_requests_v2", INITIAL_SERVICE_REQUESTS),
  setServiceRequests: (requests: MockServiceRequest[]) => setLocalStorage("mock_service_requests_v2", requests),
  
  getBookings: () => getLocalStorage<MockBooking[]>("mock_bookings_v2", INITIAL_BOOKINGS),
  setBookings: (bookings: MockBooking[]) => setLocalStorage("mock_bookings_v2", bookings),

  getStats: () => {
    const users = mockDb.getUsers();
    const providers = mockDb.getProviders();
    const bookings = mockDb.getBookings();
    
    const customersCount = users.filter(u => u.role === "CUSTOMER").length;
    const providersCount = providers.length;
    const bookingsCount = bookings.length;
    const completedCount = bookings.filter(b => b.status === "COMPLETED").length;
    const revenue = bookings
      .filter(b => b.status === "COMPLETED" || b.status === "PAID" || b.status === "IN_PROGRESS")
      .reduce((sum, b) => sum + b.amount, 0);

    return {
      customers: customersCount,
      providers: providersCount,
      bookings: bookingsCount,
      completedBookings: completedCount,
      totalRevenue: revenue
    };
  }
};
