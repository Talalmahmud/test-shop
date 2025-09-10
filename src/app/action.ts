"use server";

import { getToken } from "@/services/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const userLogin = async (
  email: string,
  password: string,
  remember: boolean
) => {
  const cookie = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, remember_me: remember }),
  });

  if (!res.ok) return false;

  const resData = await res.json();
  if (!resData?.access_token) throw new Error("No token received");

  cookie.set("token", resData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days or session cookie
  });

  return true;
};

export const userSignUp = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email_or_phone: email,
      password,
      name,
      register_by: "email",
    }),
  });
  console.log(res);

  if (!res.ok) console.log(`Signup failed: ${res.status}`);

  const resData = await res.json();

  return resData;
};

export const updateUserProfile = async (
  name: string,
  phone: string,
  address: string
) => {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        phone,
        address,
      }),
    }
  );
  console.log(res);

  if (!res.ok) console.log(`Password Changed failed: ${res.status}`);

  const resData = await res.json();

  console.log(resData);
};

export const userPasswordChange = async (password: string) => {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
      }),
    }
  );
  console.log(res);

  if (!res.ok) console.log(`Password Changed failed: ${res.status}`);

  const resData = await res.json();

  console.log(resData);
};
export const userLogOut = async () => {
  const cookie = await cookies();

  cookie.delete("token");

  redirect("/");
};
