import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  GraduationCap,
  Calendar,
  DollarSign,
  User,
  BookOpen,
} from "lucide-react";
import type { Tutor } from "@/types/tutor.type";

interface TutorCardProps {
  tutor: Tutor;
}

// Define the type for availability items
interface AvailabilityItem {
  day: string;
  timeSlots: string[];
}

const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0"></div>

      <div className="relative z-10 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left section - Basic info */}
          <div className="md:w-1/4">
            <div className="flex flex-col items-center">
              {/* Profile image in circular frame */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4 mx-auto">
                <Image
                  src={
                    tutor.logo || "https://i.ibb.co.com/35TWz6CG/download-1.jpg"
                  }
                  alt={tutor.user.name || "Tutor"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Rating */}
              <div className="bg-primary text-white px-3 py-1 rounded-full flex items-center mb-3">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{tutor.rating || "4.5"}</span>
              </div>

              {/* Experience badge */}
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-3">
                {tutor.experience
                  ? `${tutor.experience}+ years experience`
                  : "New Tutor"}
              </Badge>

              {/* Price */}
              <div className="bg-primary/10 text-primary font-bold text-lg px-4 py-2 rounded-lg flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />৳
                {tutor.monthlyRate || "500"}/month
              </div>
            </div>
          </div>

          {/* Middle section - Details */}
          <div className="md:w-2/4 flex flex-col">
            <h3 className="font-bold text-xl text-primary mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              {tutor.user.name || "Tutor Name"}
            </h3>

            <div className="flex items-center text-muted-foreground mb-3">
              <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{tutor.qualification || "BSc in Computer Science"}</span>
            </div>

            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>
                {tutor.district.name || "District"},{" "}
                {tutor.division.name || "Division"}
              </span>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Subjects
              </h4>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject, index) => (
                  <Badge
                    key={index}
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

            <div className="mb-4">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Availability
                </h4>
                <div className="text-sm bg-muted p-3 rounded-md">
                    {Array.isArray(tutor.availability) && tutor.availability.length > 0 ? (
                        tutor.availability.map((item: AvailabilityItem, index: number) => (
                            <div key={index} className="mb-1 last:mb-0">
                                <span className="font-medium">{item.day}:</span>{" "}
                                {item.timeSlots.join(", ")}
                            </div>
                        ))
                    ) : typeof tutor.availability === 'string' ? (
                        tutor.availability
                    ) : (
                        "Not specified"
                    )}
                </div>
            </div>
          </div>

          {/* Right section - Action */}
          <div className="md:w-1/4 flex flex-col justify-center items-center">
            <div className="w-full max-w-xs p-4 bg-primary/5 rounded-lg border border-primary/20 flex flex-col items-center">
              <p className="text-center text-sm text-muted-foreground mb-4">
                View complete profile to see teaching methods, reviews, and more
                details
              </p>
              <Link href={`/browse-tutors/${tutor._id}`} className="w-full">
                <Button variant="default" className="w-full">
                  View Full Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TutorCard;
