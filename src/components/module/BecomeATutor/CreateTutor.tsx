"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Trash, Plus, Upload, X } from "lucide-react";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  District,
  Division,
  Subject,
} from "@/app/(withCommonLayout)/become-a-tutor/page";
import { formSchema, FormValues } from "@/components/schema/formSchema";
import { toast } from "sonner";
import { createTutor } from "@/services/TutorServices";
import { useRouter } from "next/navigation";
import { logout } from "@/services/AuthServices";

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

interface CreateTutorProps {
  districts: District[];
  divisions: Division[];
  subjects: Subject[];
}

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function TutorRegistrationForm({
  districts,
  divisions,
  subjects,
}: CreateTutorProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [subjectSearchOpen, setSubjectSearchOpen] = useState(false);
  // const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const router = useRouter();
  // Initialize the form with empty strings instead of undefined values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      area: "",
      division: "",
      district: "",
      subjects: [],
      monthlyRate: 0,
      experience: 0,
      education: "",
      availability: [{ day: "", timeSlots: [] }],
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

  const onSubmit = async (data: FormValues) => {
    setUploading(true);

    try {
      // Create form data for image upload
      const formData = new FormData();
      if (data.logo && data.logo instanceof File) {
        formData.append("image", data.logo);
      }

      let imageUrl = "";
      if (data.logo) {
        const res = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const imgData: { success: boolean; data: { url: string } } =
          await res.json();

        if (imgData.success) {
          imageUrl = imgData.data.url;
        } else {
          console.error("Image upload failed");
          setUploading(false);
          return;
        }
      }

      // Format the data for submission
      const tutorData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        division: data.division,
        district: data.district,
        area: data.area || "",
        subjects: data.subjects,
        monthlyRate: Number(data.monthlyRate),
        experience: Number(data.experience),
        education: data.education,
        availability: data.availability,
        logo: imageUrl,
      };
      const res = await createTutor(tutorData);

      if (res.success) {
        toast.success(res.message);
        await logout();
        router.push("/login");
      }
    } catch (err: any) {
      // toast.error( err);
      console.log(err);
    } finally {
      setUploading(false);
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

  // Add a subject
  const addSubject = (subjectId: string) => {
    const currentSubjects = form.getValues("subjects") || [];
    if (!currentSubjects.includes(subjectId)) {
      form.setValue("subjects", [...currentSubjects, subjectId]);
    }
    setSubjectSearchOpen(false);
  };

  // Remove a subject
  const removeSubject = (subjectId: string) => {
    const currentSubjects = form.getValues("subjects");
    form.setValue(
      "subjects",
      currentSubjects.filter((id) => id !== subjectId)
    );
  };

  // Get filtered districts based on selected division
  // const getFilteredDistricts = () => {
  //   if (!selectedDivision) return districts;
  //   return districts.filter((district) => district._id === selectedDivision);
  // };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Tutor Registration</CardTitle>
          <CardDescription>
            Fill out the form below to register as a tutor
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
                            Upload Profile Picture
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            // setSelectedDivision(value);
                            form.setValue("district", "");
                          }}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisions.map((division) => (
                              <SelectItem
                                key={division._id}
                                value={division._id}
                              >
                                {division.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          // disabled={!selectedDivision}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {districts.map((district) => (
                              <SelectItem
                                key={district._id}
                                value={district._id}
                              >
                                {district.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                          <Input placeholder="Your specific area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Subjects Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Subjects</h3>
                <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select subjects you can teach</FormLabel>
                      <FormDescription>
                        You can select multiple subjects
                      </FormDescription>
                      <Popover
                        open={subjectSearchOpen}
                        onOpenChange={setSubjectSearchOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                              type="button"
                            >
                              Select subjects
                              <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search subjects..." />
                            <CommandList>
                              <CommandEmpty>No subject found.</CommandEmpty>
                              <CommandGroup>
                                {subjects
                                  .filter(
                                    (subject) =>
                                      !field.value?.includes(subject._id)
                                  )
                                  .map((subject) => (
                                    <CommandItem
                                      key={subject._id}
                                      value={subject._id}
                                      onSelect={() => addSubject(subject._id)}
                                    >
                                      {subject.name}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {field.value?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((subjectId) => {
                            const subject = subjects.find(
                              (s) => s._id === subjectId
                            );
                            return (
                              <Badge
                                key={subjectId}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {subject?.name}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 ml-1"
                                  onClick={() => removeSubject(subjectId)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? "Submitting..." : "Register as Tutor"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
