import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import Navbar from "@/components/layout/navbar";
import { Suspense } from "react";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "HAVEN",
  description:
    "Created by Haven, this marketplace connects you with top service providers in Nigeria for all your home and business needs.",
  generator: "Haven Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <div className="min-h-screen flex flex-col bg-background">
          <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
