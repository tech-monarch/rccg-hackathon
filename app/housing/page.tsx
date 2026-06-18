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
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
import ProviderCard from "@/components/design/provider-card";

const categories = ["Hostel", "Lodge", "Apartment", "Squat"];

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
    description:
      "Erm, I'm selling my space in mandela(i dey fear cultist) hmu for more details",
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
      "Erm, I'm selling my space in mandela(Omoor the struggles) hmu for more details",
  },
  {
    id: 3,
    name: "Omega Lodge, 2 bedrooms",
    category: "Lodge",
    rating: 4.7,
    reviews: 156,
    location: "back of chem",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanlaundry.com",
    image:
      "https://www.nairaland.com/attachments/15200557_img20210824wa0010_jpeg6431f2dbe7347507d9a55c8d67709725",
    description: "Space at Omega Lodge available.. For the ladies only😏",
  },
];

function FilterSidebar({
  selectedCategories,
  handleCategoryChange,
  selectedLocations,
  handleLocationChange,
  minRating,
  setMinRating,
}: {
  selectedCategories: string[];
  handleCategoryChange: (category: string, checked: boolean) => void;
  selectedLocations: string[];
  handleLocationChange: (location: string, checked: boolean) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
}) {
  return (
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
}

export default function ProvidersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get("search") || "";

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

  const filterProps = {
    selectedCategories,
    handleCategoryChange,
    selectedLocations,
    handleLocationChange,
    minRating,
    setMinRating,
  };

  return (
    <div className="bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Housing Listings</h1>
              <p className="text-sm text-slate-500 mt-1">
                Find available hostel space, lodge, apartment, or squat options
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white">
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
                    className="md:hidden bg-white"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar {...filterProps} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Search Term indicator */}
          {searchTerm && (
            <div className="flex items-center gap-2 mb-4 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm w-fit border border-blue-100">
              <span>Search results for: <strong>"{searchTerm}"</strong></span>
              <button 
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.delete("search");
                  router.push(`${pathname}?${params.toString()}`);
                }} 
                className="hover:text-blue-900 transition-colors font-bold ml-1 text-lg leading-none"
                title="Clear search"
              >
                &times;
              </button>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Showing {filteredProviders.length} housings
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 shrink-0 sticky top-28 self-start">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-600" />
                Filters
              </h2>
              <FilterSidebar {...filterProps} />
            </div>
          </div>

          {/* Providers Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider as any} />
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No housings found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push(pathname);
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
