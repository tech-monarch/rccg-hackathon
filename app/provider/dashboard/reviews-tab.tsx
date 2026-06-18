"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageCircle, Clock } from "lucide-react";

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsTabProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
}

export default function ReviewsTab({ reviews, totalReviews, averageRating }: ReviewsTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-6 px-8 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Customer Reviews</CardTitle>
            <p className="text-sm text-slate-500 mt-1">See what clients are saying about your services.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <div className="text-center">
              <span className="text-2xl font-bold text-slate-900">{averageRating.toFixed(1)}</span>
              <span className="text-sm text-slate-500 ml-1">/ 5</span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-100 text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs font-medium text-slate-500 text-center">Based on {totalReviews} reviews</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <div key={review.id} className="p-8 hover:bg-slate-50/30 transition-colors">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 font-bold">
                        {review.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">
                          {review.customerName}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-slate-100 text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center text-sm font-medium text-slate-500">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {review.date}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 relative">
                      <MessageCircle className="absolute top-4 right-4 h-5 w-5 text-slate-200" />
                      <p className="text-slate-700 leading-relaxed italic pr-8">
                        "{review.comment}"
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Respond to Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {reviews.length === 0 && (
            <div className="p-16 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No Reviews Yet</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Once you complete services, your customer reviews will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
