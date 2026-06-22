"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, Briefcase, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactActions } from "@/components/contact-actions";
import { providersApi } from "@/lib/api";

export default function ProviderProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const [provider, setProvider] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    providersApi.getById(id).then((res) => {
      if (res.success) setProvider(res.data);
      else setNotFound(true);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (notFound || !provider) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Provider not found</h2>
          <p className="text-slate-500 mb-4">This provider may have been removed or the link is invalid.</p>
          <Link href="/providers"><Button>Browse Providers</Button></Link>
        </div>
      </div>
    );
  }

  const avgRating = parseFloat(provider.avgRating) || 0;
  const portfolioImages: any[] = provider.portfolioImages || [];
  const reviews: any[] = provider.reviews || [];
  const services = provider.services ? provider.services.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/providers" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Providers
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl font-bold text-white">{provider.businessName?.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold text-slate-900">{provider.businessName}</h1>
                    {provider.isVerified && (
                      <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mt-0.5">{provider.ownerName}</p>
                  <div className="flex items-center flex-wrap gap-3 mt-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                      <Briefcase className="h-3 w-3 mr-1" />{provider.category}
                    </Badge>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <MapPin className="h-3 w-3" />{provider.location}
                    </span>
                    {provider.experience && (
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />{provider.experience}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {avgRating > 0 && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{avgRating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">({provider.totalReviews} reviews)</span>
                </div>
              )}
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-3">About</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{provider.description}</p>
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="font-bold text-slate-900 mb-3">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {services.map((service: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-slate-600 border-slate-200 text-xs py-1 px-3">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {portfolioImages.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="font-bold text-slate-900 mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {portfolioImages.map((img: any, i: number) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                      <img src={img.imageUrl} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="font-bold text-slate-900 mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div key={review.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-slate-900">{review.customer?.fullName || "Anonymous"}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                          ))}
                        </div>
                      </div>
                      {review.comment && <p className="text-slate-600 text-sm">{review.comment}</p>}
                      {review.providerReply && (
                        <div className="mt-2 pl-3 border-l-2 border-blue-200 text-xs text-slate-500">
                          <span className="font-medium text-blue-600">Provider: </span>{review.providerReply}
                        </div>
                      )}
                      <p className="text-xs text-slate-400 mt-1">{new Date(review.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Contact {provider.businessName}</h3>
              <ContactActions phone={provider.phone} email={provider.user?.email || ""} providerName={provider.businessName} category={provider.category} />
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link href="/customer/request-service">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Request a Quote</Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Profile views</span>
                  <span className="font-semibold text-slate-900">{provider.profileViews || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total reviews</span>
                  <span className="font-semibold text-slate-900">{provider.totalReviews || 0}</span>
                </div>
                {avgRating > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Avg rating</span>
                    <span className="font-semibold text-slate-900">{avgRating.toFixed(1)} / 5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
