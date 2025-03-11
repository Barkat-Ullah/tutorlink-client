import React from 'react';

const Work = () => {
    return (
      <section className="w-full py-6 md:py-12 lg:py-16 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                How TutorLink Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with TutorLink in just a few simple steps.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Search for Tutors</h3>
              <p className="text-muted-foreground">
                Browse our extensive database of qualified tutors based on
                subject, price, and availability.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Book a Session</h3>
              <p className="text-muted-foreground">
                Select a time slot from the tutor&apos;s calendar and make a
                secure payment to confirm your booking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Start Learning</h3>
              <p className="text-muted-foreground">
                Connect with your tutor at the scheduled time and begin your
                personalized learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Work;