import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const trends = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Men's",
    description:
      "Explore our latest collection. Trendy styles for every occasion. Shop now and elevate your wardrobe with must-have pieces.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1709295208567-ce817387e977?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGp3ZWxsYXJ5JTIwZ29sZHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Men's",
    description:
      "Explore our latest collection. Trendy styles for every occasion. Shop now and elevate your wardrobe with must-have pieces.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuJTIwamFja2V0fGVufDB8fDB8fHww",
    title: "Men's",
    description:
      "Explore our latest collection. Trendy styles for every occasion. Shop now and elevate your wardrobe with must-have pieces.",
  },
];

const TrendCollection = () => {
  return (
    <div className="text-slate-600 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {trends.map((trend) => (
        <div
          key={trend.id}
          className="relative w-full flex flex-col rounded-xl group cursor-pointer"
        >
          {/* Image container with relative positioning */}
          <div className="h-[500px] relative overflow-hidden">
            <Image
              src={trend.image}
              alt={trend.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Text content */}
          <div className=" space-y-2">
            <p className="font-serif text-[18px] font-semibold">
              {trend.title}
            </p>
            <p className="font-serif text-[14px] text-slate-500">
              {trend.description}
            </p>
            <Link href="/">
              <Button className=" text-white  font-semibold px-4 py-2 bg-black rounded-md ">
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Shop Now link - positioned over image or below based on design preference */}
        </div>
      ))}
    </div>
  );
};

export default TrendCollection;
