"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft, Search, X } from "lucide-react";
import { productSearch } from "@/services/search";
import Image from "next/image";
import Link from "next/link";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const popularSearches = [
    "Apparel",
    "Shoes",
    "Jewellery",
    "Shirt",
    "T-Shirt",
    "Pink",
    "Leather",
  ];

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch products
  const getProduct = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProductList([]);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const products = await productSearch(query);
      setProductList(products.data.products);
    } catch (err) {
      setError("Failed to fetch search results");
      console.log(err);
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) getProduct(debouncedQuery);
    else setProductList([]);
  }, [debouncedQuery, getProduct]);

  const clearSearch = () => {
    setSearchQuery("");
    setProductList([]);
    setError("");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="h-9 w-9 bg-gray-100 rounded-full flex justify-center items-center hover:bg-gray-200 transition">
          <Search size={18} className="text-gray-600" />
        </div>
      </SheetTrigger>

      <SheetContent className="min-w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex justify-between items-center font-bold">
            <SheetClose asChild>
              <button className="flex items-center text-blue-600 text-lg font-medium hover:underline">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Shopping
              </button>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="mt-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Loading */}
          {isLoading && (
            <div className="py-6 text-center text-gray-500">Searching...</div>
          )}

          {/* Error */}
          {error && (
            <div className="py-6 text-center text-red-500">{error}</div>
          )}

          {/* Results */}
          {productList.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Search Results
              </h3>
              <div className="flex flex-col gap-3">
                {productList.map(
                  (
                    product: {
                      slug: string;
                      thumbnail: string;
                      name: string;
                      discounted_price_formatted: string;
                      base_price_formatted: string;
                    },
                    index
                  ) => (
                    <Link
                      href={`/product/${product.slug}`}
                      key={index}
                      className="block"
                    >
                      <SheetClose asChild>
                        <div className="flex gap-3 border rounded-lg hover:shadow-md transition overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            height={100}
                            width={100}
                            className="object-cover h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] flex-shrink-0"
                          />
                          <div className="flex flex-col justify-between p-2 flex-1">
                            <p className="font-semibold text-sm sm:text-base line-clamp-2">
                              {product.name}
                            </p>
                            <div className="mt-1">
                              <p className="text-red-600 font-semibold">
                                {product.discounted_price_formatted}
                              </p>
                              <p className="text-gray-400 text-sm line-through">
                                {product.base_price_formatted}
                              </p>
                            </div>
                          </div>
                        </div>
                      </SheetClose>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!isLoading && productList.length === 0 && !error && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductSearch;
