"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";

type ProductCardProps = {
  item: {
    id: string | number;
    name: string;
    slug: string;
    thumbnail: string;
    base_price: string;
    discounted_price: string;
    discount_percentage: number;
    rating: number;
    rating_stars: {
      rating: number;
      full_stars: number;
      half_star: number;
      empty_stars: number;
      stars_html: string;
    };
    wholesale_product: number;
    auction_product: number;
    num_of_sale: number;
    club_point: string | null;
    // Optional fields that might not be present in all items
    colorOptions?: string[];
    entries?: number;
    tag?: string;
  };
  className?: string;
};

export default function ProductCard2({
  item,
  className = "",
}: ProductCardProps) {
  console.log(item);
  // Extract numeric values from price strings (remove currency symbol)
  const basePriceNum = parseInt(item.base_price.replace(/[^\d]/g, "") || "0");
  const discountedPriceNum = parseInt(
    item.discounted_price.replace(/[^\d]/g, "") || "0"
  );

  function replaceBaseUrl(
    imageUrl: string,
    oldBase = "http://localhost",
    newBase = "http://192.168.50.3"
  ) {
    // If newBase doesn't start with http://, add it
    if (!newBase.startsWith("http://") && !newBase.startsWith("https://")) {
      newBase = "http://" + newBase;
    }

    return imageUrl.replace(oldBase, newBase);
  }

  // Calculate discount percentage if not provided
  const discountPercentage =
    item.discount_percentage > 0
      ? item.discount_percentage
      : basePriceNum > 0
      ? Math.round(((basePriceNum - discountedPriceNum) / basePriceNum) * 100)
      : 0;

  return (
    <div
      className={`group relative pb-2 shadow-sm hover:shadow-md transition duration-300 ${className}`}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <span className="absolute z-20 top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
          {discountPercentage}% OFF
        </span>
      )}

      {/* Custom Tag Badge */}
      {item?.tag && (
        <span className="absloute z-20 top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
          {item.tag}
        </span>
      )}

      <Link href={`/product/${item.slug}`}>
        <CardContent className="flex flex-col w-full items-center p-0">
          {/* Image Wrapper */}
          <div className="group relative h-[250px] w-full overflow-hidden bg-gray-50">
            <Image
              src={replaceBaseUrl(item.thumbnail) || "/placeholder-image.jpg"}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Size options on hover */}
            <div className="hidden group-hover:grid absolute bottom-0 w-full grid-cols-5 bg-gray-800/90 text-white text-xs">
              <p className="text-center py-2 hover:bg-white hover:text-black cursor-pointer">
                S
              </p>
              <p className="text-center py-2 hover:bg-white hover:text-black cursor-pointer">
                M
              </p>
              <p className="text-center py-2 hover:bg-white hover:text-black cursor-pointer">
                L
              </p>
              <p className="text-center py-2 hover:bg-white hover:text-black cursor-pointer">
                XL
              </p>
              <p className="text-center py-2 hover:bg-white hover:text-black cursor-pointer">
                XXL
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 w-full">
            {/* Title */}
            <h3 className="text-base font-semibold text-center line-clamp-2 h-12 overflow-hidden">
              {item.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mt-2 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    "stroke-yellow-500",
                    i < Math.floor(item.rating)
                      ? "fill-yellow-500"
                      : "fill-gray-200"
                  )}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500">
                ({item.num_of_sale})
              </span>
            </div>

            {/* Price */}
            <div className="mt-2 flex flex-col items-center">
              {discountedPriceNum < basePriceNum ? (
                <>
                  <span className="text-red-600 font-semibold text-lg">
                    BDT {discountedPriceNum.toLocaleString()}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    BDT {basePriceNum.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-red-500 font-semibold text-lg">
                  BDT {basePriceNum.toLocaleString()}
                </span>
              )}
            </div>

            {/* Sales count */}
            <div className="mt-1 text-center text-xs text-gray-500">
              {item.num_of_sale} sold
            </div>

            {/* Club Points */}
            {item.club_point && (
              <div className="mt-1 text-center text-xs text-green-600">
                {item.club_point} club points
              </div>
            )}

            {/* Entries (for auction products) */}
            {item.auction_product === 1 && item.entries && (
              <div className="mt-1 text-center text-xs text-blue-600">
                Earn {item.entries} entries
              </div>
            )}

            {/* Color Options */}
            {item.colorOptions && item.colorOptions.length > 0 && (
              <div className="flex justify-center gap-2 mt-3">
                {item.colorOptions.map((color, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </div>
  );
}
