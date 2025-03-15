/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const createOrder = async (order: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getOrderByUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${id}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Orders fetched:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching orders:", error.message);
    return null;
  }
};

export const verifyPayment = async (orderId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/verify?order_id=${orderId}`
    );

    if (!response.ok) {
      return { success: false, message: "Failed to verify payment" };
    }

    return await response.json();
  } catch (error) {
    console.error("Verify payment error:", error);
    return { success: false, message: "Failed to verify payment" };
  }
};
