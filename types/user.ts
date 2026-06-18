export interface CustomerUser {
  fullName: string;
  email: string;
  phone: string;
  registrationDate?: string;
}

export interface ServiceHistoryItem {
  id: number;
  serviceName: string;
  providerName: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled";
  rating: number | null;
  pointsEarned: number;
}

export const sampleServiceHistory: ServiceHistoryItem[] = [
  {
    id: 1,
    serviceName: "Home Services",
    providerName: "Precious",
    date: "2023-10-15",
    status: "completed",
    rating: 5,
    pointsEarned: 1200,
  },
  {
    id: 2,
    serviceName: "Digital Services",
    providerName: "Ebuka Designs",
    date: "2023-09-22",
    status: "completed",
    rating: 4,
    pointsEarned: 850,
  },
  {
    id: 3,
    serviceName: "Academic Services",
    providerName: "Amaka Oseh",
    date: "2023-11-05",
    status: "scheduled",
    rating: null,
    pointsEarned: 0,
  },
];
