"use client";
import Filter from "@/components/shared/filter";
import ProductCard from "@/components/shared/product-card";
import Image from "next/image";

import React, { useState } from "react";
const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Hyperloop Hoodie",
    reviews: 1281,
    rating: 5,
    originalPrice: 15800,
    discountedPrice: 9400,
    entries: 9400,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#2f4f4f", "#6b7280", "#374151"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwamFja2V0fGVufDB8fDB8fHww",
    title: "AO Long Sleeve Curve-Hem Tee",
    reviews: 2062,
    rating: 5,
    originalPrice: 8600,
    discountedPrice: 5100,
    entries: 5100,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#374151"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuJTIwamFja2V0fGVufDB8fDB8fHww",
    title: "Hyperloop Hoodie",
    reviews: 1281,
    rating: 5,
    originalPrice: 15800,
    discountedPrice: 9400,
    entries: 9400,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#2f4f4f", "#6b7280", "#374151"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHxlbnwwfHwwfHx8MA%3D%3D",
    title: "AO Long Sleeve Curve-Hem Tee",
    reviews: 2062,
    rating: 5,
    originalPrice: 8600,
    discountedPrice: 5100,
    entries: 5100,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#374151"],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Hyperloop Hoodie",
    reviews: 1281,
    rating: 5,
    originalPrice: 15800,
    discountedPrice: 9400,
    entries: 9400,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#2f4f4f", "#6b7280", "#374151"],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHxlbnwwfHwwfHx8MA%3D%3D",
    title: "AO Long Sleeve Curve-Hem Tee",
    reviews: 2062,
    rating: 5,
    originalPrice: 8600,
    discountedPrice: 5100,
    entries: 5100,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#374151"],
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Hyperloop Hoodie",
    reviews: 1281,
    rating: 5,
    originalPrice: 15800,
    discountedPrice: 9400,
    entries: 9400,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#2f4f4f", "#6b7280", "#374151"],
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHxlbnwwfHwwfHx8MA%3D%3D",
    title: "AO Long Sleeve Curve-Hem Tee",
    reviews: 2062,
    rating: 5,
    originalPrice: 8600,
    discountedPrice: 5100,
    entries: 5100,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#374151"],
  },
];
const Page = () => {
  return (
    <div>
      <Image
        src={
          "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="logo"
        width={1200}
        height={100}
        className=" w-full h-[200px] object-fill"
      />
      <div className=" flex ">
        {/* left */}
        <div className=" sticky left-0 top-16 h-[500px] px-6 overflow-y-auto  w-[250px] border-r-[1px] border-slate-300 flex flex-col gap-4">
          <div className=" flex flex-col gap-1">
            <p className=" text-slate-400 text-[18px]">Title</p>
            <div className="flex flex-col">
              <p className=" text-[12px]">One</p>
              <p className=" text-[12px]">two</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="px-6 py-4 ">
          {" "}
          <div className="pb-2">
            {" "}
            <Filter />
          </div>
          <div className=" grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
