// app/dashboard/profile/shipping-address-section.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Check, Trash2 } from "lucide-react";

import {
  addShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  setDefaultShippingAddress,
  getCountries,
  getSateByCountry,
  getCitiesBYState,
} from "@/services/user";
import { Combobox } from "@/components/shared/combobox";

interface ShippingAddress {
  id: number;
  address: string;
  postal_code: string;
  phone: string;
  set_default: number;
  country_id: number;
  state_id: number;
  city_id: number;
  country_name?: string;
  state_name?: string;
  city_name?: string;
}

interface LocationType {
  id: string;
  name: string;
}

export function ShippingAddressSection({ userId }: { userId: number }) {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ShippingAddress | null>(null);

  const [addressForm, setAddressForm] = useState({
    address: "",
    postal_code: "",
    phone: "",
  });

  const [countryList, setCountryList] = useState<LocationType[]>([]);
  const [stateList, setStateList] = useState<LocationType[]>([]);
  const [cityList, setCityList] = useState<LocationType[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const fetchAddresses = async () => {
    const res = await getShippingAddresses();
    setAddresses(res);
  };

  const fetchCountries = async () => {
    const res = await getCountries();
    setCountryList(res);
  };

  const fetchStates = async (countryId: string) => {
    const res = await getSateByCountry(countryId);
    console.log(res);
    setStateList(res);
  };

  const fetchCities = async (stateId: string) => {
    const res = await getCitiesBYState(stateId);
    setCityList(res);
  };

  useEffect(() => {
    fetchAddresses();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) fetchStates(selectedCountry?.value);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) fetchCities(selectedState?.value);
  }, [selectedState]);

  const handleSave = async () => {
    if (editing) {
      await updateShippingAddress({
        ...editing,
        ...addressForm,
        country_id: Number(selectedCountry?.value),
        state_id: Number(selectedState?.value),
        city_id: Number(selectedCity?.value),
      });
    } else {
      await addShippingAddress({
        ...addressForm,
        country_id: Number(selectedCountry?.value),
        state_id: Number(selectedState?.value),
        city_id: Number(selectedCity?.value),
        latitude: "0",
        longitude: "0",
      });
    }
    fetchAddresses();
    setShowForm(false);
    setEditing(null);
  };

  const handleSetDefault = async (id: number) => {
    await setDefaultShippingAddress(id);
    fetchAddresses();
  };
  console.log(selectedCountry);
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Shipping Addresses</CardTitle>
          <CardDescription>Manage your saved addresses</CardDescription>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Address
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Edit Address" : "New Address"}
            </h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Street Address"
                value={addressForm.address}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, address: e.target.value }))
                }
              />
              <Input
                placeholder="Postal Code"
                value={addressForm.postal_code}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, postal_code: e.target.value }))
                }
              />
              <Input
                placeholder="Phone"
                value={addressForm.phone}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <Combobox
                options={countryList?.map((item) => ({
                  label: item?.name,
                  value: item.id,
                }))}
                value={selectedCountry}
                onValueChange={setSelectedCountry}
                placeholder="Select country"
              />
              <Combobox
                options={stateList?.map((item) => ({
                  label: item?.name,
                  value: item.id,
                }))}
                value={selectedState}
                onValueChange={setSelectedState}
                placeholder="Select State"
              />
              <Combobox
                options={cityList?.map((item) => ({
                  label: item?.name,
                  value: item.id,
                }))}
                value={selectedCity}
                onValueChange={setSelectedCity}
                placeholder="Select City"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{addr.address}</p>
                <p className="text-sm text-muted-foreground">
                  {addr.city_name}, {addr.state_name}, {addr.country_name}
                </p>
                <p className="text-sm">{addr.phone}</p>
                {addr.set_default === 1 && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditing(addr);
                    setAddressForm({
                      address: addr.address,
                      postal_code: addr.postal_code,
                      phone: addr.phone,
                    });
                    setSelectedCountry({
                      label: String(addr.country_name),
                      value: String(addr.country_id),
                    });
                    setSelectedState({
                      label: String(addr.state_name),
                      value: String(addr.state_id),
                    });
                    setSelectedCity({
                      label: String(addr.city_name),
                      value: String(addr.city_id),
                    });
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(addr.id)}
                >
                  Set Default
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
