/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Users, Award, Target } from "lucide-react";
import Cta from "@/components/module/Cta/Cta";

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col ">
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-8 pb-6 md:pt-12 md:pb-10 lg:pt-16 lg:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About TutorLink
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our mission is to connect students with qualified tutors to make
                quality education accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="w-full py-6 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Democratizing Access to Quality Education
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At TutorLink, we believe that every student deserves access to
                personalized, high-quality education. Our platform bridges the
                gap between students seeking academic support and qualified
                tutors who can provide it.
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're committed to creating an inclusive learning environment
                where students of all backgrounds can find the support they need
                to succeed academically and reach their full potential.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Target className="mr-1 h-3.5 w-3.5" />
                Our Vision
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Shaping the Future of Education
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We envision a world where geographical and socioeconomic
                barriers no longer limit educational opportunities. Through
                technology and innovation, we're working to create a global
                community of learners and educators.
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our goal is to continuously evolve our platform to meet the
                changing needs of students and tutors, incorporating new
                technologies and teaching methodologies to enhance the learning
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Award className="mr-1 h-3.5 w-3.5" />
                Our Values
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                What We Stand For
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our core values guide everything we do at TutorLink.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Excellence</h3>
              <p className="text-center text-muted-foreground">
                We're committed to maintaining high standards in education and
                service quality.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Inclusivity</h3>
              <p className="text-center text-muted-foreground">
                We believe in creating equal opportunities for all students and background.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-center text-muted-foreground">
                We continuously evolve our platform to enhance the learning
                experience.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Integrity</h3>
              <p className="text-center text-muted-foreground">
                We operate with transparency, honesty, and respect for all our
                users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Users className="mr-1 h-3.5 w-3.5" />
                Our Team
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Meet the People Behind TutorLink
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our dedicated team is passionate about transforming education
                and connecting students with exceptional tutors.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Emma Johnson",
                role: "Founder & CEO",
                bio: "Former educator with a passion for making quality education accessible to all students.",
               image:"https://i.ibb.co.com/Xrx7FQR4/team.jpg"
              },
              {
                name: "David Chen",
                role: "CTO",
                bio: "Tech innovator focused on creating intuitive educational platforms that connect students and tutors.",
               image:"https://i.ibb.co.com/Xrx7FQR4/team.jpg"
              },
              {
                name: "Sophia Rodriguez",
                role: "Head of Tutor Relations",
                bio: "Experienced academic advisor dedicated to recruiting and supporting top-quality tutors.",
               image:"https://i.ibb.co.com/Xrx7FQR4/team.jpg"
              },
              {
                name: "Marcus Williams",
                role: "Head of Student Success",
                bio: "Education specialist committed to ensuring positive learning outcomes for all students.",
               image:"https://i.ibb.co.com/Xrx7FQR4/team.jpg"
              },
              {
                name: "Aisha Patel",
                role: "Marketing Director",
                bio: "Creative strategist passionate about spreading the word about educational opportunities.",
               image:"https://i.ibb.co.com/Xrx7FQR4/team.jpg"
              },
              {
                name: "Thomas Lee",
                role: "Product Manager",
                bio: "User experience expert focused on making TutorLink intuitive and accessible for everyone.",
               image:"https://i.ibb.co.com/Xrx7FQR4/team.jpg"
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
              >
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
                <p className="text-center text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Award className="mr-1 h-3.5 w-3.5" />
                Success Stories
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Real Impact, Real Results
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how TutorLink has transformed educational journeys for
                students around the world.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                From Struggling to Succeeding
              </h3>
              <p className="mt-2 text-muted-foreground">
                "Before TutorLink, I was failing calculus and considering
                dropping the course. After just 8 sessions with my tutor, I not
                only passed the class but earned a B+. The personalized
                attention made all the difference."
              </p>
              <p className="mt-4 font-medium">- Jamie S., College Student</p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-xl font-bold">Building Confidence</h3>
              <p className="mt-2 text-muted-foreground">
                "My son always struggled with reading comprehension and was
                falling behind in school. His tutor from TutorLink not only
                improved his skills but also boosted his confidence. Now he
                volunteers to read in class!"
              </p>
              <p className="mt-4 font-medium">- Maria L., Parent</p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-xl font-bold">Career Change Success</h3>
              <p className="mt-2 text-muted-foreground">
                "I needed to learn coding for a career change but couldn't
                afford a bootcamp. My TutorLink tutor created a personalized
                curriculum that helped me learn Python and land my first
                developer job in just 6 months."
              </p>
              <p className="mt-4 font-medium">- Alex T., Software Developer</p>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h3 className="text-xl font-bold">Test Prep Triumph</h3>
              <p className="mt-2 text-muted-foreground">
                "I was aiming for a top-tier medical school and needed to ace
                the MCAT. My TutorLink tutor helped me develop a strategic study
                plan and focus on my weak areas. I scored in the 95th
                percentile!"
              </p>
              <p className="mt-4 font-medium">- Priya K., Medical Student</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about TutorLink.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How do I find a tutor on TutorLink?
                </AccordionTrigger>
                <AccordionContent>
                  Finding a tutor is easy! Simply use the search bar on our
                  homepage to search by subject, grade level, or tutor name. You
                  can also browse all tutors and use filters to narrow down your
                  options based on price, rating, availability, and more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How are payments processed?</AccordionTrigger>
                <AccordionContent>
                  TutorLink uses secure payment processors like Stripe and
                  PayPal to handle all transactions. When you book a session,
                  you'll be prompted to enter your payment details. Your payment
                  is held securely until after your session is completed to
                  ensure satisfaction.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I cancel a session?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel a session up to 24 hours before the
                  scheduled time for a full refund. Cancellations made less than
                  24 hours in advance may be subject to a cancellation fee,
                  depending on the tutor's policy. You can view and manage all
                  your bookings from your student dashboard.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How are tutors verified?</AccordionTrigger>
                <AccordionContent>
                  All tutors on TutorLink go through a verification process that
                  includes identity verification, credential checks, and a
                  review of their educational background and teaching
                  experience. We also collect and display reviews from students
                  to help you make informed decisions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What if I'm not satisfied with my tutor?
                </AccordionTrigger>
                <AccordionContent>
                  Your satisfaction is our priority. If you're not happy with
                  your session, please contact our support team within 24 hours
                  of the completed session. We'll work with you to resolve the
                  issue, which may include a partial or full refund or helping
                  you find a more suitable tutor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  How do I become a tutor on TutorLink?
                </AccordionTrigger>
                <AccordionContent>
                  To become a tutor, click on "Register as Tutor" on our
                  homepage. You'll need to create a profile, provide information
                  about your educational background and teaching experience,
                  list the subjects you can teach, set your availability, and
                  complete our verification process. Once approved, you can
                  start accepting booking requests.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  What subjects are available on TutorLink?
                </AccordionTrigger>
                <AccordionContent>
                  TutorLink offers tutoring in a wide range of subjects across
                  all educational levels, from elementary school to college and
                  beyond. This includes mathematics, sciences, languages,
                  humanities, test preparation, programming, music, and many
                  more. If you don't see a subject you're looking for, contact
                  us and we'll try to help you find a suitable tutor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>
                  How much does tutoring cost?
                </AccordionTrigger>
                <AccordionContent>
                  Tutoring rates vary depending on the subject, tutor
                  experience, and educational level. Tutors set their own rates,
                  which typically range from $20 to $100 per hour. You can use
                  our filters to find tutors within your budget, and many tutors
                  offer discounts for booking multiple sessions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex justify-center">
            <div className="rounded-lg border bg-muted p-6 shadow-sm">
              <h3 className="text-xl font-bold">Still have questions?</h3>
              <p className="mt-2 text-muted-foreground">
                Our support team is here to help. Contact us and we'll get back
                to you as soon as possible.
              </p>
              <Button className="mt-4">Contact Support</Button>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </div>
  );
}
