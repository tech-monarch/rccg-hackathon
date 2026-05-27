import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  Clock,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WhatsAppButton } from "@/components/whatsapp-button";

const getproviderData = (id: string) => {
  const providers = {
    "1": {
      id: 1,
      name: "Adanna Cleaning services",
      category: "Home Cleaning Services",
      rating: 4.8,
      reviewCount: 124,
      location: "Aluu",
      phone: "+234 801 234 5678",
      email: "info@Adannacleaners.com",
      website: "omijeh-david.vercel.app",
      description:
        "Professional home cleaning services with over 10 years of experience. We specialize in creating beautiful, functional spaces that reflect your personal style and meet your specific needs.",
      services: [
        "Home Cleaning",
        "Deep Cleaning",
        "Window Cleaning",
        "Door Cleaning",
        "Furniture Cleaning",
        "Appliance Cleaning",
      ],
      experience: "10+ years",
      completedProjects: 250,
      responseTime: "Within 2 hours",
      portfolio: [
        "https://i.pinimg.com/736x/e3/dd/b0/e3ddb011e1f98a32f6c1c9f5c03ee515.jpg",
        "https://www.jaymincleaningservices.co.ke/wp-content/uploads/2025/01/1-22-1-1024x683.jpg",
        "https://www.medilac.co.za/wp-content/uploads/2021/05/cleaning.jpg",
        "https://www.cleaningafrica.co.za/wp-content/uploads/2024/05/Commercial-Contract-Cleaning-Services-1.jpg",
        "https://www.sparkling-solutions.com/images/s-images/ft-box1.jpg",
        "https://www.aufirstclasscleaninggroup.com.au/wp-content/uploads/2024/10/37077.jpg.webp",
      ],
      reviews: [
        {
          id: 1,
          name: "Nkechi Okeke",
          rating: 5,
          date: "2 weeks ago",
          comment:
            "Absolutely amazing work! Adanna transformed our home into a clean, modern space. Highly professional and creative.",
        },
        {
          id: 2,
          name: "Michael Okafor",
          rating: 5,
          date: "1 month ago",
          comment:
            "Perfect home cleaning for our home. Everything was exactly as we envisioned. Great attention to detail!",
        },
        {
          id: 3,
          name: "Temitope Balogun",
          rating: 4,
          date: "2 months ago",
          comment:
            "Very satisfied with the home cleaning services. Good value for money and excellent service.",
        },
      ],
    },
  };

  return providers[id as keyof typeof providers] || null;
};

export default function providerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const provider = getproviderData(params.id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">provider Not Found</h1>
          <Link href="/providers">
            <Button>Back to providers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UH</span>
              </div>
              <span className="text-xl font-bold text-blue-600">UniHub</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/providers"
                className="text-muted-foreground hover:text-foreground"
              >
                Find providers
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Categories
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/provider/login">
                <Button variant="outline">provider Login</Button>
              </Link>
              <Link href="/provider/register">
                <Button>Join as provider</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/providers" className="hover:text-foreground">
            providers
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{provider.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* provider Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">
                          {provider.name}
                        </h1>
                        <Badge variant="secondary" className="mb-3">
                          {provider.category}
                        </Badge>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {provider.rating}
                            </span>
                            <span className="text-muted-foreground">
                              ({provider.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{provider.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {provider.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Award className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <div className="text-sm font-semibold">
                          {provider.experience}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Experience
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Users className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <div className="text-sm font-semibold">
                          {provider.completedProjects}+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Projects
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <div className="text-sm font-semibold">
                          {provider.responseTime}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Response
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Star className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <div className="text-sm font-semibold">
                          {provider.rating}/5
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.portfolio.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {provider.reviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.name}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                      {review.id !==
                        provider.reviews[provider.reviews.length - 1].id && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <WhatsAppButton
                      phoneNumber={provider.phone}
                      message={`Hi ${provider.name}! I found your profile on UniHub.`}
                      variant="ghost"
                      className="p-0 h-auto font-medium hover:text-green-600"
                      showIcon={false}
                    >
                      {provider.phone}
                    </WhatsAppButton>
                    <div className="text-sm text-muted-foreground">Phone</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{provider.email}</div>
                    <div className="text-sm text-muted-foreground">Email</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{provider.location}</div>
                    <div className="text-sm text-muted-foreground">
                      Location
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <WhatsAppButton
                    phoneNumber={provider.phone}
                    message={`Hi ${provider.name}! I'm interested in your ${provider.category} services. Can we discuss my requirements?`}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Now
                  </WhatsAppButton>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Quote
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Similar providers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
