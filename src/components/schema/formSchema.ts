import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(11, { message: "Please enter a valid phone number" }),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters" }),
  division: z.string({ required_error: "Please select a division" }),
  district: z.string({ required_error: "Please select a district" }),
  area: z.string().optional(),
  subjects: z
    .array(z.string())
    .min(1, { message: "Select at least one subject" }),
  monthlyRate: z.coerce
    .number()
    .min(1000, { message: "Monthly rate must be at least 1000" }),
  experience: z.coerce
    .number()
    .min(0, { message: "Experience must be a positive number" }),
  education: z
    .string()
    .min(2, { message: "Please provide your education details" }),
  availability: z
    .array(
      z.object({
        day: z.string({ required_error: "Day is required" }),
        timeSlots: z
          .array(z.string())
          .min(1, { message: "Select at least one time slot" }),
      })
    )
    .min(1, { message: "Add at least one availability" }),
  logo: z.any().optional(),
});

export type FormValues = z.infer<typeof formSchema>;