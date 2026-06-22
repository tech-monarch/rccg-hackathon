"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { bookingsApi } from "@/lib/api";

export default function BookingConfirmPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get("bookingId");
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) { setError("No booking ID found."); setIsLoading(false); return; }
    const fetchBooking = async (retries = 3) => {
      const res = await bookingsApi.getById(bookingId);
      if (res.success) {
        if (res.data.status === "PENDING_PAYMENT" && retries > 0) {
          setTimeout(() => fetchBooking(retries - 1), 2000);
        } else {
          setBooking(res.data);
          setIsLoading(false);
        }
      } else {
        setError("Could not load booking details.");
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  const isPaid = booking?.status === "PAID" || booking?.status === "IN_PROGRESS" || booking?.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center shadow-sm">
        {error ? (
          <>
            <XCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-500 text-sm mb-6">{error}</p>
          </>
        ) : isPaid ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
            <p className="text-slate-500 text-sm mb-1">
              Your booking with <strong>{booking?.provider?.businessName}</strong> is confirmed.
            </p>
            <p className="text-slate-400 text-xs mb-6">
              Scheduled: {booking?.scheduledAt ? new Date(booking.scheduledAt).toLocaleString("en-NG") : "—"}
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Pending</h2>
            <p className="text-slate-500 text-sm mb-6">
              Your booking is being processed. You'll receive a confirmation once payment clears.
            </p>
          </>
        )}
        <Link href="/customer/dashboard">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
