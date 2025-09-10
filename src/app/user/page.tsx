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
  upload: {
    file_original_name: string;
    file_name: string;
  };
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data
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

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle avatar select with validation
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate type
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("❌ Only PNG, JPEG, JPG, and WEBP files are allowed.");
        return;
      }

      // Validate size (≤2MB)
      if (file.size > 1 * 1024 * 1024) {
        setError("❌ File size must be less than 1MB.");
        return;
      }

      // Convert to base64 for preview
      try {
        const base64 = await fileToBase64(file);
        setAvatarBase64(base64);
        setAvatarFileName(file.name);
      } catch {
        setError("❌ Failed to read file. Please try again.");
      }
    }
  };

  // Upload avatar to API
  const handleUploadImage = async () => {
    setError(null);

    if (!avatarBase64 || !avatarFileName) {
      setError("❌ Please select a valid image before uploading.");
      return;
    }

    setIsUploading(true);
    try {
      await updateUserImage({ image: avatarBase64, filename: avatarFileName });
      await fetchData();
      setIsEditing(false);
      setAvatarBase64(null);
      setAvatarFileName(null);
      alert("✅ Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to upload image. Please try again.");
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
  console.log(user);
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
            <div className="flex items-center gap-6">
              {/* Show preview if a new image is selected, else show current avatar */}
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={
                    avatarBase64 || user.upload
                      ? user.upload.file_name
                      : "https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
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

                  {avatarBase64 && !error && (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Preview before saving
                      </p>
                      <Button
                        onClick={handleUploadImage}
                        disabled={isUploading}
                        className="w-fit"
                      >
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </>
                  )}

                  {error && <p className="text-sm text-red-500">{error}</p>}
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
