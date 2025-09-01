"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Component for client-side interactions
export default function ProductDetailClient({ product2 }: { product2: any }) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [selectedColor, setSelectedColor] = useState<string>(
    product2.colors[0] || ""
  );

  // Extract option names from choice_options
  const optionNames = product2.choice_options.map(
    (option: { name: string }) => option.name
  );

  // Handle option selection
  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Find the selected variant based on choices
  const findSelectedVariant = () => {
    if (
      Object.keys(selectedOptions).length === product2.choice_options.length
    ) {
      const variantName = `${selectedColor}-${Object.values(
        selectedOptions
      ).join("-")}`;
      return product2.stocks.find(
        (stock: { variant: string }) => stock.variant === variantName
      );
    }
    return null;
  };

  const selectedVariant = findSelectedVariant();
  const currentPrice =
    selectedVariant?.discounted_price || product2.calculable_price;
  const currentStock = selectedVariant?.qty || product2.current_stock;
  const canAddToCart = product2.can_add_to_cart && currentStock > 0;

  return (
    <div>
      <section className="w-full px-6 md:px-7 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left - Images */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-screen overflow-y-auto scrollbar-hide">
          {product2.photos.map((photo: { path: string }, i: number) => (
            <div
              key={i}
              className="relative w-full h-[450px] rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={photo.path}
                alt={`${product2.name} ${i + 1}`}
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Right - Details */}
        <div>
          {/* Shop Info */}
          <div className="flex items-center gap-2 mb-4">
            {product2.shop_logo && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={product2.shop_logo}
                  alt={product2.shop_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm text-gray-600">{product2.shop_name}</span>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < product2.rating ? "fill-yellow-500" : "fill-gray-200"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({product2.rating_count} reviews)
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mt-2">{product2.name}</h1>

          {/* Price */}
          <div className="mt-3">
            <p className="text-red-600 font-semibold text-xl">
              {product2.currency_symbol} {currentPrice.toLocaleString()}
            </p>
            {product2.has_discount && (
              <p className="line-through text-gray-400 text-sm">
                {product2.stroked_price}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            <p
              className={`text-sm ${
                currentStock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {currentStock > 0
                ? `In Stock (${currentStock} available)`
                : "Out of Stock"}
            </p>
          </div>

          {/* Colors */}
          {product2.colors.length > 0 && (
            <div className="mt-5">
              <p className="font-medium">Colors</p>
              <div className="flex gap-2 mt-2">
                {product2.colors.map((color: string, i: number) => (
                  <button
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variant Options */}
          {product2.choice_options.map(
            (
              option: { title: string; options: []; name: string },
              index: number
            ) => (
              <div key={index} className="mt-5">
                <p className="font-medium">{option.title}</p>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {option.options.map((value: string, i: number) => (
                    <Button
                      key={i}
                      variant={
                        selectedOptions[option.name] === value
                          ? "default"
                          : "outline"
                      }
                      className="rounded-md"
                      onClick={() => handleOptionSelect(option.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Add to Cart */}
          <Button
            className="w-full mt-8 h-12 text-lg font-semibold"
            disabled={!canAddToCart}
          >
            {canAddToCart ? "Add To Cart" : "Out of Stock"}
          </Button>

          {/* Description */}
          <div className="mt-6 text-sm text-gray-600">
            <div dangerouslySetInnerHTML={{ __html: product2.description }} />
          </div>

          {/* Product Details Accordion */}
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="product-info">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    <strong>SKU:</strong> {product2.id}
                  </p>
                  <p>
                    <strong>Unit:</strong> {product2.unit}
                  </p>
                  {product2.tags.length > 0 && (
                    <div>
                      <strong>Tags:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product2.tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="bg-gray-100 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
