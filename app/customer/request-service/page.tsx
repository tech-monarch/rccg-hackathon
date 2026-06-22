"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle, Upload, Star, ChevronRight, ChevronLeft, Loader2, X, MapPin, Calendar, Clock, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomerAuthGuard } from "@/components/customer-auth-guard";
import { serviceRequestsApi, bookingsApi } from "@/lib/api";
import { toast } from "sonner";

const categories = [
  "Academic Support","Digital Services","Home Services","Cooking Services",
  "Laundry Services","Home Cleaning Services","Hair Styling Services","Farming Services",
];

const steps = [
  { id: 1, label: "Service Details" },
  { id: 2, label: "Media Upload" },
  { id: 3, label: "Choose Provider" },
  { id: 4, label: "Confirm & Book" },
];

export default function RequestServicePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceRequestId, setServiceRequestId] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  // Step 1 form
  const [step1, setStep1] = useState({
    category: "", description: "", address: "", preferredDate: "", preferredTime: "", urgency: "STANDARD",
  });
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Step 2
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  // Step 4
  const [scheduledAt, setScheduledAt] = useState("");

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!step1.category) e.category = "Please select a category";
    if (!step1.description.trim()) e.description = "Please describe what you need";
    if (!step1.address.trim()) e.address = "Please enter your address";
    if (!step1.preferredDate) e.preferredDate = "Please select a date";
    if (!step1.preferredTime) e.preferredTime = "Please select a time";
    setStep1Errors(e);
    return Object.keys(e).length === 0;
  };

  const handleStep1Next = async () => {
    if (!validateStep1()) return;
    setIsLoading(true);
    const res = await serviceRequestsApi.create({
      category: step1.category,
      description: step1.description,
      address: step1.address,
      preferredDate: step1.preferredDate,
      preferredTime: step1.preferredTime,
      urgency: step1.urgency,
    });
    if (res.success) {
      setServiceRequestId(res.data.serviceRequest.id);
      setScheduledAt(`${step1.preferredDate}T${step1.preferredTime}:00`);
      setCurrentStep(2);
    } else {
      toast.error(res.message || "Failed to create request. Please log in and try again.");
    }
    setIsLoading(false);
  };

  const handleStep2Next = async () => {
    setIsLoading(true);
    // Upload media if any
    if (mediaFiles.length > 0 && serviceRequestId) {
      const res = await serviceRequestsApi.uploadMedia(serviceRequestId, mediaFiles);
      if (!res.success) {
        toast.error("Media upload failed — continuing without media");
      }
    }
    // Fetch quotes
    if (serviceRequestId) {
      const quotesRes = await serviceRequestsApi.getQuotes(serviceRequestId);
      if (quotesRes.success) setQuotes(quotesRes.data.quotes);
      else toast.error("Could not load provider quotes");
    }
    setCurrentStep(3);
    setIsLoading(false);
  };

  const handleStep3Next = () => {
    if (!selectedQuote) { toast.error("Please select a provider"); return; }
    setCurrentStep(4);
  };

  const handleConfirmBook = async () => {
    if (!selectedQuote || !serviceRequestId) return;
    setIsLoading(true);
    const res = await bookingsApi.create({
      serviceRequestId,
      providerId: selectedQuote.providerId,
      scheduledAt: scheduledAt || `${step1.preferredDate}T${step1.preferredTime}:00`,
      amount: selectedQuote.estimatedPrice,
    });
    if (res.success) {
      setCreatedBooking(res.data.booking);
      // If Paystack URL available, redirect to payment
      if (res.data.paystackAuthorizationUrl) {
        toast.success("Redirecting to payment...");
        setTimeout(() => { window.location.href = res.data.paystackAuthorizationUrl; }, 1500);
      } else {
        setBookingSuccess(true);
      }
    } else {
      toast.error(res.message || "Booking failed. Please try again.");
    }
    setIsLoading(false);
  };

  const removeMediaFile = (index: number) => setMediaFiles((prev) => prev.filter((_, i) => i !== index));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles((prev) => [...prev, ...files].slice(0, 8));
  };

  const urgencyOptions = [
    { value: "STANDARD", label: "Standard (48h)", color: "text-green-600" },
    { value: "URGENT", label: "Urgent (24h)", color: "text-amber-600" },
    { value: "EMERGENCY", label: "Emergency (ASAP)", color: "text-red-600" },
  ];

  if (bookingSuccess) {
    return (
      <CustomerAuthGuard>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 text-sm mb-1">
              Your booking with <strong>{selectedQuote?.businessName}</strong> has been created.
            </p>
            <p className="text-slate-400 text-xs mb-6">
              The provider will reach out to confirm the details. You'll earn points once the service is completed.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/customer/dashboard")} className="flex-1 rounded-xl">
                Go to Dashboard
              </Button>
              <Button onClick={() => { setCurrentStep(1); setBookingSuccess(false); setServiceRequestId(null); setSelectedQuote(null); setMediaFiles([]); setStep1({ category:"",description:"",address:"",preferredDate:"",preferredTime:"",urgency:"STANDARD" }); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Book Another
              </Button>
            </div>
          </div>
        </div>
      </CustomerAuthGuard>
    );
  }

  return (
    <CustomerAuthGuard>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 -z-0" />
              <div className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-500 -z-0"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    currentStep > step.id ? "bg-blue-600 border-blue-600 text-white"
                    : currentStep === step.id ? "bg-white border-blue-600 text-blue-600"
                    : "bg-white border-slate-300 text-slate-400"}`}>
                    {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${currentStep >= step.id ? "text-slate-700" : "text-slate-400"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Tell us what you need</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Service Category *</Label>
                  <Select value={step1.category} onValueChange={(v) => setStep1((p) => ({ ...p, category: v }))}>
                    <SelectTrigger className={`h-11 rounded-xl border-slate-200 bg-slate-50 ${step1Errors.category ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="What type of service?" />
                    </SelectTrigger>
                    <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                  {step1Errors.category && <p className="text-red-500 text-xs">{step1Errors.category}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Describe in detail what you need done..."
                    value={step1.description}
                    onChange={(e) => setStep1((p) => ({ ...p, description: e.target.value }))}
                    rows={4}
                    className={`rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none ${step1Errors.description ? "border-red-500" : ""}`}
                  />
                  {step1Errors.description && <p className="text-red-500 text-xs">{step1Errors.description}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />Service Address *</Label>
                  <Input
                    placeholder="Where should the service be performed?"
                    value={step1.address}
                    onChange={(e) => setStep1((p) => ({ ...p, address: e.target.value }))}
                    className={`h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${step1Errors.address ? "border-red-500" : ""}`}
                  />
                  {step1Errors.address && <p className="text-red-500 text-xs">{step1Errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Preferred Date *</Label>
                    <Input
                      type="date"
                      value={step1.preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setStep1((p) => ({ ...p, preferredDate: e.target.value }))}
                      className={`h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${step1Errors.preferredDate ? "border-red-500" : ""}`}
                    />
                    {step1Errors.preferredDate && <p className="text-red-500 text-xs">{step1Errors.preferredDate}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Preferred Time *</Label>
                    <Input
                      type="time"
                      value={step1.preferredTime}
                      onChange={(e) => setStep1((p) => ({ ...p, preferredTime: e.target.value }))}
                      className={`h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white ${step1Errors.preferredTime ? "border-red-500" : ""}`}
                    />
                    {step1Errors.preferredTime && <p className="text-red-500 text-xs">{step1Errors.preferredTime}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" />Urgency</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {urgencyOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setStep1((p) => ({ ...p, urgency: opt.value }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${step1.urgency === opt.value ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}
                      >
                        <p className={`text-xs font-semibold ${step1.urgency === opt.value ? "text-blue-700" : opt.color}`}>{opt.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleStep1Next} disabled={isLoading} className="w-full mt-6 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating Request...</> : <>Next: Add Photos <ChevronRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </div>
          )}

          {/* Step 2: Media Upload */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Add photos or videos (optional)</h2>
              <p className="text-slate-500 text-sm mb-5">Visuals help providers understand your needs better and give more accurate quotes.</p>

              <label className="block border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">Click to upload photos/videos</p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP, MP4 • Max 8 files • 20MB each</p>
                <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
              </label>

              {mediaFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {mediaFiles.map((file, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group">
                      {file.type.startsWith("image/") ? (
                        <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-xs text-slate-500 font-medium px-2 text-center">{file.name}</p>
                        </div>
                      )}
                      <button onClick={() => removeMediaFile(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 rounded-xl">
                  <ChevronLeft className="mr-1 h-4 w-4" />Back
                </Button>
                <Button onClick={handleStep2Next} disabled={isLoading} className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading Providers...</> : <>Find Providers <ChevronRight className="ml-1 h-4 w-4" /></>}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Provider Quotes */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Choose a provider</h2>
              <p className="text-slate-500 text-sm mb-5">Select from available providers in your category.</p>

              {quotes.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="font-semibold text-slate-900 mb-1">No providers found</p>
                  <p className="text-slate-500 text-sm">No providers are currently available in the <strong>{step1.category}</strong> category. Try a different category.</p>
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="mt-4 rounded-xl">Change Category</Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {quotes.map((quote: any) => (
                    <div
                      key={quote.providerId}
                      onClick={() => setSelectedQuote(quote)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedQuote?.providerId === quote.providerId ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
                    >
                      <div className="flex items-center gap-3">
                        {quote.portfolioImage ? (
                          <img src={quote.portfolioImage} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{quote.businessName?.charAt(0)}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm">{quote.businessName}</p>
                          <p className="text-xs text-slate-500">{quote.location}</p>
                          {quote.avgRating > 0 && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-slate-600 font-medium">{parseFloat(quote.avgRating).toFixed(1)}</span>
                              <span className="text-xs text-slate-400">({quote.totalReviews})</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-slate-900">₦{Number(quote.estimatedPrice).toLocaleString()}</p>
                          <p className="text-xs text-slate-400">{quote.estimatedDuration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 rounded-xl">
                  <ChevronLeft className="mr-1 h-4 w-4" />Back
                </Button>
                {quotes.length > 0 && (
                  <Button onClick={handleStep3Next} disabled={!selectedQuote} className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                    Confirm Provider <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Confirm & Book */}
          {currentStep === 4 && selectedQuote && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Confirm your booking</h2>

              <div className="space-y-4">
                {/* Provider summary */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Selected Provider</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{selectedQuote.businessName?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{selectedQuote.businessName}</p>
                      <p className="text-xs text-slate-500">{selectedQuote.category} • {selectedQuote.location}</p>
                    </div>
                  </div>
                </div>

                {/* Service summary */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Service Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-slate-500">Category:</span><br /><span className="font-medium">{step1.category}</span></div>
                    <div><span className="text-slate-500">Urgency:</span><br /><span className="font-medium">{step1.urgency}</span></div>
                    <div><span className="text-slate-500">Date:</span><br /><span className="font-medium">{new Date(step1.preferredDate).toLocaleDateString("en-NG")}</span></div>
                    <div><span className="text-slate-500">Time:</span><br /><span className="font-medium">{step1.preferredTime}</span></div>
                    <div className="col-span-2"><span className="text-slate-500">Address:</span><br /><span className="font-medium">{step1.address}</span></div>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Estimated Total</p>
                    <p className="text-xs text-slate-500">Payment via Paystack</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">₦{Number(selectedQuote.estimatedPrice).toLocaleString()}</p>
                </div>

                <p className="text-xs text-slate-400 text-center">
                  You will be redirected to Paystack to complete payment securely. Your booking is confirmed after payment.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(3)} className="flex-1 rounded-xl">
                  <ChevronLeft className="mr-1 h-4 w-4" />Back
                </Button>
                <Button onClick={handleConfirmBook} disabled={isLoading} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : "Confirm & Pay →"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomerAuthGuard>
  );
}
