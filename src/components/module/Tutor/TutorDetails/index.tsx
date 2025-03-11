"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  GraduationCap,
  Calendar,
  DollarSign,
  User,
  BookOpen,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import type { Tutor } from "@/types/tutor.type";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { createBooking } from "@/services/BookingServices";

interface TutorDetailProps {
  tutor: Tutor;
}
interface AvailabilityItem {
  day: string;
  timeSlots: string[];
}

const TutorDetail = ({ tutor }: TutorDetailProps) => {
  console.log(tutor);
  const { user } = useUser();
  console.log(user);
  const router = useRouter();
  const handleBookNow = async () => {
    // Check if user is logged in
    if (!user?.userId) {
      toast.error("Please login to book a tutor");
      router.push("/login");
      return;
    }

    // Get the first subject from tutor's subjects array
    const subjectId = tutor.subjects[0]?._id;

    // Get current date and time for booking
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();

    // Use the tutor's monthly rate as price
    const price = tutor.monthlyRate || 0;

    const data = {
      studentId: user?.userId,
      tutorId: tutor?.user?._id,
      subjectId,
      dateTime,
      price,
    };

    try {
      const res = await createBooking(data);
      console.log(res)

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/student/booking");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="overflow-hidden shadow-lg rounded-lg">
        <div className="relative z-10 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left section - Image and Basic Info */}
            <div className="md:w-1/4">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 mb-4 mx-auto">
                  <Image
                    src={
                      tutor.logo ||
                      "https://i.ibb.co.com/35TWz6CG/download-1.jpg" ||
                      "/placeholder.svg"
                    }
                    alt={tutor.user.name || "Tutor"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="bg-primary text-white px-3 py-1 rounded-full flex items-center mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{tutor.rating || "4.5"}</span>
                </div>

                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-3">
                  {tutor.experience
                    ? `${tutor.experience}+ years experience`
                    : "New Tutor"}
                </Badge>

                <div className="bg-primary/10 text-primary font-bold text-lg px-4 py-2 rounded-lg flex items-center">
                  <DollarSign className="h-5 w-5 mr-1" />৳
                  {tutor.monthlyRate || "500"}/month
                </div>
              </div>
            </div>

            {/* Middle section - Detailed Info */}
            <div className="md:w-3/4 flex flex-col">
              <h2 className="font-bold text-2xl text-primary mb-3 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                {tutor.user.name || "Tutor Name"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </h4>
                  <p className="text-muted-foreground">{tutor.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </h4>
                  <p className="text-muted-foreground">Not Available</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Qualification
                  </h4>
                  <p className="text-muted-foreground">
                    {tutor.qualification || "BSc in Computer Science"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                    <Badge className="h-4 w-4 mr-2" />
                    Experience
                  </h4>
                  <p className="text-muted-foreground">
                    {tutor.experience} years
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </h4>
                  <p className="text-muted-foreground">
                    {tutor.district.name || "District"},{" "}
                    {tutor.division.name || "Division"}
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Subjects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject) => (
                    <Badge
                      key={subject._id}
                      variant="outline"
                      className="font-normal border-primary/30 bg-primary/5"
                    >
                      {subject.name}
                    </Badge>
                  ))}
                  {tutor.subjects.length > 5 && (
                    <Badge variant="outline" className="font-normal">
                      +{tutor.subjects.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Availability
                </h4>
                <div className="text-sm bg-muted p-3 rounded-md">
                  {Array.isArray(tutor.availability) &&
                  tutor.availability.length > 0
                    ? tutor.availability.map(
                        (item: AvailabilityItem, index: number) => (
                          <div key={index} className="mb-1 last:mb-0">
                            <span className="font-medium">{item.day}:</span>{" "}
                            {item.timeSlots.join(", ")}
                          </div>
                        )
                      )
                    : typeof tutor.availability === "string"
                    ? tutor.availability
                    : "Not specified"}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2">
                  Bio
                </h4>
                <p className="text-muted-foreground"> {tutor?.bio}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="secondary" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button onClick={handleBookNow}>Book Now</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TutorDetail;
