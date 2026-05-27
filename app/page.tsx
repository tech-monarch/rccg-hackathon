"use client";

import {
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Shield,
  Bot,
  Sparkles,
  MessageSquare,
  Zap,
  Send,
  Calendar,
  CheckCheck,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

function WhatsAppBotButton({
  variant = "default",
}: {
  variant?: "default" | "outline";
}) {
  const handleClick = () => {
    const phoneNumber = "2349017335663";
    const message =
      "Hello UniHub Bot, I need help finding a service professional";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant === "outline" ? "outline" : "default"}
      className={`gap-2 ${
        variant === "outline"
          ? "border-green-600 text-green-700 hover:bg-green-50"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      <Bot className="w-4 h-4" />
      UniHub Bot
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

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header
        className={`border-b sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 py-2 shadow-sm" : "bg-white/90 py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="text-xl font-bold text-blue-600">UniHub</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/providers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Find providers
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              {/* <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link> */}
              <Link
                href="/housing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Find Housing
              </Link>
              <Link
                href="/customer/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                My Dashboard
              </Link>
              <WhatsAppBotButton variant="outline" />
            </nav>

            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2 mr-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="ghost" size="sm">
                    Create Account
                  </Button>
                </Link>
              </div>
              <Link href="/auth/register?type=provider">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Join as provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Column - Text Content */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-blue-200">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-600">
                    Try UniHub Bot
                  </span>
                  <Rocket className="w-4 h-4 text-red-500 fill-yellow-400" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Our Entire <span className="text-blue-600">Campus</span>,<br />
                <span className="inline-flex items-center">
                  in One Hub
                  <Zap className="ml-2 w-8 h-8 text-yellow-500 fill-yellow-400" />
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                UniHub brings together everything students need — from finding
                quick jobs and trusted housing to recovering lost items and
                staying updated on campus events.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <WhatsAppBotButton />
                <Link href="/providers">
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
                    icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
                    text: "Made for Students",
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-blue-600" />,
                    text: "Real-Time Alerts",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-blue-600" />,
                    text: "Safe and Verified",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {feature.icon}
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-blue-100">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/010/491/672/small_2x/row-of-group-five-african-college-students-spending-time-together-on-campus-at-university-yard-black-afro-friends-studying-education-theme-photo.jpg"
                  alt="Students"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-20 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-200 rounded-full opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wvwerything you need section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-bounce">
              Everything You Need
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              One App. Every <span className="text-blue-600">Student</span>{" "}
              Needs.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              UniHub is a centralized platform where students can access all
              essential services in one place. From earning extra income to
              finding secure housing, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Jobs */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Jobs</h3>
              <p className="text-gray-600 text-sm">
                Find and offer quick jobs for extra income. From tutoring to
                delivery services.
              </p>
            </div>

            {/* Lost & Found */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lost & Found</h3>
              <p className="text-gray-600 text-sm">
                Smart lost & found system to recover your belongings quickly and
                safely.
              </p>
            </div>

            {/* Verified Housing */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Housing</h3>
              <p className="text-gray-600 text-sm">
                Browse trusted hostels & lodges with verified prices and real
                locations.
              </p>
            </div>

            {/* Campus Alerts */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Campus Alerts</h3>
              <p className="text-gray-600 text-sm">
                Get real-time campus alerts for events, lectures, and important
                announcements.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12" style={{ marginTop: "4rem" }}>
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

      {/* Jobs Section */}
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
                            `https://wa.me/${provider.phone.replace(
                              /[^0-9]/g,
                              ""
                            )}?text=${encodeURIComponent(message)}`,
                            "_blank"
                          );
                        }}
                        className="flex-1b g-blue-600 hover:bg-blue-700
"
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

      {/* Houses Section */}
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
                            `https://wa.me/${provider.phone.replace(
                              /[^0-9]/g,
                              ""
                            )}?text=${encodeURIComponent(message)}`,
                            "_blank"
                          );
                        }}
                        className="flex-1b g-blue-600 hover:bg-blue-700 w-full
"
                        size="sm"
                      >
                        Chat Now
                      </Button>
                      {/* <Link href={`/provider/${provider.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </Link> */}
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

      {/* How It Works Section */}
      {/*<section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-bounce">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold mb-4">How does UniHub Work??</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your tasks done in just a few easy steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="opacity-0 animate-fade-in">
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <span className="text-2xl">1</span>
                  </div>
                  <CardTitle>Find Your Expert</CardTitle>
                  <CardDescription>
                    Browse verified professionals in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 bg-blue-50 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-16 h-16 text-blue-500 mb-2" />
                      <p className="text-sm text-blue-600 font-medium">Find local experts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <span className="text-2xl">2</span>
                  </div>
                  <CardTitle>Book & Confirm</CardTitle>
                  <CardDescription>
                    Schedule an appointment that works for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 bg-blue-50 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="w-16 h-16 text-blue-500 mb-2" />
                      <p className="text-sm text-blue-600 font-medium">Schedule your service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <span className="text-2xl">3</span>
                  </div>
                  <CardTitle>Get It Done</CardTitle>
                  <CardDescription>
                    Relax while your professional handles the job
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 bg-blue-50 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <CheckCheck className="w-16 h-16 text-blue-500 mb-2" />
                      <p className="text-sm text-blue-600 font-medium">Enjoy quality service</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Customer Sign Up CTA Section */}
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
                    className="border-white text-white-600 hover:bg-white-50"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 max-w-md w-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CheckCheck className="w-5 h-5" />
                    </div>
                    <p className="font-medium">Track your service history</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CheckCheck className="w-5 h-5" />
                    </div>
                    <p className="font-medium">
                      Save favorite service providers
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CheckCheck className="w-5 h-5" />
                    </div>
                    <p className="font-medium">
                      Get personalized recommendations
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CheckCheck className="w-5 h-5" />
                    </div>
                    <p className="font-medium">
                      Request services with one click
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {/* <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-bounce">
              Peace of Mind
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Why Choose UniHub</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We go the extra mile to ensure you get the best service experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="opacity-0 animate-fade-in">
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <CardTitle>Verified Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every provider on our platform undergoes strict verification and background checks.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <CardTitle>Quality Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We ensure high-quality work with our satisfaction guarantee policy.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-transform hover:-translate-y-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <CardTitle>On-Time Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professionals arrive on time or your service is free.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      {/*<section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of satisfied customers who found the perfect professional for their needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/providers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform">
                  Find a Professional
                </Button>
              </Link>
              <Link href="/auth/register?type=provider">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:scale-105 transition-transform">
                  Become a provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UH</span>
                </div>
                <span className="text-xl font-bold text-blue-600">UniHub</span>
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
                    Join UniHub
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
            <p>&copy; 2025 UniHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppBotButton />
      </div> */}
    </div>
  );
}
