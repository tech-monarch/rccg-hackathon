"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Upload,
  CheckCircle,
  Clock,
  MessageSquare,
  User,
  LogOut,
  Plus,
  Send,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageUpload } from "@/components/image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Service categories
const serviceCategories = [
  { id: "cleaning", name: "Cleaning Services" },
  { id: "academic", name: "Academic Support" },
  { id: "home", name: "Home CLeaning Services" },
  { id: "digital", name: "Digital Services" },
  { id: "laundry", name: "Laundry Services" },
  { id: "farming", name: "Farming Services" },
  { id: "hair_styling", name: "Hair Styling Services" },
  { id: "other", name: "Other" },
];
// Sample providers for quotes
const sampleproviders = [
  {
    id: 1,
    name: "Miriam Amaka",
    category: "Cooking Services",
    rating: 4.8,
    reviews: 124,
    location: "Girl's hostel",
    Address: "123 Clean St, Port Harcourt",
    phone: "+234 801 234 5678",
    email: "info@`miriamamakka`.com",
    image:
      "https://i.pinimg.com/736x/e3/dd/b0/e3ddb011e1f98a32f6c1c9f5c03ee515.jpg",
    description: "I sha sabi cook, just dm me make i come cook for u",
  },
  {
    id: 2,
    name: "Okon Paul",
    category: "Digital Services",
    rating: 4.9,
    reviews: 89,
    location: "Mandela Hostel",
    Address: "456 Paint Ave, Port Harcourt",
    phone: "+234 802 345 6789",
    email: "contact@paulokon.com",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.QmuHVhXyHhi4O-V2thkdxgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey repair phones, if you wan sell, swap, or even buy and fix i active",
  },
  {
    id: 3,
    name: "Ebuka Callistus",
    category: "Laundry Services",
    rating: 4.7,
    reviews: 156,
    location: "Boy's Hostel",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanebusy.com",
    image:
      "https://counseal.com/app/uploads/2023/11/website-featured-An-Image-depicting-a-laundry-business.jpg",
    description:
      "Professional laundry and dry cleaning services for all occasions",
  },
  {
    id: 4,
    name: "Precious",
    category: "Home Services",
    rating: 4.7,
    reviews: 156,
    location: "Girls Hostel",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrcleanebusy.com",
    image:
      "https://www.nairaland.com/attachments/16999586_65cbc4a992571d113f3191438519ee0b_jpegc39fd5f4173ad02124a0d436cdf441e4",
    description:
      "I can help you with your home services😏",
  },
  {
    id: 5,
    name: "Ekene",
    category: "Farming Services",
    rating: 4.7,
    reviews: 156,
    location: "Delta",
    Address: "789 Laundry St, Port Harcourt",
    phone: "+234 803 456 7890",
    email: "hello@mrfarmboy.com",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.SYK5-rGj7lpAa0-HrJqxhQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "I sha dey cut grass",
  },
];
export default function RequestService() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedprovider, setSelectedprovider] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    urgency: "standard",
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("customerLoggedIn");
    const currentUser = localStorage.getItem("currentCustomer");

    if (!isLoggedIn || !currentUser) {
      // Redirect to login if not authenticated
      router.push("/customer/login");
      return;
    }

    try {
      const user = JSON.parse(currentUser);
      setUserData(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/customer/login");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to an API
    handleNext();
  };

  const handleSelectprovider = (provider: any) => {
    setSelectedprovider(provider);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // In a real app, this would process the payment
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      // Create a new service in the user's history
      const newService = {
        id: Math.floor(Math.random() * 1000),
        serviceName: formData.category
          ? serviceCategories.find((cat) => cat.id === formData.category)
              ?.name || "Service"
          : "Service",
        providerName: selectedprovider.name,
        date: new Date().toISOString().split("T")[0],
        status: "scheduled",
        rating: null,
        pointsEarned: 0, // Points are earned after service completion
      };

      // In a real app, this would be handled by an API
      // For now, we'll simulate by redirecting to the dashboard
      router.push("/customer/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="text-xl font-bold text-blue-600">UniHub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/customer/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Avatar>
                <AvatarFallback>
                  {userData?.fullName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground">
                    {step === 1 && "Details"}
                    {step === 2 && "Media"}
                    {step === 3 && "Quotes"}
                    {step === 4 && "Confirmation"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-blue-600 transition-all"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category">Service Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">
                        Describe what you need done
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Please provide details about the service you need..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Service Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter the address where the service will be performed"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Input
                          id="preferredTime"
                          name="preferredTime"
                          type="time"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Service Urgency</Label>
                      <RadioGroup
                        value={formData.urgency}
                        onValueChange={(value) =>
                          handleSelectChange("urgency", value)
                        }
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="font-normal">
                            Standard (Within 48 hours)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" />
                          <Label htmlFor="urgent" className="font-normal">
                            Urgent (Within 24 hours)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="emergency" id="emergency" />
                          <Label htmlFor="emergency" className="font-normal">
                            Emergency (As soon as possible)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Upload Media */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Photos & Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">Photos (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload photos to help service providers better understand
                    your needs.
                  </p>
                  <ImageUpload
                    images={images}
                    onImagesChange={setImages}
                    maxImages={6}
                    maxSizeMB={5}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Videos (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload videos to provide more context about the service you
                    need.
                  </p>
                  <ImageUpload
                    images={videos}
                    onImagesChange={setVideos}
                    maxImages={2}
                    maxSizeMB={20}
                    acceptedTypes={[
                      "video/mp4",
                      "video/quicktime",
                      "video/x-msvideo",
                    ]}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Service Quotes */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Service Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Based on your request, here are quotes from available service
                  providers. Select one to proceed with booking.
                </p>

                <div className="space-y-4">
                  {sampleproviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {provider.name}
                          </h4>
                          <div className="flex items-center text-amber-500 mt-1">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(provider.rating)
                                      ? "fill-current"
                                      : "fill-gray-300"
                                  }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            <span className="ml-1 text-sm">
                              {provider.rating} ({provider.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                Estimated time: {provider.estimatedTime}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Coins className="h-4 w-4 mr-2 text-amber-500" />
                              <span>Earn {provider.pointsEarned} points</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-xl font-bold text-blue-600">
                            ₦{provider.price.toLocaleString()}
                          </div>
                          <Button
                            onClick={() => handleSelectprovider(provider)}
                            className="mt-2 bg-blue-600 hover:bg-blue-700"
                          >
                            Select provider
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Booking Confirmed</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Your service has been booked!
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We've sent a confirmation to your email. The service
                    provider will contact you shortly to confirm details.
                  </p>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 w-full max-w-md">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Booking Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium">
                          {formData.category
                            ? serviceCategories.find(
                                (cat) => cat.id === formData.category
                              )?.name || "Service"
                            : "Service"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">provider:</span>
                        <span className="font-medium">
                          {selectedprovider?.name || ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Date & Time:
                        </span>
                        <span className="font-medium">
                          {formData.preferredDate} at {formData.preferredTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Paid:
                        </span>
                        <span className="font-medium">
                          ₦{selectedprovider?.price.toLocaleString() || ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Points to be earned:
                        </span>
                        <span className="font-medium text-amber-600">
                          {selectedprovider?.pointsEarned || 0} points
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/customer/dashboard">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Link href="/customer/request-service">
                      <Button variant="outline">Book Another Service</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentSuccess ? "Payment Successful" : "Complete Your Booking"}
            </DialogTitle>
          </DialogHeader>

          {!paymentSuccess ? (
            <div className="space-y-4 py-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  Booking Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">
                      {formData.category
                        ? serviceCategories.find(
                            (cat) => cat.id === formData.category
                          )?.name || "Service"
                        : "Service"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">provider:</span>
                    <span className="font-medium">
                      {selectedprovider?.name || ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time:</span>
                    <span className="font-medium">
                      {formData.preferredDate} at {formData.preferredTime}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      ₦{selectedprovider?.price.toLocaleString() || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" placeholder="John Doe" />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  onClick={handlePayment}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Pay ₦{selectedprovider?.price.toLocaleString() || ""}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Payment Successful!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your booking is being processed. You'll be redirected to the
                confirmation page shortly.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
