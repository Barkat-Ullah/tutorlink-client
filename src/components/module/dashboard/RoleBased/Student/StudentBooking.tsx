"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, User } from "lucide-react";
import { createOrder } from "@/services/OrderServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IStudent {
  _id: string;
  name: string;
  email: string;
}

interface ITutor {
  _id: string;
  name: string;
  email: string;
}

interface ISubject {
  _id: string;
  name: string;
  category: string;
}

export interface IBooking {
  _id: string;
  createdAt: string;
  dateTime: string;
  paymentStatus: "pending" | "paid";
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  studentId: IStudent;
  subjectId: ISubject;
  tutorId: ITutor;
}

interface StudentBookingProps {
  bookings: {
    data: IBooking[];
    message: string;
    success: boolean;
  };
}

const StudentBooking: React.FC<StudentBookingProps> = ({ bookings }) => {
  const router = useRouter();

  if (!bookings.success || bookings.data.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">No bookings found</h2>
        <p className="text-muted-foreground mt-2">
          You haven&apos;t made any bookings yet.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      confirmed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
    return (
      colors[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const handleOrder = async (booking: IBooking) => {
    console.log("Creating order for booking:", booking._id);
    const orderData = {
      userId: booking.studentId._id,
      subjectId: booking.subjectId._id,
      totalPrice: booking.price,
    };

    try {
      const res = await createOrder(orderData);
      console.log(res)
      if (res?.data?.checkout_url) {
         window.location.href = res.data.checkout_url;
        toast.success(res.message);
        router.push("/dashboard/student/payment");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.data.map((booking) => (
          <Card key={booking._id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">
                  {booking.subjectId.name} Session
                </CardTitle>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>
                Booked {getTimeAgo(booking.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatDate(booking.dateTime)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {booking.subjectId.category} - {booking.subjectId.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tutor: {booking.tutorId.name}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-lg font-bold">
                      ${booking.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment</p>
                    <Badge
                      variant={
                        booking.paymentStatus === "pending"
                          ? "outline"
                          : "default"
                      }
                      className="mt-1"
                    >
                      {booking.paymentStatus.charAt(0).toUpperCase() +
                        booking.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              {booking.paymentStatus === "pending" ? (
                <Button
                  onClick={() => handleOrder(booking)}
                  className="w-full"
                  disabled={booking.status !== "confirmed"}
                >
                  {booking.status === "confirmed"
                    ? "Make Payment"
                    : "Awaiting Confirmation"}
                </Button>
              ) : (
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentBooking;
