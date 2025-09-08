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

import { getUserProfile, updateUserImage } from "@/services/user";
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
  const [isUploading, setIsUploading] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);

  // Fetch profile data
  const fetchData = async () => {
    const res = await getUserProfile();
    console.log(res);
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

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle avatar select
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      setAvatarBase64(base64);
      setAvatarFileName(file.name);
    }
  };

  // Upload avatar to API
  const handleUploadImage = async () => {
    console.log({ image: avatarBase64, fileName: avatarFileName });
    if (!avatarBase64 || !avatarFileName) return;

    setIsUploading(true);
    try {
      await updateUserImage({ image: avatarBase64, filename: avatarFileName });
      fetchData();
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Save profile
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
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle className="flex justify-between">
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
                <AvatarImage
                  src={avatarBase64 || user.avatar || ""}
                  alt={user.name}
                />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>

              {isEditing && (
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="avatar"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" /> Select Photo
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </Label>

                  {avatarBase64 && (
                    <Button
                      onClick={handleUploadImage}
                      disabled={isUploading}
                      className="w-fit"
                    >
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  )}
                </div>
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
