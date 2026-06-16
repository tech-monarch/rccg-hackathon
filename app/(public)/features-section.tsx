"use client";

import {
  BadgeCheck,
  ShieldCheck,
  Home,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Vetted Providers",
    desc: "Every service provider is background-checked and verified to ensure high-quality, reliable service.",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50/80",
    borderColor: "border-blue-100/50",
    hoverBorder: "hover:border-blue-200 hover:shadow-blue-500/5",
  },
  {
    icon: ShieldCheck,
    title: "Secure Escrow",
    desc: "Your payments are held safely in escrow and only released once the job is completed to your satisfaction.",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50/80",
    borderColor: "border-emerald-100/50",
    hoverBorder: "hover:border-emerald-200 hover:shadow-emerald-500/5",
  },
  {
    icon: Home,
    title: "Verified Listings",
    desc: "All housing and service locations are physically verified to eliminate scam posts and rental fraud.",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50/80",
    borderColor: "border-amber-100/50",
    hoverBorder: "hover:border-amber-200 hover:shadow-amber-500/5",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Network",
    desc: "Transparent rating and review system backed by our community to guarantee accountability.",
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50/80",
    borderColor: "border-rose-100/50",
    hoverBorder: "hover:border-rose-200 hover:shadow-rose-500/5",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-slate-50/40 border-y border-slate-100/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group flex flex-col items-start p-6 bg-white rounded-2xl border border-slate-100/80 shadow-[0_2px_8px_rgba(15,23,42,0.01)] ${item.hoverBorder} hover:shadow-[0_16px_32px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1.5 tracking-tight group-hover:text-slate-950 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

