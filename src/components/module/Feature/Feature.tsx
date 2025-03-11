import {
  Search,
  BookOpen,
  Shield,
  Award,
  Clock,
  Star,
} from "lucide-react";

const Feature = () => {
  return (
    <section className="w-full py-6 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Why Choose TutorLink?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to connect with qualified tutors and
              achieve your academic goals.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Find Tutors Fast</h3>
            <p className="text-center text-muted-foreground">
              Search and filter tutors by subject, rating, price, and
              availability to find your perfect match.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Verified Profiles</h3>
            <p className="text-center text-muted-foreground">
              All tutors are verified for qualifications and experience to
              ensure quality education.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">All Subjects</h3>
            <p className="text-center text-muted-foreground">
              From math and science to languages and arts, find tutors for any
              subject at any level.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Flexible Scheduling</h3>
            <p className="text-center text-muted-foreground">
              Book sessions at times that work for you with our easy-to-use
              scheduling system.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Quality Learning</h3>
            <p className="text-center text-muted-foreground">
              Personalized one-on-one sessions tailored to your learning style
              and goals.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Ratings & Reviews</h3>
            <p className="text-center text-muted-foreground">
              Read authentic reviews from other students to help choose the
              right tutor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
