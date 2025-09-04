// components/user-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Key,
  ShoppingBag,
  Heart,
  Ticket,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userLogOut } from "@/app/action";

interface UserSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserSidebar({ user }: UserSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    // {
    //   label: "Wishlist",
    //   href: "/wishlist",
    //   icon: Heart,
    // },
    {
      label: "Support Tickets",
      href: "/user/tickets",
      icon: Ticket,
    },
    // {
    //   label: "Settings",
    //   href: "/settings",
    //   icon: Settings,
    // },
  ];

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const res = await userLogOut();

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
           h-screen w-64 bg-background border-r 
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full p-6">
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
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
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
              <LogOut className="h-5 w-5 mr-3" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
