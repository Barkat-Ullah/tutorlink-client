"use client"
import {  Tutor } from "@/types/tutor.type";
import { CardContent, Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedTutor = ({ tutors }: { tutors: Tutor[] }) => {
  // console.log(tutors)


  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Tutors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated professional tutors who are dedicated to
            helping you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors?.slice(0, 3)?.map((tutor: Tutor) => (
            <Card
              key={tutor._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                {tutor.logo ? (
                  <Image
                    src={tutor?.logo}
                    alt={`${tutor?.user?.name}'s profile`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-200">
                    <span className="text-4xl font-bold text-gray-400">
                      {tutor?.user ? tutor?.user?.name.charAt(0) : "T"}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    {tutor.user ? tutor?.user?.name : "Tutor"}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span>{tutor?.rating || "New"}</span>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Area:</span>{" "}
                    {tutor.district ? tutor.district?.name : "N/A"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Education:</span>{" "}
                    {tutor.qualification || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Experience:</span>{" "}
                    {tutor?.experience} years
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Rate:</span> ৳
                    {tutor?.monthlyRate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/browse-tutors">
            <Button>View All Tutors</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutor;
