"use client";

import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Provider } from "@/types/providers";

type ProviderCardProps = {
  provider: Provider;
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const handleChatClick = () => {
    const message = `Hi! I'm interested in your ${provider.category} services. Can you provide more information?`;
    window.open(
      `https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const name = provider.businessName || provider.ownerName || "Service Provider";
  const image = provider.portfolioImages?.[0]?.imageUrl || "/placeholder.jpg";

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group flex flex-col h-full">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Provider info row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {name}
            </p>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 truncate max-w-full">
              {provider.category}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-3 line-clamp-2 min-h-[40px] flex-grow">
          {provider.description}
        </p>

        {/* Location + Availability */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 flex-shrink-0">
          <span className="flex items-center gap-1 truncate">
            <MapPin size={12} className="flex-shrink-0" />
            {provider.location}
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <Clock size={12} />
            Available
          </span>
        </div>

        {/* Footer: rating + action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto flex-shrink-0">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
            <span className="text-sm font-bold text-slate-900">
              {provider.avgRating}
            </span>
            <span className="text-xs text-slate-400">
              ({provider.totalReviews})
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleChatClick}
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
  );
}
