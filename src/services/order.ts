"use server";

import { getToken } from "./token";

export const getOrder = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-history`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const resData = await res.json();
    if (!res.ok) {
      console.error("Failed to order to cart:", res.status, res.statusText);
      return false;
    }

    return resData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};
