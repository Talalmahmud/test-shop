"use server";
export interface ShippingAddress {
  id?: number;
  address: string;
  country_id: number;
  state_id: number;
  city_id: number;
  postal_code: string;
  phone: string;
  latitude: string;
  longitude: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}
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

export const getUserProfileCounter = async () => {
  try {
    // Get the token from cookies
    const token = await getToken();

    // If no token is found, return false
    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/counters`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
export const getShippingAddresses = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No authentication token found");
      return [];
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/shipping/address`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch shipping addresses:",
        res.status,
        res.statusText
      );
      return [];
    }
    const d = await res.json();
    console.log(d);

    return d.data;
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    return [];
  }
};

export const addShippingAddress = async (
  addressData: Omit<ShippingAddress, "id">
): Promise<ShippingAddress | null> => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No authentication token found");
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/shipping/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(
        "Failed to add shipping address:",
        res.status,
        res.statusText,
        errorData
      );
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding shipping address:", error);
    return null;
  }
};

export const updateShippingAddress = async (
  addressData: Partial<ShippingAddress>
): Promise<ShippingAddress | null> => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No authentication token found");
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/shipping/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(
        "Failed to update shipping address:",
        res.status,
        res.statusText,
        errorData
      );
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating shipping address:", error);
    return null;
  }
};

export const deleteShippingAddress = async (id: number): Promise<boolean> => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/shipping-addresses/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to delete shipping address:",
        res.status,
        res.statusText
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting shipping address:", error);
    return false;
  }
};

export const setDefaultShippingAddress = async (
  id: number
): Promise<boolean> => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No authentication token found");
      return false;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/shipping/make_default`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to set default shipping address:",
        res.status,
        res.statusText
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error setting default shipping address:", error);
    return false;
  }
};

export const getCountries = async () => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No authentication token found");
      return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/countries`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch shipping addresses:",
        res.status,
        res.statusText
      );
      return [];
    }
    const d = await res.json();
    console.log(d);

    return d.data;
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    return [];
  }
};

export const getCitiesBYState = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cities-by-state/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch shipping addresses:",
        res.status,
        res.statusText
      );
      return [];
    }
    const d = await res.json();
    console.log(d);

    return d.data;
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    return [];
  }
};
export const getSateByCountry = async (id: string) => {
  console.log(id);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/states-by-country/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch shipping addresses:",
        res.status,
        res.statusText
      );
      return [];
    }
    const d = await res.json();
    console.log(d);

    return d.data;
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    return [];
  }
};
