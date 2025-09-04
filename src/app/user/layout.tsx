// app/layout.tsx
import { UserSidebar } from "@/components/shared/user-menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "User info",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex gap-2">
      <UserSidebar />

      <div className=" w-full">{children}</div>
    </div>
  );
}
