"use server";

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

  if (!res.ok) throw new Error(`Login failed: ${res.status}`);

  const resData = await res.json();
  if (!resData?.access_token) throw new Error("No token received");

  cookie.set("token", resData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days or session cookie
  });

  redirect("/user");
};

export const userLogOut = async () => {
  const cookie = await cookies();

  cookie.delete("token");

  redirect("/");
};
