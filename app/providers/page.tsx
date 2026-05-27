"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Phone,
  Mail,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WhatsAppButton } from "@/components/whatsapp-button";

const categories = [
  "Academic Support",
  "Digital Services",
  "Home Services",
  "Cooking Services",
  "Laundry Services",
  "Home Cleaning Services",
  "Hair Styling Services",
  "Farming Services",
];

const locations = [
  "Abuja Campus",
  "Delta Campus",
  "Choba Campus",
  "Alakiah",
  "Choba",
  "Ozuoba",
  "Aluu",
];

const allProviders = [
  {
    id: 1,
    name: "Miriam Amaka",
    category: "Cooking Services",
    rating: 4.8,
    reviews: 124,
    location: "Girl's hostel",
    Address: "123 Clean St, Port Harcourt",
    phone: "+234 801 234 5678",
    email: "info@`miriamamakka`.com",
    image:
      "https://i.pinimg.com/736x/e3/dd/b0/e3ddb011e1f98a32f6c1c9f5c03ee515.jpg",
    description: "I sha sabi cook, just dm me make i come cook for u",
  },
  {
    id: 2,
    name: "Okon Paul",
    category: "Digital Services",
    rating: 4.9,
    reviews: 89,
    location: "Mandela Hostel",
    Address: "456 Paint Ave, Port Harcourt",
    phone: "+234 802 345 6789",
    email: "contact@paulokon.com",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.QmuHVhXyHhi4O-V2thkdxgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey repair phones, if you wan sell, swap, or even buy and fix i active",
  },
  {
    id: 3,
    name: "Ebuka Callistus",
    category: "Laundry Services",
    rating: 4.7,
    reviews: 156,
    location: "Boy's Hostel",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanebusy.com",
    image:
      "https://counseal.com/app/uploads/2023/11/website-featured-An-Image-depicting-a-laundry-business.jpg",
    description:
      "Professional laundry and dry cleaning services for all occasions",
  },
  {
    id: 4,
    name: "Precious",
    category: "Home Services",
    rating: 4.7,
    reviews: 156,
    location: "Girls Hostel",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanebusy.com",
    image:
      "https://www.nairaland.com/attachments/16999586_65cbc4a992571d113f3191438519ee0b_jpegc39fd5f4173ad02124a0d436cdf441e4",
    description:
      "I can help you with your home services😏",
  },
  {
    id: 5,
    name: "Ekene",
    category: "Farming Services",
    rating: 4.7,
    reviews: 156,
    location: "Delta",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrfarmboy.com",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.SYK5-rGj7lpAa0-HrJqxhQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey cut grass",
  },
];

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [minRating, setMinRating] = useState(0);

  const filteredProviders = allProviders
    .filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(provider.category);
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(provider.location);
      const matchesRating = provider.rating >= minRating;

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesRating
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={location}
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) =>
                  handleLocationChange(location, checked as boolean)
                }
              />
              <label htmlFor={location} className="text-sm cursor-pointer">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <Select
          value={minRating.toString()}
          onValueChange={(value) => setMinRating(Number(value))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any Rating</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="text-xl font-bold text-blue-600">UniHub</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/providers" className="text-foreground font-medium">
                Find Providers
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Categories
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/housing"
                className="text-muted-foreground hover:text-foreground"
              >
                Find Housing
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/provider/login">
                <Button variant="outline">Provider Login</Button>
              </Link>
              <Link href="/provider/register">
                <Button>Join as Provider</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search providers, services, or locations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:hidden bg-transparent"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredProviders.length} providers
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <Card className="p-6 sticky top-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-600" />
                Filters
              </h2>
              <FilterContent />
            </Card>
          </div>

          {/* Providers Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {provider.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({provider.reviews})
                        </span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="mb-3">
                      {provider.category}
                    </Badge>

                    <p className="text-sm text-muted-foreground mb-4">
                      {provider.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <WhatsAppButton
                          phoneNumber={provider.phone}
                          message={`Hi! I'm interested in your ${provider.category} services. Can you provide more information?`}
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto font-normal text-sm hover:text-blue-600"
                          showIcon={false}
                        >
                          {provider.phone}
                        </WhatsAppButton>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{provider.email}</span>
                      </div>
                    </div>

                    <Link
                      href={`/provider/${provider.id}`}
                      className="block mt-4"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No providers found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategories([]);
                    setSelectedLocations([]);
                    setMinRating(0);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
