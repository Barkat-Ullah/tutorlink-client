/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getProfileInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/me`, {
      next: {
        tags: ["Profile"],
      },
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value ,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};


export const updateProfile = async (id: string, data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value ,
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("Profile");
    return await res.json();
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};