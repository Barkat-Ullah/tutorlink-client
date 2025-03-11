"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,

} from "lucide-react";
import banner from "@/assets/banner.jpg"
const Banner = () => {
  return (
    <section className="relative pt-8 pb-12 md:pt-12 md:pb-20 lg:pt-16 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] ">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find & Connect with the{" "}
                <span className="text-primary">Best Tutors</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover qualified tutors, book sessions, and transform your
                learning journey with TutorLink.
              </p>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:w-full md:max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by subject, grade or tutor name..."
                  className="w-full pl-9 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button type="submit" className="shrink-0">
                Search
              </Button>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Sign Up as Student
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto"
                >
                  Register as Tutor
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl lg:aspect-square bg-gradient-to-b from-primary/10 to-background">
            <Image
              src={banner}
              width={550}
              height={550}
              alt="Students learning with a tutor"
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
