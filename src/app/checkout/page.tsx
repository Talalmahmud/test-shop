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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  User,
  Mail,
  CreditCard,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  X,
} from "lucide-react";
import {
  deleteCart,
  getCart,
  getCartSummary,
  updateQuantityCart,
} from "@/services/cart";
import { SheetFooter } from "@/components/ui/sheet";
import Image from "next/image";

interface CartItem {
  id: number;
  product_name: string;
  product_thumbnail_image: string;
  variation: string;
  price: number;
  currency_symbol: string;
  tax: number;
  shipping_cost: number;
  quantity: number;
  lower_limit: number;
  upper_limit: number;
  in_stock: number;
}

interface CartPrice {
  sub_total: string;
  tax: string;
  shipping_cost: string;
  discount: string;
  grand_total: string;
  grand_total_value: number;
  coupon_code: string | null;
  coupon_applied: false;
}
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartPrice, setCartPrice] = useState<CartPrice>({
    sub_total: "",
    tax: "",
    shipping_cost: "",
    discount: "",
    grand_total: "",
    grand_total_value: 0,
    coupon_code: null,
    coupon_applied: false,
  });
  // Update quantity with rules
  const updateQuantity = async (id: number, newQuantity: number) => {
    const res = await updateQuantityCart(id, newQuantity);
    fetchData();
    fetchPriceData();
  };

  const fetchData = async () => {
    try {
      const res = await getCart();
      console.log(res);
      if (res.length > 0) {
        setCartItems(res[0].cart_items);
      } else {
        setCartItems([]);
      }
      // assuming `res` is an array of cart items
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  const fetchPriceData = async () => {
    try {
      const res = await getCartSummary();
      setCartPrice(res);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  const removeItem = async (id: number) => {
    const res = await deleteCart(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    fetchPriceData();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cash",
    notes: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = 60;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
          <h1 className="text-2xl font-bold ml-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - User Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                <CardDescription>
                  Please fill in your details to complete your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="01XXX-XXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Delivery Address *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="House #, Road #, Area, District"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Dhaka"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="1200"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>

                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: value,
                        }))
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span>Cash on Delivery</span>
                            <Badge variant="outline" className="ml-2">
                              Recommended
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground font-normal">
                            Pay when you receive your order
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="bkash" id="bkash" />
                        <Label
                          htmlFor="bkash"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span>bKash</span>
                            <Badge variant="secondary">Popular</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground font-normal">
                            Pay securely with bKash
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Special instructions for delivery"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full py-6 text-lg">
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mr-2" />
              Your information is secure and encrypted
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div>
            {/* <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cartItems.length} items in your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-sm"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-medium">
                        ৳{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Shipping
                    </span>
                    <span>৳{shippingFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>৳{total}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4" />
                    Secure Checkout
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your personal information is encrypted and secure. We never
                    share your details with third parties.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium mb-2">Delivery Information</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Inside Dhaka: 2 days delivery</li>
                    <li>• Outside Dhaka: 2-3 days delivery</li>
                    <li>• Cash on Delivery available</li>
                  </ul>
                </div>
              </CardContent>
            </Card> */}
            <div className="flex flex-col overflow-y-auto sticky top-6">
              <div className="space-y-6 h-[400px] overflow-y-auto">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex border-b pb-6">
                      {/* Product Image */}
                      <div className="w-20 h-24 rounded-md mr-4 flex-shrink-0 overflow-hidden relative border">
                        <Image
                          src={item.product_thumbnail_image}
                          alt={item.product_name}
                          fill
                          className="object-fill"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.product_name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.variation}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Control */}
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 px-2"
                              disabled={item.quantity <= item.lower_limit}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 px-2"
                              disabled={
                                item.quantity >=
                                Math.min(item.upper_limit, item.in_stock)
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-semibold">
                              {item.currency_symbol}
                              {item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No cart items</p>
                )}
              </div>

              {/* Order Summary */}

              <div className="border-t pt-4 mt-4 w-full">
                <div className="flex justify-between text-lg font-bold mb-2">
                  <span>Total</span>
                  <span>{cartPrice.grand_total}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
