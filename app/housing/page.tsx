"use client";

import { useState, useEffect, useCallback } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProviderCard from "@/components/design/provider-card";
import { housingApi } from "@/lib/api";

const categories = ["Hostel", "Lodge", "Apartment", "Squat"];
const locations = ["Abuja Campus","Delta Campus","Choba Campus","Alakiah","Choba","Ozuoba","Aluu","Lagos","Port Harcourt","Ibadan"];

function FilterSidebar({ selectedCategories, handleCategoryChange, selectedLocations, handleLocationChange, minRating, setMinRating }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((c) => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox id={c} checked={selectedCategories.includes(c)} onCheckedChange={(ch) => handleCategoryChange(c, ch as boolean)} />
              <label htmlFor={c} className="text-sm cursor-pointer">{c}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <div className="space-y-2">
          {locations.map((l) => (
            <div key={l} className="flex items-center space-x-2">
              <Checkbox id={l} checked={selectedLocations.includes(l)} onCheckedChange={(ch) => handleLocationChange(l, ch as boolean)} />
              <label htmlFor={l} className="text-sm cursor-pointer">{l}</label>
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

export default function HousingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get("search") || "";

  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [minRating, setMinRating] = useState(0);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    const params: any = { sort: sortBy, limit: 50 };
    if (searchTerm) params.search = searchTerm;
    if (selectedCategories.length === 1) params.category = selectedCategories[0].toUpperCase();
    if (selectedLocations.length === 1) params.location = selectedLocations[0];
    if (minRating > 0) params.minRating = minRating;
    const res = await housingApi.list(params);
    if (res.success) setListings(res.data);
    setIsLoading(false);
  }, [searchTerm, selectedCategories, selectedLocations, sortBy, minRating]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const mapped = listings.map((l: any) => ({
    id: l.id,
    name: l.title,
    category: l.category.charAt(0) + l.category.slice(1).toLowerCase(),
    rating: parseFloat(l.avgRating) || 0,
    reviews: l.totalReviews || 0,
    location: l.location,
    phone: l.phone,
    image: l.imageUrl || "/placeholder.jpg",
    description: l.description,
  }));

  const filtered = mapped.filter((l) => {
    const matchesCat = selectedCategories.length === 0 || selectedCategories.some((c) => c.toLowerCase() === l.category.toLowerCase());
    const matchesLoc = selectedLocations.length === 0 || selectedLocations.some((loc) => l.location.toLowerCase().includes(loc.toLowerCase()));
    return matchesCat && matchesLoc;
  });

  const handleCategoryChange = (c: string, ch: boolean) =>
    setSelectedCategories((prev) => ch ? [...prev, c] : prev.filter((x) => x !== c));
  const handleLocationChange = (l: string, ch: boolean) =>
    setSelectedLocations((prev) => ch ? [...prev, l] : prev.filter((x) => x !== l));
  const filterProps = { selectedCategories, handleCategoryChange, selectedLocations, handleLocationChange, minRating, setMinRating };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Housing Listings</h1>
              <p className="text-sm text-slate-500 mt-1">Find available hostel space, lodge, apartment, or squat options</p>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
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
          <div className="text-sm text-muted-foreground">{isLoading ? "Loading..." : `Showing ${filtered.length} housings`}</div>
        </div>

        <div className="flex gap-8">
          <div className="hidden md:block w-64 shrink-0 sticky top-28 self-start">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Filter className="h-4 w-4 text-blue-600" />Filters</h2>
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
                {filtered.map((l) => <ProviderCard key={l.id} provider={l as any} />)}
              </div>
            )}
            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No housings found matching your criteria.</p>
                <Button variant="outline" onClick={() => { router.push(pathname); setSelectedCategories([]); setSelectedLocations([]); setMinRating(0); }}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
