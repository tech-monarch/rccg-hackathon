"use client";

import {
  Search,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Shield,
  Bot,
  MessageSquare,
  Zap,
  CheckCheck,
  Rocket,
  BadgeCheck,
  ShieldCheck,
  MessageCircle,
  Menu,
  X,
  Tag,
  Home,
  LayoutDashboard,
  Info,
  UserPlus,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { paths } from "../utils/paths";

function WhatsAppBotButton({
  variant = "default",
}: {
  variant?: "default" | "outline";
}) {
  const handleClick = () => {
    const phoneNumber = "2349017335663";
    const message =
      "Hello Haven Bot, I need help finding a service professional";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant === "outline" ? "outline" : "default"}
      className={`gap-2 ${
        variant === "outline"
          ? "border-blue-600 text-blue-700 hover:bg-green-50"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      <Bot className="w-4 h-4" />
      Haven Bot
    </Button>
  );
}

const featuredproviders = [
  {
    id: 1,
    name: "Adanna Cleaning Services",
    category: "I sabi clean",
    rating: 4.8,
    reviews: 124,
    location: "Girl's hostel",
    Address: "123 Clean St, Port Harcourt",
    phone: "+234 801 234 5678",
    email: "info@Adannacleaners.com",
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
    Address: "456 Paint Ave, Port Harcourt",
    phone: "+234 802 345 6789",
    email: "contact@perfectpaintpro.com",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.QmuHVhXyHhi4O-V2thkdxgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey repair phones, if you wan sell, swap, or even buy and fix i active",
  },
  {
    id: 3,
    name: "Ebuka Callistus",
    category: "Laundry & Dry Cleaning Services",
    rating: 4.7,
    reviews: 156,
    location: "Boy's Hostel",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanlaundry.com",
    image:
      "https://counseal.com/app/uploads/2023/11/website-featured-An-Image-depicting-a-laundry-business.jpg",
    description:
      "Professional laundry and dry cleaning services for all occasions",
  },
];

const featuredHouses = [
  {
    id: 1,
    name: " Space at Mandela's Hostel",
    category: "Hostel",
    rating: 4.8,
    reviews: 124,
    location: "inside abuja",
    Address: "123 Clean St, Port Harcourt",
    phone: "+234 801 234 5678",
    email: "info@Adannacleaners.com",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.5C-2MvJDL6hpK70AYjU9AwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "I sha sabi clean, just dm me make i come clean for u",
  },
  {
    id: 2,
    name: "Space at NDDC Hostel",
    category: "Hostel",
    rating: 4.9,
    reviews: 89,
    location: "inside abuja",
    Address: "456 Paint Ave, Port Harcourt",
    phone: "+234 802 345 6789",
    email: "contact@perfectpaintpro.com",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.Rq-EmqDibq1Pu21QhWLy4QHaFj?r=0&w=820&h=615&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey repair phones, if you wan sell, swap, or even buy and fix i active",
  },
  {
    id: 3,
    name: "Omega Lodge 2 bedrooms",
    category: "Lodge",
    rating: 4.7,
    reviews: 156,
    location: "back of chem",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanlaundry.com",
    image:
      "https://www.nairaland.com/attachments/15200557_img20210824wa0010_jpeg6431f2dbe7347507d9a55c8d67709725",
    description:
      "Professional laundry and dry cleaning services for all occasions",
  },
];

const sidebarSections = [
  {
    label: "Discover",
    links: [
      { href: "/providers", label: "Find Providers", icon: Search },
      { href: "/", label: "Categories", icon: Tag },
      { href: "/housing", label: "Find Housing", icon: Home },
    ],
  },
  {
    label: "My Account",
    links: [
      {
        href: "/customer/dashboard",
        label: "My Dashboard",
        icon: LayoutDashboard,
      },
      { href: "#", label: "My Bookings", icon: BookOpen },
    ],
  },
  {
    label: "Haven",
    links: [
      { href: "#", label: "How It Works", icon: Info },
      {
        href: "/auth/register?type=provider",
        label: "Join as Provider",
        icon: UserPlus,
      },
    ],
  },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Overlay ── */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <Link
            href={paths.home}
            className="flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HA</span>
            </div>
            <span className="text-xl font-bold text-blue-600">HAVEN</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {sidebarSections.map((section) => (
            <div key={section.label}>
              <p className="px-5 pt-4 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                {section.label}
              </p>
              {section.links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-600 transition-all"
                >
                  <Icon size={16} className="flex-shrink-0 text-slate-400" />
                  {label}
                </Link>
              ))}
            </div>
          ))}

          {/* WhatsApp Bot in sidebar */}
          <div className="px-5 pt-6">
            <button
              onClick={() => {
                setSidebarOpen(false);
                const phoneNumber = "2349017335663";
                const message =
                  "Hello Haven Bot, I need help finding a service professional";
                window.open(
                  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                  "_blank",
                );
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Bot size={16} className="flex-shrink-0" />
              Chat with Haven Bot
            </button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t flex flex-col gap-2">
          <Link href={paths.login} onClick={() => setSidebarOpen(false)}>
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link href={paths.register} onClick={() => setSidebarOpen(false)}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Create Account
            </Button>
          </Link>
        </div>
      </aside>

      {/* ── Sticky Header ── */}
      <header
        className={`border-b sticky top-0 z-30 transition-all duration-300 backdrop-blur-md ${
          scrolled ? "bg-white/95 py-2 shadow-md" : "bg-white/90 py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link
              href={paths.home}
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-sm">HA</span>
              </div>
              <span className="text-xl font-bold text-blue-600">HAVEN</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href={paths.providers}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Find Providers
              </Link>
              <Link
                href={paths.home}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Categories
              </Link>
              <Link
                href={paths.housing}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Find Housing
              </Link>
              <Link
                href={paths.customerdashboard}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                My Dashboard
              </Link>
              <WhatsAppBotButton variant="outline" />
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Login / Register — hidden on small screens */}
              <div className="hidden sm:flex items-center gap-1">
                <Link href={paths.login}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href={paths.register}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>

              {/* Join as Provider — hidden on very small screens */}
              <Link
                href="/auth/register?type=provider"
                className="hidden sm:block"
              >
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Join as provider
                </Button>
              </Link>

              {/* Hamburger — visible below md */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-blue-200">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-600">
                  Try Haven Bot
                </span>
                <Rocket className="w-4 h-4 text-red-500 fill-yellow-400" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Trust is the{" "}
                <span className="text-blue-600">Infrastructure</span>,
                <span className="inline-flex items-center">
                  Haven Builds it.
                  <Zap className="ml-2 w-8 h-8 text-yellow-500 fill-yellow-400" />
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                Nigeria runs on people who know people. Haven takes the trust
                already living inside your church, your cooperative, your
                community — and makes it digital, searchable, and secure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <WhatsAppBotButton />
                <Link href={paths.providers}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  {
                    icon: <BadgeCheck className="w-5 h-5 text-blue-600" />,
                    text: "Community Verified",
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
                    text: "Escrow Protected",
                  },
                  {
                    icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
                    text: "Works on WhatsApp",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {feature.icon}
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-blue-100">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/010/491/672/small_2x/row-of-group-five-african-college-students-spending-time-together-on-campus-at-university-yard-black-afro-friends-studying-education-theme-photo.jpg"
                  alt="Students"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-20 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-200 rounded-full opacity-20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Everything You Need Section ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-bounce">
              Why Haven Exists
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              You Don't Open Google. You Call{" "}
              <span className="text-blue-600">Someone</span> You Trust.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In Nigeria, trust isn't a feature — it's the whole system. Haven
              digitizes the referral networks already living inside your
              community, so finding reliable help is as easy as asking someone
              you know.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-green-600" />,
                bg: "from-green-100 to-green-200",
                title: " Find Verified Artisans",
                desc: "Vouched for by your community. Not an algorithm.",
              },
              {
                icon: <Search className="w-8 h-8 text-blue-600" />,
                bg: "from-blue-100 to-blue-200",
                title: "Escrow-Protected Payments",
                desc:"Your money stays locked until the job is done right.",
              },
              {
                icon: <MapPin className="w-8 h-8 text-purple-600" />,
                bg: "from-purple-100 to-purple-200",
                title: "Verified Housing",
                desc: "Real listings. Real location. No agent stress.",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-orange-600" />,
                bg: "from-orange-100 to-orange-200",
                title: "Community Backed Trust",
                desc: "Cheat someone here , you lose more than an account.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-2xl border border-blue-100">
              <Bot className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700 font-medium">
                Try our smart bot to get started instantly
              </span>
              <WhatsAppBotButton />
            </div>
          </div>
        </div>
      </section>

      <hr className="my-5 border-t border-gray-300" />

      {/* ── Providers Section ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-bounce">
              Top Rated
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Need a helping hand?</h2>
            <p className="text-muted-foreground">
              providers trusted by thousands of customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredproviders.map((provider, index) => (
              <div
                key={provider.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center gap-1 text-white">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {provider.rating}
                        </span>
                        <span className="text-sm text-white/80">
                          ({provider.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <Badge variant="secondary">{provider.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {provider.description}
                    </p>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Available today</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        onClick={() => {
                          const message = `Hi! I'm interested in your ${provider.category} services. Can you provide more information?`;
                          window.open(
                            `https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
                            "_blank",
                          );
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        Chat Now
                      </Button>
                      <Link
                        href={`/provider/${provider.id}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/providers">
              <Button variant="outline" size="lg">
                Browse All providers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <hr className="my-5 border-t border-gray-300" />

      {/* ── Houses Section ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-bounce">
              Top Rated
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Looking for where to stay?
            </h2>
            <p className="text-muted-foreground">
              providers trusted by thousands of customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHouses.map((house, index) => (
              <div
                key={house.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={house.image}
                      alt={house.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center gap-1 text-white">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {house.rating}
                        </span>
                        <span className="text-sm text-white/80">
                          ({house.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{house.name}</h3>
                      <Badge variant="secondary">{house.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {house.description}
                    </p>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{house.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Available today</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        onClick={() => {
                          const message = `Hi! I'm interested in your ${house.category} services. Can you provide more information?`;
                          window.open(
                            `https://wa.me/${house.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
                            "_blank",
                          );
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 w-full"
                        size="sm"
                      >
                        Chat Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/housing">
              <Button variant="outline" size="lg">
                Browse All Houses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Customer CTA Section ── */}
      <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-4">
              <Badge variant="outline" className="border-white text-white mb-2">
                For Customers
              </Badge>
              <h2 className="text-3xl font-bold">Create Your Account Today</h2>
              <p className="text-blue-100 max-w-md">
                Sign up to track your service history, save favorite providers,
                and get personalized recommendations.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 max-w-md w-full">
                <div className="space-y-4">
                  {[
                    "Track your service history",
                    "Save favorite service providers",
                    "Get personalized recommendations",
                    "Request services with one click",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <CheckCheck className="w-5 h-5" />
                      </div>
                      <p className="font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HA</span>
                </div>
                <span className="text-xl font-bold text-blue-600">HAVEN</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting Students with trusted service providers around them.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/providers"
                    className="hover:text-foreground transition-colors"
                  >
                    Find providers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For providers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/auth/register?type=provider"
                    className="hover:text-foreground transition-colors"
                  >
                    Join Haven
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login?type=provider"
                    className="hover:text-foreground transition-colors"
                  >
                    provider Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/provider-benefits"
                    className="hover:text-foreground transition-colors"
                  >
                    Benefits
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
