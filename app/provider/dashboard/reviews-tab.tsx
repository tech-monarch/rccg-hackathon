"use client";

import { useState } from "react";
import { Star, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { providersApi } from "@/lib/api";
import { toast } from "sonner";

interface ReviewsTabProps {
  reviews: any[];
  onUpdated: () => void;
}

export default function ReviewsTab({ reviews, onUpdated }: ReviewsTabProps) {
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const handleReply = async (reviewId: string) => {
    const reply = replyTexts[reviewId]?.trim();
    if (!reply) return;
    setSubmitting(reviewId);
    const res = await providersApi.replyToReview(reviewId, reply);
    if (res.success) {
      toast.success("Reply posted!");
      setReplyTexts((prev) => { const n = { ...prev }; delete n[reviewId]; return n; });
      onUpdated();
    } else {
      toast.error(res.message || "Failed to post reply");
    }
    setSubmitting(null);
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Star className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">No reviews yet</h3>
        <p className="text-slate-500 text-sm">Customer reviews will appear here after they complete a service.</p>
      </div>
    );
  }

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0";

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-slate-900">{avgRating}</p>
          <div className="flex items-center gap-0.5 justify-center mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-4 w-4 ${s <= Math.round(parseFloat(avgRating)) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-3">{star}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                  <div className="h-1.5 bg-amber-400 rounded-full" style={{ width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : "0%" }} />
                </div>
                <span className="text-xs text-slate-400 w-4">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {reviews.map((review: any) => (
        <div key={review.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-slate-900 text-sm">{review.customer?.fullName || "Anonymous"}</p>
              <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-4 w-4 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
          </div>

          {review.comment && <p className="text-slate-600 text-sm">{review.comment}</p>}

          {review.providerReply ? (
            <div className="mt-3 pl-3 border-l-2 border-blue-200 bg-blue-50/50 rounded-r-lg p-2">
              <p className="text-xs font-medium text-blue-600 mb-0.5">Your response:</p>
              <p className="text-xs text-slate-700">{review.providerReply}</p>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a response to this review..."
                value={replyTexts[review.id] || ""}
                onChange={(e) => setReplyTexts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                rows={2}
                className="rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none text-sm"
              />
              <Button
                size="sm"
                onClick={() => handleReply(review.id)}
                disabled={submitting === review.id || !replyTexts[review.id]?.trim()}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                {submitting === review.id ? <><Loader2 className="mr-1.5 h-3 w-3 animate-spin" />Posting...</> : <><MessageSquare className="mr-1.5 h-3 w-3" />Reply</>}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
