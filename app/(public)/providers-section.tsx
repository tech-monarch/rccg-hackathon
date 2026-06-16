"use client";

import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredProviders = [
  {
    id: 1,
    name: "Adanna Cleaning Services",
    category: "I sabi clean",
    rating: 4.8,
    reviews: 124,
    location: "Girl's hostel",
    phone: "+234 801 234 5678",
    image:
      "https://i.pinimg.com/736x/e3/dd/b0/e3ddb011e1f98a32f6c1c9f5c03ee515.jpg",
    description: "I sha sabi clean, just dm me make i come clean for u",
  },
  {
    id: 2,
    name: "Okon Paul",
    category: "Phone repairer",
    rating: 4.9,
    reviews: 89,
    location: "Mandela Hostel",
    phone: "+234 802 345 6789",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.QmuHVhXyHhi4O-V2thkdxgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey repair phones, if you wan sell, swap, or even buy and fix i active",
  },
  {
    id: 3,
    name: "Ebuka Callistus",
    category: "Laundry & Dry Cleaning",
    rating: 4.7,
    reviews: 156,
    location: "Boy's Hostel",
    phone: "+234 803 456 7890",
    image:
      "https://counseal.com/app/uploads/2023/11/website-featured-An-Image-depicting-a-laundry-business.jpg",
    description:
      "Professional laundry and dry cleaning services for all occasions",
  },
];

export default function ProvidersSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Fiverr-style section header: left-aligned, bold */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Top-rated providers near you
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Trusted by students across campus
            </p>
          </div>
          <Link href="/providers" className="hidden md:block">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-white">
              See all →
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Provider info row */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {provider.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {provider.name}
                    </p>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {provider.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {provider.description}
                </p>

                {/* Location + Availability */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {provider.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Available
                  </span>
                </div>

                {/* Footer: rating + action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-900">
                      {provider.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({provider.reviews})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const message = `Hi! I'm interested in your ${provider.category} services. Can you provide more information?`;
                        window.open(
                          `https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
                          "_blank",
                        );
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs"
                      size="sm"
                    >
                      Chat
                    </Button>
                    <Link href={`/provider/${provider.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-200 h-8 px-3 text-xs"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/providers">
            <Button variant="outline" className="border-slate-300">
              Browse All Providers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
