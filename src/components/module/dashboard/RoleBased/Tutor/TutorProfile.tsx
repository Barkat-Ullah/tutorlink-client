"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Edit,
  Mail,
  MapPin,
  Phone,
  Star,
  Award,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tutor } from "@/types/tutor.type";
import Link from "next/link";

interface TutorProfileProps {
  tutorData: Tutor;
}

const TutorProfile = ({ tutorData }: TutorProfileProps) => {
  console.log(tutorData?._id)
  // const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  console.log(activeTab)

  // Handle edit profile button click
  // const handleEditProfile = () => {
  //   router.push(`/dashboard/tutor/${tutorData._id}`);
  // };

  if (!tutorData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">Loading profile data...</p>
      </div>
    );
  }

  // Extract data from the tutorData object
  const {
    name,
    email,
    phone,
    bio,
    education,
    experience,
    monthlyRate,
    rating = 0,
    totalReviews = 0,
    logo,
    area,
    subjects = [],
    availability = [],
    division,
    district,
  } = tutorData;

  // Format availability for display
  const formatAvailability = (availability: any[]) => {
    return availability.map((slot) => ({
      day: slot.day,
      times: slot.timeSlots.join(", "),
    }));
  };

  const availabilityData = formatAvailability(availability);

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tutor Profile</h1>
        <Link href={`/dashboard/tutor/profile/${tutorData?._id}`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={logo} alt={name} />
                <AvatarFallback>{name?.charAt(0) || "T"}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-muted-foreground mb-2">{education}</p>
              <div className="flex items-center gap-1 mb-4">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({totalReviews} reviews)
                </span>
              </div>

              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {area}, {district?.name}, {division?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{experience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{monthlyRate} BDT/month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{bio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subjects I Teach</CardTitle>
                  <CardDescription>
                    Subjects and areas of expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjects?.map((subject) => (
                      <Card key={subject?._id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 py-3">
                          <CardTitle className="text-lg">
                            {subject?.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground mb-3">
                            {subject?.description}
                          </p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-2">
                              Grade Levels:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {subject.gradeLevel?.map((grade) => (
                                <Badge key={grade} variant="outline">
                                  {grade}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3">
                            <h4 className="text-sm font-medium">Category:</h4>
                            <Badge className="mt-1">{subject.category}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Availability</CardTitle>
                  <CardDescription>
                    Days and times I&apos;m available for tutoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availabilityData.length > 0 ? (
                      availabilityData?.map((slot, index) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span className="font-medium">{slot?.day}</span>
                          </div>
                          <Separator
                            className="hidden md:block h-8 w-px bg-border"
                            orientation="vertical"
                          />
                          <div className="flex items-start gap-2 flex-1">
                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <span>{slot?.times}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No availability set
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
