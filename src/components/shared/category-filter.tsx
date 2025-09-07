"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  children: {
    id: number;
    name: string;
    slug?: string;
    children: {
      id: number;
      name: string;
      slug?: string;
    }[];
  }[];
}

type Props = {
  categories: Category[];
};

const CategoryFilter = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // gender state (default = men)
  const [selectedGender, setSelectedGender] = useState<"men" | "women">("men");

  // read from URL if exists
  useEffect(() => {
    const genderFromUrl = searchParams.get("gender");
    if (genderFromUrl) {
      setSelectedGender(genderFromUrl.toLowerCase() as "men" | "women");
    } else {
      updateUrlWithGender("men");
    }
  }, []);

  // update gender in URL
  const updateUrlWithGender = (gender: "men" | "women") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", gender);
    // also clear category_slug when switching gender
    params.delete("category_slug");
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  // handle gender button click
  const handleGenderSelect = (gender: "men" | "women") => {
    setSelectedGender(gender);
    updateUrlWithGender(gender);
  };

  // update category slug in URL
  const handleCategoryClick = (slug?: string) => {
    if (!slug) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_slug", slug);
    router.push(`/search?${params.toString()}`);
  };

  // flatten categories (remove gender node, keep its children)
  const processedCategories = categories.map((cat) => {
    const genderNode = cat.children?.find(
      (child) => child.name.toLowerCase() === selectedGender.toLowerCase()
    );

    return {
      ...cat,
      children: genderNode?.children || [],
    };
  });

  // recursive renderer
  const CategoryItem = ({
    category,
    level = 0,
  }: {
    category: {
      id: number;
      name: string;
      slug?: string;
      children?: {
        id: number;
        name: string;
        slug?: string;
      }[];
    };
    level?: number;
  }) => {
    return (
      <div className="w-full">
        <div>
          {" "}
          <div
            className={`py-1  cursor-pointer  border-b-[1px] border-white text-[18px]  ${
              searchParams.get("category_slug") === category.slug
                ? "border-b-black font-medium"
                : ""
            } ${level > 0 ? "pl-2 text-black hover:border-black" : ""}`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </div>
        </div>

        {category.children && category.children.length > 0 && (
          <div className=" text-black">
            {category.children.map((child) => (
              <CategoryItem key={child.id} category={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white hidden md:block ">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>

      {/* gender filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleGenderSelect("men")}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
            selectedGender === "men"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Men
        </button>
        <button
          onClick={() => handleGenderSelect("women")}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
            selectedGender === "women"
              ? "bg-pink-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Women
        </button>
      </div>

      {/* categories */}
      <div className="space-y-1">
        {processedCategories.map((category) =>
          category.children.length > 0 ? (
            <CategoryItem key={category.id} category={category} />
          ) : null
        )}

        {processedCategories.every((cat) => cat.children.length === 0) && (
          <div className="text-center py-4 text-gray-500 text-sm">
            No categories found for {selectedGender}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
