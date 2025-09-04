"use client";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import {
  deleteCart,
  getCart,
  getCartSummary,
  updateQuantityCart,
} from "@/services/cart";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "../CartContext";

// Type from your backend response
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

const Cart = () => {
    const { isOpen, closeCart, cartItems, cartPrice, updateQuantity, removeItem } = useCart();

 

  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={closeCart}>
        <SheetTrigger className="h-8 px-4 font-bold text-[14px] bg-gray-200 rounded-full flex justify-center gap-[2px] items-center">
          <span className="hidden md:block">Cart</span> ({cartItems.length})
          <span className="block md:hidden h-2 w-2 bg-black rounded-full"></span>
        </SheetTrigger>

        <SheetContent className="px-4 min-w-full sm:min-w-[400px]">
          <SheetHeader className="mb-6 ">
            <SheetTitle className="flex justify-between items-center font-bold">
              <SheetClose asChild>
                <button className="flex items-center text-blue-600 text-[24px] font-medium hover:underline">
                  <ArrowLeft className="mr-2" />
                  Back to Shopping
                </button>
              </SheetClose>

              <div className="flex justify-center items-center gap-1 text-[14px] px-3 h-10 rounded-full bg-black text-white">
                ({cartItems.length})
                <div className="bg-white h-4 w-4 rounded-full"></div>
              </div>
            </SheetTitle>
            <SheetDescription className="text-base"></SheetDescription>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex flex-col overflow-y-auto">
            <div className="space-y-6">
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
            <SheetFooter>
              <div className="border-t pt-4 mt-4 w-full">
                <div className="flex justify-between text-lg font-bold mb-2">
                  <span>Total</span>
                  <span>{cartPrice.grand_total}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Shipping & taxes calculated at checkout
                </p>
                <SheetClose asChild>
                  <Link className="w-full" href={"/checkout"}>
                    <Button> Checkout</Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
