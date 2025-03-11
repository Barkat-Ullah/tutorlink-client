import StudentBooking from "@/components/module/dashboard/RoleBased/Student/StudentBooking";
import { getStudentBooking } from "@/services/BookingServices";
import React from "react";

const Booking = async () => {
  const bookings = await getStudentBooking();

  return (
    <div>
      <StudentBooking bookings={bookings}/>
    </div>
  );
};

export default Booking;
