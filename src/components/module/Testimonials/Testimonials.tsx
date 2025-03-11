import { Star, User } from "lucide-react";
import React from "react";

// ✅ Define the type for testimonials
type Testimonial = {
  name: string;
  role: string;
  rating: number;
  feedback: string;
};

// ✅ Reusable Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* ✅ User Icon Instead of Image */}
        <div className="rounded-full bg-gray-200 p-3">
          <User className="h-8 w-8 text-gray-600" />
        </div>
        <div>
          <h3 className="font-bold">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <div className="mt-4 flex">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="mt-3 text-muted-foreground">
        &quot;{testimonial.feedback}&quot;
      </blockquote>
    </div>
  );
};

// ✅ Testimonials Data Array
const testimonialsData: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "High School Student",
    rating: 5,
    feedback:
      "TutorLink helped me find an amazing math tutor who explained concepts in a way that finally made sense to me.",
  },
  {
    name: "Michael Chen",
    role: "Physics Tutor",
    rating: 5,
    feedback:
      "As a tutor on TutorLink, I've been able to connect with eager students. The platform makes scheduling seamless!",
  },
  {
    name: "David Rodriguez",
    role: "Parent",
    rating: 5,
    feedback:
      "Finding a qualified Spanish tutor for my daughter was so easy with TutorLink. The flexible scheduling is a lifesaver!",
  },
  {
    name: "Emily Taylor",
    role: "College Student",
    rating: 5,
    feedback:
      "I was struggling with organic chemistry until I found my tutor on TutorLink. The personalized attention was a game changer.",
  },
];

// ✅ Main Testimonials Component
const Testimonials = () => {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from students and tutors who have transformed their
              educational experience with TutorLink.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
