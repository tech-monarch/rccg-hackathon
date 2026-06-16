"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { paths } from "@/utils/paths";

const popularTags = [
  { label: "Cleaning", href: "/providers?cat=cleaning" },
  { label: "Phone Repair", href: "/providers?cat=repairs" },
  { label: "Laundry", href: "/providers?cat=laundry" },
  { label: "Tutoring", href: "/providers?cat=tutoring" },
  { label: "Housing", href: "/housing" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[580px] flex items-center overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-[3.25rem] font-bold text-white mb-6 leading-[1.15]">
            Find trusted help,{" "}
            <span className="font-light italic">right on campus</span>
          </h1>

          {/* Search bar — Fiverr style */}
          <div className="flex items-center mb-6 max-w-xl">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="What service are you looking for today?"
                className="w-full pl-5 pr-4 py-4 text-base rounded-l-md border-0 focus:outline-none focus:ring-0 bg-white text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <Link href={paths.providers}>
              <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors flex items-center gap-2 font-semibold">
                <Search size={18} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </Link>
          </div>

          {/* Popular tags — Fiverr style */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white/70 text-sm font-medium">Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="px-3 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white hover:text-slate-900 transition-all"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
