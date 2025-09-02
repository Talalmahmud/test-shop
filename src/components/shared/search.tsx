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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedQuery.trim()) {
      console.log("Searching for:", debouncedQuery);
      // This will trigger the useEffect below
      setSearchQuery(debouncedQuery);
    }
  };

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Function to fetch products
  const getProduct = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProductList([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const products = await productSearch(query);
      console.log("Search results:", products);
      setProductList(products.data.products);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results");
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // React to debounced search query
  useEffect(() => {
    if (debouncedQuery) {
      console.log("Debounced search query:", debouncedQuery);
      getProduct(debouncedQuery);
    } else {
      setProductList([]);
    }
  }, [debouncedQuery, getProduct]);

  const clearSearch = () => {
    setSearchQuery("");
    setProductList([]);
    setError("");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
          <Search size={14} />
        </div>
      </SheetTrigger>
      <SheetContent className=" min-w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[500px] xl:min-w-[500px] 2xl:min-w-[600px] flex justify-between">
        <SheetHeader className="mb-2">
          <SheetTitle className="flex justify-between items-center font-bold">
            <SheetClose asChild>
              <button className="flex items-center text-blue-600 text-[24px] font-medium hover:underline">
                <ArrowLeft className="mr-2" />
                Back to Shopping
              </button>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="text-base ">
            <div className="relative mt-4 border-t-[1px] border-b-[1px] border-gray-300 py-4">
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
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          {/* Search Input */}

          {/* Loading State */}
          {isLoading && (
            <div className="py-4 text-center text-gray-500">Searching...</div>
          )}

          {/* Error State */}
          {error && (
            <div className="py-4 text-center text-red-500">{error}</div>
          )}

          {/* Search Results */}
          {productList.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Search Results
              </h3>
              <div className="flex flex-col gap-2 h-[400px] overflow-y-auto scrollbar-hide">
                {productList.map(
                  (
                    product: {
                      thumbnail: string;
                      name: string;
                      base_price_formatted: string;
                      discounted_price_formatted: string;
                      id: number;
                    },
                    index
                  ) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={index}
                      className=" "
                    >
                      {" "}
                      <SheetClose asChild>
                        <div className=" flex gap-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <Image
                            src={product.thumbnail}
                            alt=""
                            height={100}
                            width={150}
                            className=" object-cover h-[120px] min-w-[150px] rounded-l-md"
                          />
                          <div className=" space-y-1">
                            <p className=" font-semibold text-[14px] line-clamp-2">
                              {product.name}
                            </p>
                            <p>{product.discounted_price_formatted}</p>
                            <p className=" line-through">
                              {product.base_price_formatted}
                            </p>
                          </div>
                        </div>
                      </SheetClose>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}

          {/* Popular Search Terms - Only show when no search results */}
          {!isLoading && productList.length === 0 && !error && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Top search terms
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
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
