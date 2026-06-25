"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProviderCard from "@/components/design/provider-card";
import { providersApi } from "@/lib/api";

export default function ProvidersSection() {
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    providersApi.list({ limit: 3, sort: "rating" }).then((res) => {
      if (res.success) setProviders(res.data);
    });
  }, []);

  const mapped = providers.map((p: any) => ({
    id: p.id,
    businessName: p.businessName,
    ownerName: p.ownerName || "",
    phone: p.phone,
    category: p.category,
    location: p.location,
    description: p.description,
    isVerified: p.isVerified ?? false,
    isPublished: p.isPublished ?? true,
    avgRating: p.avgRating || 0,
    totalReviews: p.totalReviews || 0,
    profileViews: p.profileViews || 0,
    portfolioImages: p.portfolioImages || (p.image ? [{ imageUrl: p.image }] : []),
  }));

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Top-rated providers near you</h2>
            <p className="text-slate-500 mt-1 text-sm">Trusted by clients in your local area</p>
          </div>
          <Link href="/providers" className="hidden md:block">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-white">See all →</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mapped.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/providers">
            <Button variant="outline" className="border-slate-300">Browse All Providers</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
