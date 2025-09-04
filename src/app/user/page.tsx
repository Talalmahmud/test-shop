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
  Plus,
  Trash2,
  MoreVertical,
  Check,
} from "lucide-react";
import {
  addShippingAddress,
  getShippingAddresses,
  getUserProfile,
  updateShippingAddress,
} from "@/services/user";
import { updateUserProfile } from "../action";

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
  avatar?: string | null;
  avatar_original: string | null;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  postal_code: string | null;
  phone: string | null;
  balance: number | 0;
  banned: number;
  referral_code: string | null;
  customer_package_id: number | null;
  remaining_uploads: number;
  created_at: string | null;
  updated_at: string;
}

interface ShippingAddress {
  id: number;
  user_id: number;
  address: string;
  country_id: number;
  state_id: number;
  city_id: number;
  postal_code: string;
  phone: string;
  latitude: string;
  longitude: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Mock data for countries, states, and cities
const countries = [
  { id: 1, name: "United States" },
  { id: 2, name: "Canada" },
  { id: 3, name: "United Kingdom" },
];

const states = [
  { id: 1, country_id: 1, name: "California" },
  { id: 2, country_id: 1, name: "New York" },
  { id: 3, country_id: 1, name: "Texas" },
  { id: 4, country_id: 2, name: "Ontario" },
  { id: 5, country_id: 2, name: "Quebec" },
  { id: 6, country_id: 3, name: "England" },
];

const cities = [
  { id: 1, state_id: 1, name: "Los Angeles" },
  { id: 2, state_id: 1, name: "San Francisco" },
  { id: 3, state_id: 2, name: "New York City" },
  { id: 4, state_id: 2, name: "Buffalo" },
  { id: 5, state_id: 3, name: "Houston" },
  { id: 6, state_id: 3, name: "Austin" },
  { id: 7, state_id: 4, name: "Toronto" },
  { id: 8, state_id: 4, name: "Ottawa" },
  { id: 9, state_id: 5, name: "Montreal" },
  { id: 10, state_id: 5, name: "Quebec City" },
  { id: 11, state_id: 6, name: "London" },
  { id: 12, state_id: 6, name: "Manchester" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(
    null
  );
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [user, setUser] = useState<UserProfile>({
    id: 73,
    referred_by: null,
    provider: null,
    provider_id: null,
    refresh_token: null,
    access_token: null,
    user_type: "customer",
    name: "",
    email: "",
    email_verified_at: "",
    verification_code: null,
    new_email_verificiation_code: "",
    device_token: null,
    avatar: null,
    avatar_original: null,
    address: "",
    country: "",
    state: null,
    city: "",
    postal_code: null,
    phone: "",
    balance: 0,
    banned: 0,
    referral_code: null,
    customer_package_id: null,
    remaining_uploads: 0,
    created_at: null,
    updated_at: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [addressForm, setAddressForm] = useState({
    address: "",
    postal_code: "",
    phone: "",
  });

  // Mock shipping addresses data with the new structure
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>(
    [
      {
        id: 1,
        user_id: 73,
        address: "123 Main Street, Apt 4B",
        country_id: 1,
        state_id: 2,
        city_id: 3,
        postal_code: "10001",
        phone: "+1 (555) 123-4567",
        latitude: "40.7128",
        longitude: "-74.0060",
        is_default: true,
        created_at: "2023-01-15T10:30:00Z",
        updated_at: "2023-01-15T10:30:00Z",
      },
      {
        id: 2,
        user_id: 73,
        address: "456 Office Park, Suite 300",
        country_id: 1,
        state_id: 2,
        city_id: 4,
        postal_code: "10002",
        phone: "+1 (555) 987-6543",
        latitude: "40.7282",
        longitude: "-73.7942",
        is_default: false,
        created_at: "2023-03-22T14:45:00Z",
        updated_at: "2023-03-22T14:45:00Z",
      },
    ]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Call the update API
      const updatedUser = await updateUserProfile(
        formData.name,
        formData.phone,
        formData.address
      );

      // Update the user state with the response
      fetchData();
      setIsEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to current user data
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    });
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      address: "",
      postal_code: "",
      phone: user.phone || "",
    });
    setShowAddressForm(true);
    setActiveMenu(null);
  };

  const handleEditAddress = (address: ShippingAddress) => {
    setEditingAddress(address);
    setAddressForm({
      address: address.address,
      postal_code: address.postal_code,
      phone: address.phone,
    });
    setShowAddressForm(true);
    setActiveMenu(null);
  };

  const handleSetDefaultAddress = (id: number) => {
    setShippingAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        is_default: addr.id === id,
      }))
    );
    alert("Default address updated successfully");
    setActiveMenu(null);
  };

  const handleSaveAddress = async () => {
    if (editingAddress) {
      // Update existing address
      const newAddress = {
        id:editingAddress.id,
        address: editingAddress.address,
        country_id: 1, // Default country_id
        state_id: 5, // Default state_id
        city_id: 10, // Default city_id
        postal_code: editingAddress.postal_code,
        phone: editingAddress.phone,
       
      };

      const resEditDdata = await updateShippingAddress(
     
        newAddress
      );
      fetchAddress();

      alert("Address updated successfully");
    } else {
      // Add new address - using default values for country, state, city, and coordinates
      const newAddress = {
        address: addressForm.address,
        country_id: 1, // Default country_id
        state_id: 5, // Default state_id
        city_id: 10, // Default city_id
        postal_code: addressForm.postal_code,
        phone: addressForm.phone,
        latitude: "40.7128", // Default latitude
        longitude: "-74.0060", // Default longitude
      };
      const resDdata = await addShippingAddress(newAddress);
      fetchAddress();
      alert("Address added successfully");
    }

    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: number) => {
    setShippingAddresses((prev) => prev.filter((addr) => addr.id !== id));
    alert("Address deleted successfully");
    setActiveMenu(null);
  };

  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser((prev) => ({ ...prev, avatar: e.target?.result as string }));
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

  const getCountryName = (countryId: number) => {
    return (
      countries.find((country) => country.id === countryId)?.name ||
      "Unknown Country"
    );
  };

  const getStateName = (stateId: number) => {
    return (
      states.find((state) => state.id === stateId)?.name || "Unknown State"
    );
  };

  const getCityName = (cityId: number) => {
    return cities.find((city) => city.id === cityId)?.name || "Unknown City";
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getUserProfile();
      setUser(res);
      // Initialize form data with user data
      setFormData({
        name: res.name,
        email: res.email,
        phone: res.phone || "",
        address: res.address || "",
      });
    } catch (err) {
      console.error("Failed to load profile", err);
      alert("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddress = async () => {
    setIsLoading(true);
    try {
      const res = await getShippingAddresses();
      setShippingAddresses(res);
      // Initialize form data with user data
    } catch (err) {
      console.error("Failed to load profile", err);
      alert("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAddress();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

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
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              {isSaving ? "Saving..." : "Save Changes"}
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
                <AvatarImage
                  src={
                    user.avatar ||
                    "https://lh3.googleusercontent.com/-7OnRtLyua5Q/AAAAAAAAAAI/AAAAAAAADRk/VqWKMl4f8CI/photo.jpg?sz=50"
                  }
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {getInitials(user.name)}
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-sm">{user.phone || "Not provided"}</p>
              )}
            </div>

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
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  rows={3}
                />
              ) : (
                <p className="text-sm">{user.address || "Not provided"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Information Card (Read-only) */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>User Type</Label>
                <p className="text-sm capitalize text-muted-foreground">
                  {user.user_type}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Account Balance</Label>
                <p className="text-sm text-muted-foreground">${user.balance}</p>
              </div>

              {/* <div className="space-y-2">
                <Label>Account Status</Label>
                <p className="text-sm text-muted-foreground">
                  {user.banned ? (
                    <span className="text-red-600">Banned</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </p>
              </div> */}

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

      {/* Shipping Addresses Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Shipping Addresses</CardTitle>
            <CardDescription>
              Manage your shipping addresses for orders
            </CardDescription>
          </div>
          <Button
            onClick={handleAddAddress}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        </CardHeader>
        <CardContent>
          {showAddressForm ? (
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={addressForm.address}
                    onChange={handleAddressInputChange}
                    placeholder="Full address"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      name="postal_code"
                      value={addressForm.postal_code}
                      onChange={handleAddressInputChange}
                      placeholder="Postal code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressInputChange}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="space-y-2 p-2 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Country, State, City, and Coordinates are set to default
                    values and cannot be changed.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSaveAddress}>
                  {editingAddress ? "Update Address" : "Add Address"}
                </Button>
                <Button variant="outline" onClick={handleCancelAddress}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}

          {shippingAddresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first shipping address to make checkout faster
              </p>
              <Button onClick={handleAddAddress}>Add Your First Address</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shippingAddresses.map((address) => (
                <div
                  key={address.id}
                  className="border rounded-lg p-4 relative"
                >
                  {address.is_default && (
                    <span className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">
                      {getCountryName(address.country_id)} -{" "}
                      {getStateName(address.state_id)}
                    </h3>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleMenu(address.id)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>

                      {activeMenu === address.id && (
                        <div className="absolute right-0 top-10 bg-background border rounded-md shadow-lg z-10 w-32">
                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center"
                            onClick={() => handleSetDefaultAddress(address.id)}
                          >
                            {address.is_default ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : (
                              <span className="w-4 h-4 mr-2"></span>
                            )}
                            Default
                          </button>
                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center"
                            onClick={() => handleEditAddress(address)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-muted text-destructive flex items-center"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm mb-2">
                    {address.address}
                    <br />
                    {getCityName(address.city_id)},{" "}
                    {getStateName(address.state_id)} {address.postal_code}
                    <br />
                    {getCountryName(address.country_id)}
                    <br />
                    {address.phone}
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Coordinates: {address.latitude}, {address.longitude}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
