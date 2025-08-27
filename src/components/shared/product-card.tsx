"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";

type ProductCardProps = {
  item: {
    id: string | number;
    image: string;
    title: string;
    colorOptions?: string[];
    reviews: number;
    rating: number; // out of 5
    originalPrice: number;
    discountedPrice: number;
    entries: number;
    tag?: string; // e.g. "Best Seller" or "1x Entries"
    href?: string;
  };
  className: string;
};

export default function ProductCard({ item, className }: ProductCardProps) {
  return (
    <div
      className={`group relative  pb-2 shadow-sm hover:shadow-md transition duration-300 ${className}`}
    >
      {/* Tag Badge */}
      {item?.tag && (
        <span className="absolute z-20 top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
          {item?.tag}
        </span>
      )}

      <Link href={item?.href || ""}>
        <CardContent className="flex flex-col w-full items-center ">
          {/* Image Wrapper */}
          <div
            className={` group relative  h-[350px] overflow-hidden bg-gray-50 ${className}`}
          >
            <Image
              src={item?.image}
              alt={item?.title}
              fill
              className="object-fill transition-transform duration-300 group-hover:scale-105"
            />
            <div className=" hidden group-hover:grid absolute bottom-0 w-full  grid-cols-5  bg-gray-500 text-white">
              <p className=" text-center hover:bg-white hover:text-black">sm</p>
              <p className=" text-center hover:bg-white hover:text-black">md</p>
              <p className=" text-center hover:bg-white hover:text-black">lg</p>
              <p className=" text-center hover:bg-white hover:text-black">xl</p>
              <p className=" text-center hover:bg-white hover:text-black">
                xxl
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-base font-semibold text-center line-clamp-2">
            {item?.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  i < item?.rating
                    ? "fill-yellow-500 stroke-yellow-500"
                    : "fill-gray-200 stroke-gray-400"
                )}
              />
            ))}
            <span className="ml-1 text-sm text-gray-500">
              ({item?.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="mt-2 flex flex-col items-center">
            <span className="text-red-600 font-semibold text-lg">
              BDT {item?.discountedPrice.toLocaleString()}
            </span>
            <span className="line-through text-gray-400 text-sm">
              BDT {item?.originalPrice.toLocaleString()}
            </span>
            <span className="text-xs text-red-500 mt-1">
              Earn {item?.entries} entries
            </span>
          </div>

          {/* Color Options */}
          {item?.colorOptions && item?.colorOptions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {item?.colorOptions.map((color, i) => (
                <span
                  key={i}
                  className="w-5 h-5 rounded-full border shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Link>
    </div>
  );
}
