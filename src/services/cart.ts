"use server";
import { cookies } from "next/headers";
import { getToken } from "./token";

export const addCart = async (
  id: number,
  varient: string | "",
  quantity: number
) => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id, variant: varient, quantity: quantity }),
    });
    const resData = await res.json();
    console.log(resData);
    if (!res.ok) {
      console.error("Failed to add to cart:", res.status, res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const updateQuantityCart = async (id: number, quantity: number) => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/carts/change-quantity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id, quantity: quantity }),
      }
    );
    const resData = await res.json();
    console.log(resData);
    if (!res.ok) {
      console.error("Failed to update to cart:", res.status, res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const getCart = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    console.log(resData);
    if (!res.ok) {
      console.error("Failed to add to cart:", res.status, res.statusText);
      return false;
    }

    return resData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const getCartSummary = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cart-summary`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const resData = await res.json();
    if (!res.ok) {
      console.error("Failed to add to cart:", res.status, res.statusText);
      return false;
    }

    return resData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const deleteCart = async (id: number) => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    if (!res.ok) {
      console.error("Failed to add to cart:", res.status, res.statusText);
      return false;
    }

    return resData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};
