"use server";
import {
  District,
  Division,
  Subject,
} from "@/app/(withCommonLayout)/become-a-tutor/page";
import { TutorData } from "@/components/module/BecomeATutor/CreateTutor";
import { Tutor } from "@/types/tutor.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllDistrict = async (): Promise<District[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/district`);
    if (!res.ok) {
      console.error("Failed to fetch districts:", res.status, res.statusText);
      return [];
    }
    const response = await res.json();

    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching districts:", error);
    return [];
  }
};

export const getAllDivision = async (): Promise<Division[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/division`);
    if (!res.ok) {
      console.error("Failed to fetch divisions:", res.status, res.statusText);
      return [];
    }
    const response = await res.json();

    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching divisions:", error);
    return [];
  }
};

export const getAllSubject = async (): Promise<Subject[]> => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subject`);
   
    const response = await res.json();
    return response.data ;
  } catch (error: any) {
    console.error("Error fetching subjects:", error);
    return [];
  }
};
export const getAllTutor = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  // Add page and limit
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);

  // Add other query params
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && key !== "page" && key !== "limit") {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            if (val) params.append(key, val);
          });
        } else {
          params.append(key, value);
        }
      }
    });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor?${params.toString()}`,
      {
        next: {
          tags: ["TUTOR"],
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// export const getTutor = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor`, {
//       next: {
//         tags: ["TUTOR"],
//       },
//     });

//     const data = await res.json();
//     console.log("get tutor data",data)
//     return Array.isArray(data.data.result) ? data.data.result : [];
//   } catch (error: any) {
//     return Error(error.message);
//   }
// };
export const getTutor = async () => {
  console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor`, {
      next: {
        tags: ["TUTOR"],
      },
    });

    const data = await res.json();
    // console.log("get tutor data", data);

    if (Array.isArray(data.data.result)) {
      return data.data.result;
    } else {
      console.error("Error: Result is not an array", data);
      return []; // Return an empty array if data isn't an array
    }
  } catch (error: any) {
    console.error("Error fetching tutors:", error);
    return [];
  }
};


export const getTutorProfileInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor/me`, {
      next: {
        tags: ["Profile"],
      },
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value || "",
      },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

export const updateTutorProfile = async (id: string, data: Tutor) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value || "",
      },
      body: JSON.stringify(data),
    });
    console.log(res)

    revalidateTag("Profile");
    return await res.json();
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// get single product
export const getSingleTutor = async (tutorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/${tutorId}`,
      {
        next: {
          tags: ["TUTOR"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createTutor = async (tutorData: TutorData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor`, {
      method: "POST",
      body: JSON.stringify(tutorData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("TUTOR");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
// TutorServices.js

export const updateTutorRole = async (roleData: { role: string }): Promise<any> => {
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/update-role`,
          {
            method: "PATCH",
            body: JSON.stringify(roleData),
            headers: {
              "Content-Type": "application/json",
               Authorization: (await cookies()).get("accessToken")!.value,
            },
          }
        );
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
