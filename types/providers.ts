export type Provider = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  image: string;
  description: string;
  email?: string;
};

export const dummyProviders: Provider[] = [
  {
    id: 1,
    name: "Adanna Cleaning Services",
    category: "Home Cleaning Services",
    rating: 4.8,
    reviews: 124,
    location: "Girl's hostel",
    phone: "+234 801 234 5678",
    email: "info@adannacleaners.com",
    image: "https://i.pinimg.com/736x/e3/dd/b0/e3ddb011e1f98a32f6c1c9f5c03ee515.jpg",
    description: "I sha sabi clean, just dm me make i come clean for u",
  },
  {
    id: 2,
    name: "Okon Paul",
    category: "Digital Services",
    rating: 4.9,
    reviews: 89,
    location: "Mandela Hostel",
    phone: "+234 802 345 6789",
    email: "contact@paulokon.com",
    image: "https://tse2.mm.bing.net/th/id/OIP.QmuHVhXyHhi4O-V2thkdxgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "I sha dey repair phones, if you wan sell, swap, or even buy and fix i active",
  },
  {
    id: 3,
    name: "Ebuka Callistus",
    category: "Laundry Services",
    rating: 4.7,
    reviews: 156,
    location: "Boy's Hostel",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanebusy.com",
    image: "https://counseal.com/app/uploads/2023/11/website-featured-An-Image-depicting-a-laundry-business.jpg",
    description: "Professional laundry and dry cleaning services for all occasions",
  },
  {
    id: 4,
    name: "Precious",
    category: "Home Services",
    rating: 4.7,
    reviews: 156,
    location: "Girls Hostel",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanebusy.com",
    image: "https://www.nairaland.com/attachments/16999586_65cbc4a992571d113f3191438519ee0b_jpegc39fd5f4173ad02124a0d436cdf441e4",
    description: "I can help you with your home services😏",
  },
  {
    id: 5,
    name: "Ekene",
    category: "Farming Services",
    rating: 4.7,
    reviews: 156,
    location: "Delta",
    phone: "+234 803 456 7890",
    email: "hello@mrfarmboy.com",
    image: "https://tse3.mm.bing.net/th/id/OIP.SYK5-rGj7lpAa0-HrJqxhQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "I sha dey cut grass",
  },
];

export const recentReviews = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely amazing work! Transformed our living room beautifully.",
    date: "2 days ago",
  },
  {
    id: 2,
    customerName: "Michael Okafor",
    rating: 5,
    comment: "Perfect event decoration for our wedding. Highly recommended!",
    date: "1 week ago",
  },
  {
    id: 3,
    customerName: "Grace Adamu",
    rating: 4,
    comment: "Very satisfied with the consultation. Professional service.",
    date: "2 weeks ago",
  },
];

export const recentInquiries = [
  {
    id: 1,
    customerName: "John Doe",
    service: "Living Room Design",
    message: "I need help designing my new apartment living room...",
    date: "1 hour ago",
    status: "new",
  },
  {
    id: 2,
    customerName: "Mary Smith",
    service: "Event Decoration",
    message: "Looking for birthday party decoration services...",
    date: "3 hours ago",
    status: "replied",
  },
  {
    id: 3,
    customerName: "David Wilson",
    service: "Office Interior",
    message: "Need consultation for office space renovation...",
    date: "1 day ago",
    status: "new",
  },
];
