import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

export const metadata: Metadata = {
  title: "UniHub Marketplace",
  description:
    "Created by UniHub, this marketplace connects you with top service providers in Nigeria for all your home and business needs.",
  generator: "UniHub Team",
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
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
