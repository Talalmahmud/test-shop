// app/dashboard/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Edit, Mail, Phone } from "lucide-react";

import { getUserProfile } from "@/services/user";
import { updateUserProfile } from "../action";
import { ShippingAddressSection } from "@/components/shared/user-shipping-address";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  created_at: string | null;
  updated_at: string;
  user_type: string;
  balance: number;
  referral_code: string | null;
  email_verified_at: string | null;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const fetchData = async () => {
    const res = await getUserProfile();
    setUser(res);
    setFormData({
      name: res.name,
      email: res.email,
      phone: res.phone || "",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(formData.name, formData.phone, formData.email);
      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and settings
          </p>
        </div>
      </div>

      {/* Personal Info */}
      <div className=" w-full flex flex-col lg:flex-row gap-6">
        <Card className=" w-full lg:w-1/2">
          <CardHeader>
            <CardTitle className=" flex justify-between">
              Personal Information{" "}
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                    <Save className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || ""} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Camera className="h-4 w-4" /> Change Photo
                  <Input id="avatar" type="file" className="hidden" />
                </Label>
              )}
            </div>

            {/* Name */}
            <div>
              <Label>Name</Label>
              {isEditing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label>
                Email <Mail size={14} />
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label>
                Phone <Phone size={14} />
              </Label>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              ) : (
                <p>{user.phone || "Not provided"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address Section */}
        <ShippingAddressSection userId={user.id} />
      </div>
    </div>
  );
}
