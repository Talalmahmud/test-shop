"use client";
import React from "react";
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
import { ArrowLeft, Minus, Plus, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "../CartContext";

const Cart = () => {
  const {
    isOpen,
    closeCart,
    cartItems,
    cartPrice,
    updateQuantity,
    removeItem,
    openCart,
  } = useCart();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
    >
      {/* Cart Trigger Button */}
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="p-0 flex flex-col w-full sm:max-w-md">
        {/* Header */}
        <SheetHeader className="px-4 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span className="text-lg font-semibold">Continue Shopping</span>
              </button>
            </SheetClose>

            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-lg font-bold">Cart</span>
              {cartItems.length > 0 && (
                <span className="bg-black text-white text-sm font-medium px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
          <SheetDescription className="sr-only">
            Your shopping cart items and summary
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden border flex-shrink-0">
                    <Image
                      src={item.product_thumbnail_image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                        {item.product_name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {item.variation && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                        {item.variation}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {/* Quantity Control */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= item.lower_limit}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={
                            item.quantity >=
                            Math.min(item.upper_limit, item.in_stock)
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-sm sm:text-base">
                          {item.currency_symbol}
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            {item.currency_symbol}
                            {item.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Cart State */
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add some items to get started
              </p>
              <SheetClose asChild>
                <Button>Start Shopping</Button>
              </SheetClose>
            </div>
          )}
        </div>

        {/* Footer - Order Summary (only show when cart has items) */}
        {cartItems.length > 0 && (
          <SheetFooter className="px-4 py-4 border-t bg-gray-50 sticky bottom-0">
            <div className="w-full">
              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                {cartPrice.sub_total && (
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{cartPrice.sub_total}</span>
                  </div>
                )}

                {cartPrice.tax && parseFloat(cartPrice.tax) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{cartPrice.tax}</span>
                  </div>
                )}

                {cartPrice.shipping_cost && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{cartPrice.shipping_cost}</span>
                  </div>
                )}

                {cartPrice.discount && parseFloat(cartPrice.discount) > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{cartPrice.discount}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center text-lg font-bold border-t pt-3 mb-4">
                <span>Total</span>
                <span className="text-xl">{cartPrice.grand_total}</span>
              </div>

              {/* Checkout Button */}
              <SheetClose asChild>
                <Link href="/checkout" className="block w-full">
                  <Button className="w-full py-3 text-base font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>
              </SheetClose>

              {/* Additional Info */}
              <p className="text-xs text-gray-500 text-center mt-3">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
