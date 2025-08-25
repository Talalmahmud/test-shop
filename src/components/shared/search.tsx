"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, X } from "lucide-react";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const popularSearches = [
    "AO Curve-Hem Tee",
    "Coreflex",
    "Henley",
    "Hats",
    "Bomber",
    "Tomboy Tee",
    "Almost Friday Tee",
    "Giftcard",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <div className=" h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
          <Search size={14} />
        </div>
      </SheetTrigger>
      <SheetContent className="px-4">
        <SheetHeader className="mb-6">
          <SheetTitle className=" flex justify-between items-center font-bold">
            {" "}
            <div> &larr;</div>
            <button className="text-blue-600 text-[24px]  flex items-center text-sm font-medium">
              Back to Shopping
            </button>
            <div></div>{" "}
          </SheetTitle>
          <SheetDescription className="text-base"></SheetDescription>
        </SheetHeader>

        <div className=" px-4">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative mb-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </form>

          {/* Popular Search Terms */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Top search terms
            </h3>
            <div className="flex flex-col  gap-3">
              {popularSearches.map((term, index) => (
                <button key={index} onClick={() => setSearchQuery(term)}>
                  <span className="text-gray-700">{term}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductSearch;
