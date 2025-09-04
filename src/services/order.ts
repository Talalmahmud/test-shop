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

export const addOrder = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    // Create FormData object
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type - let browser set it with boundary
      },
      body: JSON.stringify({
        payment_type: "cash_on_delivery",
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(
        "Failed to add order:",
        res.status,
        res.statusText,
        errorData
      );
      return false;
    }

    const resData = await res.json();
    console.log(resData);
    return true;
  } catch (error) {
    console.error("Error adding order:", error);
    return false;
  }
};
