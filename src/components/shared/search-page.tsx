"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import Filter from "./filter";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import CategoryFilter from "./category-filter";
import ProductCard2 from "./product-card-2";
import { productFilter } from "@/services/search";
import { Loader2 } from "lucide-react";

// Your categories data
type Props = {
  categoryList: Category[];
};
interface FilterProps {
  colors: string[];
  sizes: string[];
}

const SearchPage = ({ categoryList }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<FilterProps>({
    colors: [],
    sizes: [],
  });

  // Get current filters from URL
  const currentCategory = searchParams.get("category_slug");
  const currentGender = searchParams.get("gender") || "men"; // Default to 'men'

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build query string from all search params
        const queryString = searchParams.toString();

        // Call your API with both category and gender filters
        const response = await productFilter(queryString);

        setProducts(response.data.products || []);
        setFilterData({
          colors: response.data.filter_options.colors || [],
          sizes: response.data.filter_options.sizes || [],
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // const clearFilters = () => {
  //   // Keep the gender filter when clearing other filters
  //   const params = new URLSearchParams();
  //   if (currentGender) {
  //     params.set("gender", currentGender);
  //   }
  //   router.replace(`/search?${params.toString()}`);
  // };
  console.log(categoryList);

  return (
    <div className="flex gap-6 p-6">
      {/* Left sidebar with category filter */}
      <div className="w-72 md:block hidden flex-shrink-0">
        <CategoryFilter categories={categoryList} />
        {/* 
        {(currentCategory || searchParams.toString().includes("gender")) && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full mt-4"
          >
            Clear Filters
          </Button>
        )} */}
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <div className="mb-6">
          <Filter filterList={filterData} />
        </div>

        {loading ? (
          <div className=" flex justify-center items-center py-8">
            <Loader2 className=" min-h-[80px] min-w-[80px]  animate-spin text-red-800" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
            {products.map((product, index) => (
              <ProductCard2 key={index} item={product} />
            ))}

            {products.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 text-gray-500">
                {currentCategory || currentGender
                  ? `No products found${
                      currentGender ? ` for ${currentGender}` : ""
                    }${
                      currentCategory
                        ? ` in ${currentCategory.replace(/-/g, " ")}`
                        : ""
                    }`
                  : "Select a category to view products"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
