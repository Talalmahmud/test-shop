"use server";

export const productSearch = async (searchTxt: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/search?keyword=${searchTxt}&limit=10`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resData = await res.json();
    console.log(resData);

    // Return the data so it can be used by the calling code
    return resData;
  } catch (error) {
    console.error("Search API error:", error);
    throw error; // Re-throw to allow error handling in the UI
  }
};

export const productFilter = async (searchTxt: string) => {
  try {
    // Parse the search parameters
    const searchParams = new URLSearchParams(searchTxt);
    const categorySlug = searchParams.get("category_slug");
    const maxPrice = searchParams.get("max_price");

    const minPrice = searchParams.get("min_price");
    const sortBy = searchParams.get("sort_by");
    searchParams.delete("gender");

    let apiUrl: string;
    console.log(
      35,
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/category/${categorySlug}`
    );
    // Determine which API endpoint to use based on parameters
    if (categorySlug) {
      // Use category-specific API
      apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/products/category/${categorySlug}`;

      // Remove category_slug from params to avoid duplication
      searchParams.delete("category_slug");

      // Add remaining parameters if any
      // const remainingParams = searchParams.toString();
      // if (remainingParams) {
      //   apiUrl += `?${remainingParams}`;
      // }
    } else {
      apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/search?${searchTxt}`;
    }

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resData = await res.json();
    console.log(resData);

    // Return the data so it can be used by the calling code
    return resData;
  } catch (error) {
    console.error("Search API error:", error);
    throw error; // Re-throw to allow error handling in the UI
  }
};
