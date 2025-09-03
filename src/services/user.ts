"use server";

import { getToken } from "./token";

export const getUserProfile = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    if (!res.ok) {
      console.error("Failed toget user:", res.status, res.statusText);
      return false;
    }

    return resData;
  } catch (error) {
    console.error("Error user :", error);
    return false;
  }
};
