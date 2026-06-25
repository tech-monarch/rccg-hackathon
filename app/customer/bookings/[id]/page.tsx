"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CustomerAuthGuard } from "@/components/customer-auth-guard";
import { mockDb, MockBooking } from "@/utils/mockDb";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  MessageSquare,
  Gift,
  HelpCircle,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.id as string;
  
  const [booking, setBooking] = useState<MockBooking | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  
  useEffect(() => {
    if (!bookingId) return;
    const bookings = mockDb.getBookings();
    const found = bookings.find(b => b.id === bookingId);
    if (found) {
      setBooking(found);
      const [d, t] = found.scheduledAt.split("T");
      setNewDate(d || "");
      setNewTime(t ? t.slice(0, 5) : "");
    }
  }, [bookingId]);

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;
    
    if (!newDate || !newTime) {
      toast.error("Please select both a date and a time.");
      return;
    }

    const updatedDateTime = `${newDate}T${newTime}:00Z`;
    
    const bookings = mockDb.getBookings();
    const updated = bookings.map(b => {
      if (b.id === booking.id) {
        return { ...b, scheduledAt: updatedDateTime };
      }
      return b;
    });

    mockDb.setBookings(updated);
    setBooking({ ...booking, scheduledAt: updatedDateTime });
    setIsRescheduling(false);
    toast.success("Service request time adjusted successfully!");
  };

  if (!booking) {
    return (
      <CustomerAuthGuard>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-sm w-full">
            <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Booking not found</h3>
            <p className="text-slate-500 text-sm mb-6">The booking you are looking for does not exist or has been removed.</p>
            <Link href="/customer/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </CustomerAuthGuard>
    );
  }

  const statusConfig = {
    COMPLETED: { label: "Completed", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
    PAID: { label: "Confirmed (Paid)", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
    IN_PROGRESS: { label: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
    PENDING_PAYMENT: { label: "Pending Payment", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
    CANCELLED: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  };

  const status = statusConfig[booking.status] || statusConfig.PENDING_PAYMENT;
  const StatusIcon = status.icon;
  const showRescheduleOption = booking.status !== "COMPLETED" && booking.status !== "CANCELLED";

  return (
    <CustomerAuthGuard>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Back Navigation */}
          <Link href="/customer/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 group transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>

          {/* Booking Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            {/* Header info */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Booking ID: {booking.id}</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{booking.providerName}</h2>
                <p className="text-slate-500 text-sm">{booking.category}</p>
              </div>
              <Badge variant="outline" className={`text-xs px-3 py-1 font-semibold rounded-lg ${status.color}`}>
                <StatusIcon className="h-3.5 w-3.5 mr-1" />
                {status.label}
              </Badge>
            </div>

            {/* Service details */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Service Request Details</h4>
                <p className="text-slate-800 font-medium text-sm leading-relaxed">{booking.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Scheduled Date</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {new Date(booking.scheduledAt).toLocaleDateString("en-NG", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Scheduled Time</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {new Date(booking.scheduledAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Location Address</p>
                    <p className="text-sm font-semibold text-slate-800 truncate max-w-[220px]" title={booking.address}>{booking.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Total Paid Amount</p>
                    <p className="text-sm font-bold text-slate-900">₦{Number(booking.amount).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {booking.pointsAwarded > 0 && (
                <div className="bg-green-50/60 border border-green-100 rounded-xl p-4 flex items-center gap-3 mt-4">
                  <Gift className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-green-700 font-semibold">Rewards Claimed</p>
                    <p className="text-xs text-green-600">You earned <strong>+{booking.pointsAwarded} points</strong> from this completed service booking.</p>
                  </div>
                </div>
              )}

              {booking.review && (
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your Review</h4>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-3.5 w-3.5 ${s <= booking.review!.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    {booking.review.comment && <p className="text-xs text-slate-600 italic mt-1">"{booking.review.comment}"</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Adjust Time / Rescheduling Form */}
          {showRescheduleOption && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              {!isRescheduling ? (
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Need to adjust the booking schedule?</h3>
                    <p className="text-slate-500 text-xs mt-0.5">You can change the preferred date and time for this service booking.</p>
                  </div>
                  <Button 
                    onClick={() => setIsRescheduling(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 text-xs font-semibold"
                  >
                    Adjust Time / Reschedule
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleReschedule} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm">Reschedule Booking</h3>
                    <Button 
                      type="button" 
                      onClick={() => setIsRescheduling(false)}
                      variant="ghost" 
                      className="text-slate-400 hover:text-slate-600 text-xs px-2 h-7"
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rescheduleDate" className="text-xs text-slate-600">Select New Date</Label>
                      <Input 
                        id="rescheduleDate" 
                        type="date" 
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)}
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white text-sm"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rescheduleTime" className="text-xs text-slate-600">Select New Time</Label>
                      <Input 
                        id="rescheduleTime" 
                        type="time" 
                        value={newTime} 
                        onChange={(e) => setNewTime(e.target.value)}
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <Button 
                      type="button" 
                      onClick={() => setIsRescheduling(false)}
                      variant="outline" 
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-4 text-xs h-10"
                    >
                      Keep Current
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 text-xs font-semibold h-10 shadow-md shadow-blue-100"
                    >
                      Confirm Schedule Update
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Rate Experience / Drop Review */}
          {booking.status === "COMPLETED" && !booking.review && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">How was your service?</h3>
                <p className="text-slate-500 text-xs mt-0.5">Please rate your experience with {booking.providerName} to help others.</p>
              </div>
              <Link href={`/customer/bookings/${booking.id}/review`}>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 text-xs font-semibold h-10 flex items-center gap-2">
                  <MessageSquare className="h-4.5 w-4.5" /> Drop Review
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </CustomerAuthGuard>
  );
}
