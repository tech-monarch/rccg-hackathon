"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProviderCard from "@/components/design/provider-card";
import { dummyProviders } from "@/types/providers";

export default function ProvidersSection() {
  // Show first 3 providers as featured on the home page
  const featuredProviders = dummyProviders.slice(0, 3);

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
              Trusted by clients in your local area
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
            <ProviderCard key={provider.id} provider={provider} />
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
