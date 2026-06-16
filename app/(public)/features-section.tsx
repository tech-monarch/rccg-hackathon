"use client";

import {
  UserCheck,
  Lock,
  HousePlus,
  HandHeart,
} from "lucide-react";

const features = [
  {
    icon: <UserCheck className="w-8 h-8 text-slate-700" strokeWidth={1.5} />,
    title: "Community Verified",
    desc: "Vouched for by your community. Not an algorithm.",
  },
  {
    icon: <Lock className="w-8 h-8 text-slate-700" strokeWidth={1.5} />,
    title: "Escrow Protected",
    desc: "Your money stays locked until the job is done right.",
  },
  {
    icon: <HousePlus className="w-8 h-8 text-slate-700" strokeWidth={1.5} />,
    title: "Verified Housing",
    desc: "Real listings. Real location. No agent stress.",
  },
  {
    icon: <HandHeart className="w-8 h-8 text-slate-700" strokeWidth={1.5} />,
    title: "Community Backed",
    desc: "Cheat someone here, you lose more than an account.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        {/* Fiverr-style: single row of trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {features.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-3"
            >
              <div className="text-slate-700">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
