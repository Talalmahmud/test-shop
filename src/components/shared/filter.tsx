"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  filterList: { colors: { name: string; code: string }[]; sizes: string[] };
};

const Filter = ({ filterList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL params
  const initialColor = searchParams.get("color") || "";
  const initialSize = searchParams.get("selected_attribute_values") || "";
  const initialMinPrice = searchParams.get("min_price")
    ? parseInt(searchParams.get("min_price")!)
    : 50;
  const initialMaxPrice = searchParams.get("max_price")
    ? parseInt(searchParams.get("max_price")!)
    : 300;

  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [priceRange, setPriceRange] = useState<number[]>([
    initialMinPrice,
    initialMaxPrice,
  ]);

  // Update URL when filters change
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Update color param
    if (selectedColor) {
      params.set("color", selectedColor);
    } else {
      params.delete("color");
    }

    // Update size param
    if (selectedSize) {
      params.set("selected_attribute_values", selectedSize);
    } else {
      params.delete("selected_attribute_values");
    }

    // Update price params
    params.set("min_price", priceRange[0].toString());
    params.set("max_price", priceRange[1].toString());

    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedColor("");
    setSelectedSize("");
    setPriceRange([50, 300]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("color");
    params.delete("selected_attribute_values");
    params.delete("min_price");
    params.delete("max_price");

    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    const newSize = selectedSize === size ? "" : size;
    setSelectedSize(newSize);
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Apply filters when they change (with debounce for slider)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrlWithFilters();
    }, 300); // Debounce for smoother URL updates, especially for slider

    return () => clearTimeout(timer);
  }, [selectedColor, selectedSize, priceRange]);

  // Check if any filters are active
  const hasActiveFilters =
    selectedColor ||
    selectedSize ||
    priceRange[0] !== 50 ||
    priceRange[1] !== 300;

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button variant="default" className="relative">
          Filter
          {hasActiveFilters && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </Button>
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
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="mr-1" size={16} />
                Clear All
              </Button>
            )}
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        {/* Colors */}
        {filterList.colors.length > 0 && (
          <div className="px-2 mt-6">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-lg">Colors</p>
              {selectedColor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedColor("")}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              {filterList.colors.map(
                (color: { name: string; code: string }, i: number) => (
                  <button
                    key={i}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition duration-200
                    ${
                      selectedColor === color.code
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-transparent hover:border-gray-400"
                    }`}
                    onClick={() => handleColorSelect(color.name)}
                    aria-label={`Select color ${color.code}`}
                  >
                    <span
                      className="w-7 h-7 rounded-full"
                      style={{ backgroundColor: color.code }}
                    />
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Sizes */}
        {filterList.sizes.length > 0 && (
          <div className="px-2 mt-8">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-lg">Sizes</p>
              {selectedSize && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSize("")}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {filterList.sizes.map((item: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSizeSelect(item)}
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
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-lg">Price Range</p>
            {(priceRange[0] !== 50 || priceRange[1] !== 300) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPriceRange([50, 300])}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Clear
              </Button>
            )}
          </div>
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            min={50}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-[14px] text-gray-700">
            <span>BDT {priceRange[0]}</span>
            <span>BDT {priceRange[1]}</span>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="px-2 mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-lg mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedColor && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Color: {selectedColor}
                  <button
                    onClick={() => setSelectedColor("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedSize && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Size: {selectedSize}
                  <button
                    onClick={() => setSelectedSize("")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {(priceRange[0] !== 50 || priceRange[1] !== 300) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Price: BDT {priceRange[0]} - {priceRange[1]}
                  <button
                    onClick={() => setPriceRange([50, 300])}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
