"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ArrowLeft, Minus, Plus, X } from "lucide-react";

// Define product type
interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
}

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "AO Jogger",
      variant: "Black / XS",
      price: 11100,
      originalPrice: 15800,
      quantity: 1,
    },
    {
      id: 2,
      name: "AO Curve-Hem Tee",
      variant: "Cadet Blue / S",
      price: 4300,
      originalPrice: 7300,
      quantity: 2,
    },
    {
      id: 3,
      name: "AO Jogger",
      variant: "Black / XS",
      price: 11100,
      originalPrice: 15800,
      quantity: 1,
    },
    {
      id: 4,
      name: "AO Curve-Hem Tee",
      variant: "Cadet Blue / S",
      price: 4300,
      originalPrice: 7300,
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="h-8 px-4 font-bold text-[14px] bg-gray-200 rounded-full flex justify-center items-center">
          Cart ({cartItems.length})
        </SheetTrigger>
        <SheetContent className="px-4 min-w-full sm:min-w-[400px]">
          <SheetHeader className="mb-6 ">
            <SheetTitle className="flex justify-between items-center font-bold ">
              {/* Back button (using SheetClose) */}
              <SheetClose asChild>
                <button className="flex items-center text-blue-600 text-[24px] font-medium hover:underline">
                  <ArrowLeft className="mr-2" />
                  Back to Shopping
                </button>
              </SheetClose>

              {/* Cart count */}
              <div className="flex justify-center items-center gap-1 text-[14px] px-3 h-10 rounded-full bg-black text-white">
                ({cartItems.length})
                <div className="bg-white h-4 w-4 rounded-full"></div>
              </div>
            </SheetTitle>
            <SheetDescription className="text-base"></SheetDescription>
          </SheetHeader>

          <div className="flex flex-col  overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
              {/* Back to Shopping link */}

              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b pb-6">
                    {/* Product Image Placeholder */}
                    <div className="w-20 h-24 bg-gray-200 rounded-md mr-4 flex-shrink-0"></div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.variant}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 px-2"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 px-2"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              BDT {item.originalPrice * item.quantity}
                            </p>
                          )}
                          <p className="font-semibold">
                            BDT {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* VIP Membership Banner */}
              {/* <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-lg mb-2">
                  Join our VIP Membership
                </h4>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-start">
                    <span className="mr-2">🔍</span>
                    <span>Earn 20% store credit on every purchase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🚚</span>
                    <span>
                      Get Free US Express Shipping - Save $15 per order
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💳</span>
                    <span>
                      $120 Annual credit - $10 today, $10 every month after
                    </span>
                  </li>
                </ul>
                <button className="w-full bg-black text-white py-2 rounded-md text-sm font-medium">
                  Add To Cart
                </button>
              </div> */}
            </div>

            {/* Order Summary */}
          </div>
          <SheetFooter>
            {" "}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold mb-2">
                <span>Total</span>
                <span>BDT {subtotal}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Shipping & taxes calculated at checkout
              </p>
              <button className="w-full bg-black text-white py-3 rounded-md font-medium">
                Checkout
              </button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
