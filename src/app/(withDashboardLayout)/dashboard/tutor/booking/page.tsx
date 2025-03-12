import TutorBookings from "@/components/module/dashboard/RoleBased/Tutor/TutorBooking";
import { getTutorBooking } from "@/services/BookingServices";
import React from "react";

const TutorBookingPage = async () => {
  const bookings = await getTutorBooking();
  console.log(bookings)
  return (
    <div>
      <TutorBookings bookings={bookings} />
    </div>
  );
};

export default TutorBookingPage;
 