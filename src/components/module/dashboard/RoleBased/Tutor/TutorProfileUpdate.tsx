"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Trash, Plus, Upload, Save, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateTutorProfile } from "@/services/TutorServices";
import { Tutor } from "@/types/tutor.type";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  area: z.string().optional(),
  education: z.string().min(2, { message: "Education is required" }),
  experience: z.coerce.number().min(0),
  monthlyRate: z.coerce
    .number()
    .min(1000, { message: "Minimum rate is 1000 BDT" }),
  availability: z.array(
    z.object({
      day: z.string(),
      timeSlots: z.array(z.string()),
    })
  ),
  logo: z.any().optional(),
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];


interface TutorProfileUpdateProps {
  tutorData: Tutor;
 
}

const TutorProfileUpdate = ({ tutorData }: TutorProfileUpdateProps) => {
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    tutorData?.logo || null
  );

  // Initialize form with tutor data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tutorData?.name || "",
      email: tutorData?.email || "",
      phone: tutorData?.phone || "",
      bio: tutorData?.bio || "",
      area: tutorData?.area || "",
      education: tutorData?.education || "",
      experience: tutorData?.experience || 0,
      monthlyRate: tutorData?.monthlyRate || 1000,
      availability: tutorData?.availability || [{ day: "", timeSlots: [] }],
      logo: null,
    },
  });

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new availability slot
  const addAvailability = () => {
    const currentAvailability = form.getValues("availability") || [];
    form.setValue("availability", [
      ...currentAvailability,
      { day: "", timeSlots: [] },
    ]);
  };

  // Remove an availability slot
  const removeAvailability = (index: number) => {
    const currentAvailability = form.getValues("availability");
    form.setValue(
      "availability",
      currentAvailability.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    setUploading(true);
    try {
      let imageUrl: string = tutorData?.logo || "";

      if (data.logo && data.logo instanceof File) {
        const formData = new FormData();
        formData.append("image", data.logo);

        const image_hosting_key = process.env
          .NEXT_PUBLIC_IMAGE_HOSTING_KEY as string;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

        const res = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const imgData = (await res.json()) as {
          success: boolean;
          data: { url: string };
        };

        if (imgData.success) {
          imageUrl = imgData.data.url;
        } else {
          console.error("Image upload failed");
          toast.error("Image upload failed");
          setUploading(false);
          return;
        }
      }

      const updateData: Partial<Tutor> = {
        _id: tutorData?._id as string,
        name: data.name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        area: data.area,
        education: data.education,
        experience: Number(data.experience),
        monthlyRate: Number(data.monthlyRate),
        availability: data.availability,
        logo: imageUrl,
        qualification: "",
        rating: 0,
        createdAt: "",
        updatedAt: "",
      };

      const response = await updateTutorProfile(tutorData._id, updateData);
      if (response.success) {
        toast.success("Profile updated successfully");
        router.push("/dashboard/tutor/profile");
        router.refresh();
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Tutor Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Your Profile</CardTitle>
          <CardDescription>
            Make changes to your tutor profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your highest education"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience (Years)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Rate (BDT)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself, your teaching style, and experience"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <div className="flex items-center gap-4 mt-2">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={previewUrl || ""} />
                          <AvatarFallback>
                            {form.getValues("name")?.charAt(0) || "T"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="logo-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("logo-upload")?.click()
                            }
                            className="w-full"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Change Profile Picture
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Location Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Location</h3>
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                          <Input placeholder="Your specific area" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your division and district cannot be changed. Contact
                          support if needed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Availability Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Availability</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAvailability}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Availability
                  </Button>
                </div>

                {form.watch("availability")?.map((availability, index) => (
                  <div key={index} className="p-4 border rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Availability {index + 1}</h4>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeAvailability(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name={`availability.${index}.day`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {daysOfWeek.map((day) => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`availability.${index}.timeSlots`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Slots</FormLabel>
                          <FormDescription>
                            Select available time slots for this day
                          </FormDescription>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {timeSlots.map((slot) => (
                              <div
                                key={slot}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  checked={field.value?.includes(slot) || false}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...(field.value || []), slot]
                                      : (field.value || []).filter(
                                          (value) => value !== slot
                                        );
                                    field.onChange(updatedValue);
                                  }}
                                  id={`timeslot-${index}-${slot.replace(
                                    /\s+/g,
                                    "-"
                                  )}`}
                                />
                                <label
                                  htmlFor={`timeslot-${index}-${slot.replace(
                                    /\s+/g,
                                    "-"
                                  )}`}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {slot}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorProfileUpdate;
