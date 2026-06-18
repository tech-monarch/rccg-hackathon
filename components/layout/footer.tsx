"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerColumns = [
  {
    title: "For Users",
    links: [
      { href: "/providers", label: "Find Providers" },
      { href: "/", label: "Browse Categories" },
      { href: "/housing", label: "Find Housing" },
      { href: "/how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "For Providers",
    links: [
      { href: "/auth/register?type=provider", label: "Join Haven" },
      { href: "/auth/login?type=provider", label: "Provider Login" },
      { href: "/provider-benefits", label: "Benefits" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/help", label: "Help Center" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/auth") ||
    pathname?.includes("/login") ||
    pathname?.includes("/register");

  if (isAuthPage) return null;

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">
                haven<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting you with trusted local service providers around you.
            </p>
          </div>

          {/* Link cols */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 text-center text-xs text-slate-500">
          <p>&copy; 2026 Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
