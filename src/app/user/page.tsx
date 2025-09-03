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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  Save,
  Edit,
  Mail,
  Phone,
  MapPin,
  Globe,
  Building,
} from "lucide-react";
import { getUserProfile } from "@/services/user";

interface UserProfile {
  id: number;
  referred_by: string | null;
  provider: string | null;
  provider_id: string | null;
  refresh_token: string | null;
  access_token: string | null;
  user_type: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  verification_code: string | null;
  new_email_verificiation_code: string | null;
  device_token: string | null;
  avatar: string | null;
  avatar_original: string | null;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  postal_code: string | null;
  phone: string | null;
  balance: number;
  banned: number;
  referral_code: string | null;
  customer_package_id: number | null;
  remaining_uploads: number;
  created_at: string | null;
  updated_at: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data based on your structure
  const [user, setUser] = useState<UserProfile>({
    id: 73,
    referred_by: null,
    provider: null,
    provider_id: null,
    refresh_token: null,
    access_token: null,
    user_type: "customer",
    name: "sabrina",
    email: "01817291787@gmail.com",
    email_verified_at: "2022-11-30 20:54:26",
    verification_code: null,
    new_email_verificiation_code: "DEAAD4rPI3xGceg2D9Ot3skSEN8BZld5",
    device_token: null,
    avatar:
      "https://lh3.googleusercontent.com/-7OnRtLyua5Q/AAAAAAAAAAI/AAAAAAAADRk/VqWKMl4f8CI/photo.jpg?sz=50",
    avatar_original: null,
    address: "house 3, road 3, sector 5. uttara",
    country: "Us",
    state: null,
    city: "inside dhaka",
    postal_code: null,
    phone: "01740816676",
    balance: 0,
    banned: 0,
    referral_code: null,
    customer_package_id: null,
    remaining_uploads: 0,
    created_at: null,
    updated_at: "2025-08-30T11:48:11.000000Z",
  });

  const [formData, setFormData] = useState<UserProfile>(user);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data
      setUser(formData);
      setIsEditing(false);

      console.log("Profile updated successfully:", formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const fetchData = async () => {
    try {
      const res = await getUserProfile();
      setUser(res);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and settings
          </p>
        </div>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? "Saving..." : "Save Changes"}
              <Save className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar || ""} alt={formData.name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <Camera className="h-4 w-4" />
                      Change photo
                    </div>
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-sm">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm">{user.email}</p>
                  {user.email_verified_at && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-sm">{user.phone || "Not provided"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>Your location details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows={3}
                />
              ) : (
                <p className="text-sm">{user.address || "Not provided"}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                City
              </Label>
              {isEditing ? (
                <Input
                  id="city"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              ) : (
                <p className="text-sm">{user.city || "Not provided"}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Country
              </Label>
              {isEditing ? (
                <Input
                  id="country"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your country"
                />
              ) : (
                <p className="text-sm">{user.country || "Not provided"}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>User Type</Label>
              <p className="text-sm capitalize text-muted-foreground">
                {user.user_type}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Account Balance</Label>
              <p className="text-sm text-muted-foreground">
                ${user.balance.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Account Status</Label>
              <p className="text-sm text-muted-foreground">
                {user.banned ? "Banned" : "Active"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Member Since</Label>
              <p className="text-sm text-muted-foreground">
                {formatDate(user.created_at)}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Last Updated</Label>
              <p className="text-sm text-muted-foreground">
                {formatDate(user.updated_at)}
              </p>
            </div>

            {user.referral_code && (
              <div className="space-y-2">
                <Label>Referral Code</Label>
                <p className="text-sm text-muted-foreground">
                  {user.referral_code}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
