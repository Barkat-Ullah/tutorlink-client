import { Button } from "@/components/ui/button";
import Link from "next/link";


const Cta = () => {
    return (
      <section className="w-full py-6 md:py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Transform Your Learning Journey?
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of students and tutors on TutorLink today and
                take the first step toward academic success.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full min-[400px]:w-auto"
                >
                  Sign Up as Student
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-white"
                >
                  Register as Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Cta;