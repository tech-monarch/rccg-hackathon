"use client";

import { useState, useEffect, useCallback } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProviderCard from "@/components/design/provider-card";
import { providersApi } from "@/lib/api";

const categories = ["Academic Support","Digital Services","Home Services","Cooking Services","Laundry Services","Home Cleaning Services","Hair Styling Services","Farming Services"];
const locations = ["Lagos","Abuja","Port Harcourt","Ibadan","Enugu","Kano","Kaduna","Benin City","Jos","Ilorin"];

function FilterSidebar({ selectedCategories, handleCategoryChange, selectedLocations, handleLocationChange, minRating, setMinRating }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} checked={selectedCategories.includes(category)} onCheckedChange={(c) => handleCategoryChange(category, c as boolean)} />
              <label htmlFor={category} className="text-sm cursor-pointer">{category}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox id={location} checked={selectedLocations.includes(location)} onCheckedChange={(c) => handleLocationChange(location, c as boolean)} />
              <label htmlFor={location} className="text-sm cursor-pointer">{location}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
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

  const [providers, setProviders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [minRating, setMinRating] = useState(0);

  // Handle cat URL param
  useEffect(() => {
    const catParam = searchParams?.get("cat");
    if (catParam) {
      const matched = categories.filter((c) => {
        if (catParam === "cleaning") return c.toLowerCase().includes("cleaning");
        if (catParam === "laundry") return c.toLowerCase().includes("laundry");
        if (catParam === "tutoring") return c.toLowerCase().includes("academic");
        if (catParam === "food") return c.toLowerCase().includes("cook");
        if (catParam === "tech") return c.toLowerCase().includes("digital");
        if (catParam === "repairs") return c.toLowerCase().includes("home");
        return c.toLowerCase().includes(catParam.toLowerCase());
      });
      setSelectedCategories(matched.length > 0 ? matched : []);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    const params: any = { sort: sortBy, limit: 50 };
    if (searchTerm) params.search = searchTerm;
    if (selectedCategories.length === 1) params.category = selectedCategories[0];
    if (selectedLocations.length === 1) params.location = selectedLocations[0];
    if (minRating > 0) params.minRating = minRating;
    const res = await providersApi.list(params);
    if (res.success) {
      setProviders(res.data);
      setTotal(res.meta?.total ?? res.data.length);
    }
    setIsLoading(false);
  }, [searchTerm, selectedCategories, selectedLocations, sortBy, minRating]);

  useEffect(() => { fetchProviders(); }, [fetchProviders]);

  const mapped = providers.map((p: any) => ({
    id: p.id,
    name: p.businessName,
    category: p.category,
    rating: parseFloat(p.avgRating) || 0,
    reviews: p.totalReviews || 0,
    location: p.location,
    phone: p.phone,
    image: p.portfolioImages?.[0]?.imageUrl || "/placeholder.jpg",
    description: p.description,
  }));

  // Client-side multi-filter (when multiple cats/locs selected)
  const filtered = mapped.filter((p) => {
    const matchesCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesLoc = selectedLocations.length === 0 || selectedLocations.some((l) => p.location.toLowerCase().includes(l.toLowerCase()));
    return matchesCat && matchesLoc;
  });

  const handleCategoryChange = (c: string, checked: boolean) =>
    setSelectedCategories((prev) => checked ? [...prev, c] : prev.filter((x) => x !== c));
  const handleLocationChange = (l: string, checked: boolean) =>
    setSelectedLocations((prev) => checked ? [...prev, l] : prev.filter((x) => x !== l));

  const filterProps = { selectedCategories, handleCategoryChange, selectedLocations, handleLocationChange, minRating, setMinRating };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Service Directory</h1>
              <p className="text-sm text-slate-500 mt-1">Find vetted and reliable service providers near you</p>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden bg-white"><SlidersHorizontal className="h-4 w-4 mr-2" />Filters</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                  <div className="mt-6"><FilterSidebar {...filterProps} /></div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {searchTerm && (
            <div className="flex items-center gap-2 mb-4 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm w-fit border border-blue-100">
              <span>Search results for: <strong>"{searchTerm}"</strong></span>
              <button onClick={() => { const p = new URLSearchParams(window.location.search); p.delete("search"); router.push(`${pathname}?${p.toString()}`); }} className="hover:text-blue-900 transition-colors font-bold ml-1 text-lg leading-none">&times;</button>
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${filtered.length} providers`}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden md:block w-64 shrink-0 sticky top-28 self-start">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
              <h2 className="font-semibold mb-4 flex items-center gap-2 text-slate-900">
                <Filter className="h-4 w-4 text-blue-600" />Filters
              </h2>
              <FilterSidebar {...filterProps} />
            </div>
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-slate-100 rounded-lg animate-pulse" />)}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((provider) => <ProviderCard key={provider.id} provider={provider} />)}
              </div>
            )}
            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No providers found matching your criteria.</p>
                <Button variant="outline" onClick={() => { router.push(pathname); setSelectedCategories([]); setSelectedLocations([]); setMinRating(0); }}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
