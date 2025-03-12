/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBooking = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("Booking");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getTutorBooking = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/tutor-accept`,
      {
        next: {
          tags: ["Booking"],
        },
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getStudentBooking = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/student-request`,
      {
        next: {
          tags: ["Booking"],
        },
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
         body: JSON.stringify({ status }),
      }
    );
    console.log(response)

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update booking status");
    }
    revalidateTag("Booking");

    return await response.json();
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
}

export const updateBooking = async (id: string, data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("Booking");
    return await res.json();
  } catch (error) {
    console.error("Error updating Booking:", error);
  }
};

export const deleteBooking = async (id: string) => {
  try {
    // Call your API delete function here
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );

    revalidateTag("Booking");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
