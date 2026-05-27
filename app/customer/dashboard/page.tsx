"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  User,
  LogOut,
  Plus,
  Gift,
  Coins,
  X,
  Bot,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";


function WhatsAppBotButton({
  variant = "default",
}: {
  variant?: "default" | "outline";
}) {
  const handleClick = () => {
    const phoneNumber = "2349017335663";
    const message =
      "Hello UniHub Bot, I need help finding a service professional";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant === "outline" ? "outline" : "default"}
      className={`gap-2 ${
        variant === "outline"
          ? "border-green-600 text-green-700 hover:bg-green-50"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      <Bot className="w-4 h-4" />
      UniHub Bot
    </Button>
  );
}

// Sample service history data (in a real app, this would come from an API)
const sampleServiceHistory = [
  {
    id: 1,
    serviceName: "Home Services",
    providerName: "Precious",
    date: "2023-10-15",
    status: "completed",
    rating: 5,
    pointsEarned: 1200,
  },
  {
    id: 2,
    serviceName: "Digital Services",
    providerName: "Ebuka Designs",
    date: "2023-09-22",
    status: "completed",
    rating: 4,
    pointsEarned: 850,
  },
  {
    id: 3,
    serviceName: "Academic Services",
    providerName: "Amaka Oseh",
    date: "2023-11-05",
    status: "scheduled",
    rating: null,
    pointsEarned: 0,
  },
];

export default function CustomerDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [serviceHistory, setServiceHistory] = useState(sampleServiceHistory);
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("customerLoggedIn");
    const currentUser = localStorage.getItem("currentCustomer");

    if (!isLoggedIn || !currentUser) {
      // Redirect to login if not authenticated
      window.location.href = "/customer/login";
      return;
    }

    try {
      const user = JSON.parse(currentUser);
      setUserData(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      window.location.href = "/customer/login";
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("customerLoggedIn");
    localStorage.removeItem("currentCustomer");
    window.location.href = "/customer/login";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate total points earned
  const totalPoints = serviceHistory.reduce(
    (sum, service) => sum + (service.pointsEarned || 0),
    0
  );

  // Check if points are enough for redemption
  const canRedeemPoints = totalPoints >= 5000;

  const handleRedeemPoints = () => {
    setShowRedeemModal(true);
  };

  const confirmRedemption = () => {
    // In a real app, this would call an API to process the redemption
    alert(
      "Congratulations! ₦1,000 airtime will be sent to your registered phone number."
    );
    setShowRedeemModal(false);
    // Here we would update the points balance after redemption
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
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {userData.fullName}!
              </h1>
              <p className="text-muted-foreground" style={{marginBottom: "1rem"}}>
                Manage your service requests and view your service history
              </p>
              
                <WhatsAppBotButton />
            </div>
            <Link href="/customer/request-service">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Request New Service
              </Button>
            </Link>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Service History</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Services
                      </p>
                      <p className="text-2xl font-bold">
                        {serviceHistory.length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Upcoming Services
                      </p>
                      <p className="text-2xl font-bold">
                        {
                          serviceHistory.filter(
                            (service) => service.status === "scheduled"
                          ).length
                        }
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Completed Services
                      </p>
                      <p className="text-2xl font-bold">
                        {
                          serviceHistory.filter(
                            (service) => service.status === "completed"
                          ).length
                        }
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={
                  canRedeemPoints ? "border-green-200 bg-green-50" : ""
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Reward Points
                      </p>
                      <p className="text-2xl font-bold">{totalPoints}</p>
                    </div>
                    <Coins className="h-8 w-8 text-amber-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress to ₦1,000 airtime</span>
                      <span>{totalPoints}/5000 points</span>
                    </div>
                    <Progress
                      value={(totalPoints / 5000) * 100}
                      className="h-2"
                    />

                    <Button
                      onClick={handleRedeemPoints}
                      variant={canRedeemPoints ? "default" : "outline"}
                      className={
                        canRedeemPoints
                          ? "w-full mt-2 bg-green-600 hover:bg-green-700"
                          : "w-full mt-2"
                      }
                      disabled={!canRedeemPoints}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      {canRedeemPoints ? "Redeem Now" : "Not Enough Points"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Services */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceHistory.slice(0, 3).map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{service.serviceName}</p>
                          <Badge
                            variant={
                              service.status === "completed"
                                ? "secondary"
                                : "default"
                            }
                            className={
                              service.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                          >
                            {service.status === "completed"
                              ? "Completed"
                              : "Scheduled"}
                          </Badge>
                          {service.pointsEarned > 0 && (
                            <Badge
                              variant="outline"
                              className="ml-auto bg-amber-50 text-amber-700 border-amber-200"
                            >
                              <Coins className="h-3 w-3 mr-1" />
                              {service.pointsEarned} points
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          provider: {service.providerName}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(service.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("services")}
                >
                  View All Services
                </Button>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      Need a service professional?
                    </h3>
                    <p className="text-blue-700">
                      Fill out our service request form and get quotes from
                      verified providers.
                    </p>
                  </div>
                  <Link href="/customer/request-service">
                    <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                      Request a Service
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceHistory.length > 0 ? (
                    serviceHistory.map((service) => (
                      <div key={service.id} className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">
                                {service.serviceName}
                              </h4>
                              <Badge
                                variant={
                                  service.status === "completed"
                                    ? "secondary"
                                    : "default"
                                }
                                className={
                                  service.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : ""
                                }
                              >
                                {service.status === "completed"
                                  ? "Completed"
                                  : "Scheduled"}
                              </Badge>
                              {service.pointsEarned > 0 && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-50 text-amber-700 border-amber-200"
                                >
                                  <Coins className="h-3 w-3 mr-1" />
                                  {service.pointsEarned} points
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              provider: {service.providerName}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(service.date)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {service.status === "completed" ? (
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Leave Review
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contact provider
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You haven't requested any services yet.
                      </p>
                      <Link href="/providers">
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                          Browse Service providers
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="text-2xl">
                        {userData?.fullName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="w-full">
                      Change Photo
                    </Button>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </p>
                        <p className="font-medium">{userData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </p>
                        <p className="font-medium">{userData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Member Since
                        </p>
                        <p className="font-medium">
                          {userData.registrationDate
                            ? formatDate(userData.registrationDate)
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2">Account Security</h4>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Points Redemption Modal */}
      <Dialog open={showRedeemModal} onOpenChange={setShowRedeemModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Points for Airtime</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-4 p-4 bg-green-50 rounded-lg">
              <Coins className="h-12 w-12 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Available Points
                </p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
            </div>

            <div className="border-t border-b py-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Points to Redeem</span>
                <span className="font-medium">5,000</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="font-medium">Airtime Value</span>
                <span className="font-medium">₦1,000</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Airtime will be sent to your registered phone number:{" "}
              <span className="font-medium">{userData.phone}</span>
            </p>
          </div>
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={confirmRedemption}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
