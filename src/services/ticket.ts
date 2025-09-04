"use server";
import { getToken } from "./token";

export const getTickets = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/support-tickets`,
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

export const addTicket = async (
  subject: string,
  details: string,
  attachments: File[] = [] // Use empty array as default instead of empty string
) => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("details", details);

    // Add each attachment file if they exist
    if (attachments && attachments.length > 0) {
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/support-tickets`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type - let browser set it with boundary
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(
        "Failed to add ticket:",
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
    console.error("Error adding ticket:", error);
    return false;
  }
};

export const deleteTicket = async (id: number) => {};
export const addReply = async (id: number, reply: string) => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/support-tickets/${id}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reply,
        }),
      }
    );
    const resData = await res.json();
    console.log(resData);
    if (!res.ok) {
      console.error("Failed to add to ticket:", res.status, res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error adding to ticket:", error);
    return false;
  }
};
