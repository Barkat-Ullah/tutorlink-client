"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { updateBookingStatus } from "@/services/BookingServices";
import { toast } from "sonner";
import { CalendarClock, CheckCircle, Info, XCircle } from "lucide-react";
import { useState } from "react";

interface Booking {
  _id: string;
  tutorId: {
    _id: string;
    name: string;
  };
  studentId: {
    _id: string;
    name: string;
  };
  subjectId: {
    _id: string;
    name: string;
  };
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
  dateTime?: string;
}

interface TutorBookingsProps {
  bookings: Booking[];
}

export default function TutorBookings({ bookings }: TutorBookingsProps) {
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  const handleConfirm = async (bookingId: string) => {
    setProcessingAction(bookingId);
    try {
      const res = await updateBookingStatus(bookingId, "confirmed");
      console.log(res)
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.error("Error confirming booking:", error);
      toast.error(error);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    setProcessingAction(bookingId);
    try {
      const res = await updateBookingStatus(bookingId, "canceled");
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.error("Error confirming booking:", error);
      toast.error(error);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleComplete = async (bookingId: string) => {
    setProcessingAction(bookingId);
    try {
      const res = await updateBookingStatus(bookingId, "completed");

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.error("Error confirming booking:", error);
      toast.error(error);
    } finally {
      setProcessingAction(null);
    }
  };

  const getStatusBadgeColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "canceled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPaymentStatusBadgeColor = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "refunded":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (bookings.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription>
            You don&apos;t have any bookings yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            When students book sessions with you, they will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">My Bookings</h2>

      {bookings?.map((booking) => (
        <Card key={booking._id} className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.subjectId.name} Session</CardTitle>
                <CardDescription>with {booking.studentId.name}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={getStatusBadgeColor(booking.status)}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className={getPaymentStatusBadgeColor(booking.paymentStatus)}
                >
                  {booking.paymentStatus.charAt(0).toUpperCase() +
                    booking.paymentStatus.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-muted-foreground" />
                <span>
                  {booking.dateTime
                    ? new Date(booking.dateTime).toLocaleDateString()
                    : "No date"}{" "}
                </span>
              </div>

              {/* {booking.notes && (
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium mb-1">Student Notes:</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.notes}
                  </p>
                </div>
              )} */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Booking Details</DialogTitle>
                  <DialogDescription>
                    Complete information about this booking
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Subject</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.subjectId.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Student</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.studentId.name}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.dateTime
                        ? new Date(booking.dateTime).toLocaleDateString()
                        : "No date"}{" "}
        
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(booking.status)}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment</p>
                      <Badge
                        variant="outline"
                        className={getPaymentStatusBadgeColor(
                          booking.paymentStatus
                        )}
                      >
                        {booking.paymentStatus.charAt(0).toUpperCase() +
                          booking.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  {booking.notes && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm font-medium">Student Notes</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.notes}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {booking.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleReject(booking._id)}
                  disabled={processingAction === booking._id}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {processingAction === booking._id
                    ? "Processing..."
                    : "Reject"}
                </Button>
                <Button
                  onClick={() => handleConfirm(booking._id)}
                  disabled={processingAction === booking._id}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {processingAction === booking._id
                    ? "Processing..."
                    : "Confirm"}
                </Button>
              </div>
            )}

            {booking.status === "confirmed" &&
              booking.paymentStatus === "paid" && (
                <Button
                  onClick={() => handleComplete(booking._id)}
                  disabled={processingAction === booking._id}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {processingAction === booking._id
                    ? "Processing..."
                    : "Mark as Completed"}
                </Button>
              )}

            {booking.status === "canceled" && (
              <p className="text-sm text-red-500 italic">
                This booking was canceled
              </p>
            )}

            {booking.status === "completed" && (
              <p className="text-sm text-green-500 italic">
                This booking has been completed
              </p>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
