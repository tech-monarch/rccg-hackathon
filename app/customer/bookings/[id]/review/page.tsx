"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CustomerAuthGuard } from "@/components/customer-auth-guard";
import { mockDb, MockBooking } from "@/utils/mockDb";
import { ArrowLeft, Star, MessageSquare, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";

export default function LeaveReviewPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.id as string;

  const [booking, setBooking] = useState<MockBooking | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    const bookings = mockDb.getBookings();
    const found = bookings.find(b => b.id === bookingId);
    if (found) {
      if (found.status !== "COMPLETED") {
        toast.error("You can only review completed services.");
        router.push("/customer/dashboard");
        return;
      }
      setBooking(found);
    }
  }, [bookingId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(r => setTimeout(r, 800));

    const reviewData = {
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    // Update Bookings in mock database
    const bookings = mockDb.getBookings();
    const updatedBookings = bookings.map(b => {
      if (b.id === booking.id) {
        return { ...b, review: reviewData };
      }
      return b;
    });
    mockDb.setBookings(updatedBookings);

    // Update Provider's review rating and count in mock database
    const providers = mockDb.getProviders();
    const updatedProviders = providers.map(p => {
      if (p.id === booking.providerId) {
        const total = p.totalReviews + 1;
        const avg = ((p.avgRating * p.totalReviews) + rating) / total;
        return {
          ...p,
          totalReviews: total,
          avgRating: Number(avg.toFixed(2))
        };
      }
      return p;
    });
    mockDb.setProviders(updatedProviders);

    toast.success("Review submitted! Thank you for your feedback.");
    setIsSubmitting(false);
    router.push("/customer/dashboard");
  };

  if (!booking) {
    return (
      <CustomerAuthGuard>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900" />
        </div>
      </CustomerAuthGuard>
    );
  }

  return (
    <CustomerAuthGuard>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Back Navigation */}
          <Link href="/customer/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 group transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Share Your Experience</h2>
              <p className="text-slate-500 text-sm mt-1">Review your service with <strong>{booking.providerName}</strong></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star rating selector */}
              <div className="space-y-2 text-center">
                <Label className="text-sm font-semibold text-slate-700 block mb-1">How would you rate their work?</Label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform active:scale-95"
                    >
                      <Star 
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200 hover:text-amber-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-xs font-semibold text-amber-600 mt-1">
                    {rating === 1 && "Poor 😞"}
                    {rating === 2 && "Fair 😐"}
                    {rating === 3 && "Good 🙂"}
                    {rating === 4 && "Very Good 😊"}
                    {rating === 5 && "Excellent! 😄"}
                  </p>
                )}
              </div>

              {/* Review Text comment */}
              <div className="space-y-2">
                <Label htmlFor="reviewComment" className="text-sm font-semibold text-slate-700">Write a Comment (Optional)</Label>
                <Textarea
                  id="reviewComment"
                  placeholder="Describe the quality of the service, punctuality, and overall experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none text-sm leading-relaxed p-4"
                />
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-500">
                <ShieldCheck className="h-4.5 w-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Your feedback is public and helps students and campus community members choose trusted service providers.</p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <Link href="/customer/dashboard" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl h-12 text-sm font-semibold"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-sm font-semibold shadow-lg shadow-blue-100 flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CustomerAuthGuard>
  );
}
