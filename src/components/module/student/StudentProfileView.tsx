"use client";

import { useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
} from "lucide-react";
import { updateProfile } from "@/services/StudentServices";
import { toast } from "sonner";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNo: z
    .string()
    .regex(/^\d{11}$/, { message: "Phone number must be 11 digits." }),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string(),
  address: z.string(),
  photo: z.string().url({ message: "Please enter a valid URL." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
interface ProfileData {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  address: string;
  photo?: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  // Add any other properties that exist in your profile object
}

// Define the props interface for the component
interface StudentProfileViewProps {
  profile: ProfileData | null;
}

const StudentProfileView = ({
  profile: initialProfile,
}: StudentProfileViewProps) => {
  const [profile, setProfile] = useState<ProfileData | null>(initialProfile);
  const [loading, setLoading] = useState(!initialProfile);
  console.log(setLoading)
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      gender: "Other",
      dateOfBirth: "",
      address: "",
      photo: "",
    },
  });

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const data = await getProfileInfo();
  //       if (data?.success) {
  //         setProfile(data.data);
  //         form.reset({
  //           name: data.data.name,
  //           email: data.data.email,
  //           phoneNo: data.data.phoneNo,
  //           gender: data.data.gender,
  //           dateOfBirth: data.data.dateOfBirth,
  //           address: data.data.address,
  //           photo: data.data.photo,
  //         });
  //       }
  //     } catch (error: any) {
  //       console.error("Failed to fetch profile:", error);
  //       toast.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!profile?._id) return;

    setUpdating(true);
    try {
      const result = await updateProfile(profile._id, data);
      console.log(result);
      if (result?.success) {
        setProfile(result.data);
        setIsEditing(false);
        toast.success(result?.message);
      } else {
        toast.success(result?.message);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Profile Card */}
        <Card className="h-fit">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profile?.photo} alt={profile?.name} />
              <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{profile?.name}</h2>
            <p className="text-muted-foreground">{profile?.role}</p>

            <Separator className="my-4" />

            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile?.phoneNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile?.gender}</span>
              </div>
              {profile?.dateOfBirth && profile.dateOfBirth !== "n/a" && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.dateOfBirth}</span>
                </div>
              )}
              {profile?.address && profile.address !== "n/a" && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.address}</span>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>Cancel Editing</>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Profile Details/Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Profile" : "Profile Details"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Update your personal information"
                : "View your personal information and account settings"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="11-digit phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="photo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Photo URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/photo.jpg"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a valid image URL
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your address"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="account">Account Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p className="text-base">{profile?.name}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email
                        </h3>
                        <p className="text-base">{profile?.email}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </h3>
                        <p className="text-base">{profile?.phoneNo}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Gender
                        </h3>
                        <p className="text-base">{profile?.gender}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Date of Birth
                        </h3>
                        <p className="text-base">
                          {profile?.dateOfBirth === "n/a"
                            ? "Not specified"
                            : profile?.dateOfBirth}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Address
                      </h3>
                      <p className="text-base">
                        {profile?.address === "n/a"
                          ? "Not specified"
                          : profile?.address}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="account" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Account Type
                        </h3>
                        <p className="text-base capitalize">
                          {profile?.role?.toLowerCase()}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Account Status
                        </h3>
                        <p className="text-base">
                          {profile?.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Member Since
                        </h3>
                        <p className="text-base">
                          {profile?.createdAt
                            ? new Date(profile.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" className="mr-2">
                        Change Password
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfileView;
