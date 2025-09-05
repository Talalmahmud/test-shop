// components/user-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Key, ShoppingBag, Ticket, LogOut, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userLogOut } from "@/app/action";
import { useCart } from "../CartContext";

interface UserSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserSidebar({ user }: UserSidebarProps) {
  const { fetchCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      label: "Profile",
      href: "/user",
      icon: User,
    },
    {
      label: "Change Password",
      href: "/user/change",
      icon: Key,
    },
    {
      label: "Orders",
      href: "/user/order",
      icon: ShoppingBag,
    },
    {
      label: "Support Tickets",
      href: "/user/tickets",
      icon: Ticket,
    },
  ];

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const res = await userLogOut();
      fetchCart();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Desktop sidebar
  return (
    <div className=" w-16 md:w-64 bg-background border-r sticky left-0 top-10">
      {/* Sidebar Content */}
      <div className="flex flex-col p-2">
        {/* User Info */}
        {user && (
          <div className="mb-8 p-4 rounded-lg bg-muted">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-colors hover:bg-accent hover:text-accent-foreground
                  ${isActive ? "bg-primary text-primary-foreground" : ""}
                `}
              >
                <IconComponent className="min-h-5 min-w-5" />
                <span className=" hidden md:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="min-h-5 min-w-5 mr-3" />
            <span className=" md:block hidden"> Log out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
