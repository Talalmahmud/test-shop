"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "@/components/ui/slider";

type Props = {
  filterList: { colors: string[]; sizes: string[] };
};

const Filter = ({ filterList }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    filterList.colors[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Price Range (default 0 - 500)
  const [priceRange, setPriceRange] = useState<number[]>([50, 300]);

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button>Filter</Button>
      </SheetTrigger>

      <SheetContent className="px-4 min-w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[500px] xl:min-w-[500px] 2xl:min-w-[600px]">
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center font-bold">
            <SheetClose asChild>
              <button className="flex items-center text-blue-600 text-lg font-medium hover:underline">
                <ArrowLeft className="mr-2" size={20} />
                Back to Shopping
              </button>
            </SheetClose>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        {/* Colors */}
        {filterList.colors.length > 0 && (
          <div className="px-2 mt-6">
            <p className="font-semibold text-lg mb-3">Colors</p>
            <div className="flex gap-3 flex-wrap">
              {filterList.colors.map((color: string, i: number) => (
                <button
                  key={i}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition duration-200
                    ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-transparent hover:border-gray-400"
                    }`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                >
                  <span
                    className="w-7 h-7 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {filterList.sizes.length > 0 && (
          <div className="px-2 mt-8">
            <p className="font-semibold text-lg mb-3">Sizes</p>
            <div className="flex flex-wrap gap-3">
              {filterList.sizes.map((item: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-md border transition duration-200
                    ${
                      selectedSize === item
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="px-2 mt-8">
          <p className="font-semibold text-lg mb-3">Price Range</p>
          <Slider
            value={priceRange}
            onValueChange={(val: number[]) => setPriceRange(val)}
            min={50}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-[14px] text-gray-700">
            <span>BDT-{priceRange[0]}</span>
            <span>BDT-{priceRange[1]}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
