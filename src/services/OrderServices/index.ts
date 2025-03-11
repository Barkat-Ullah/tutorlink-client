"use server"
import { cookies } from "next/headers";

export const createOrder = async (order: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
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
export const getOrder = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`);
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
