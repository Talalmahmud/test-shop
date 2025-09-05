import ProductLoading from "@/components/shared/product-loading";
import ProductDetailClient2 from "@/components/shared/product-details2";
import ProductSliderWithoutFilter from "@/components/shared/sliderwithoutfilter";
import ProductSEO from "@/components/shared/product-seo";
import { getToken } from "@/services/token";

// Update your page with better error handling
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();

  let product = null;
  let error = null;

  try {
    const productResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product-details/${id}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!productResponse.ok) {
      throw new Error(`Product not found: ${productResponse.status}`);
    }

    const productData = await productResponse.json();
    product = productData.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    error = err instanceof Error ? err.message : "Failed to load product";
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist or is
            unavailable.
          </p>
          <a
            href="/products"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Browse all products
          </a>
        </div>
      </div>
    );
  }

  if (!product) {
    return <ProductLoading />;
  }

  return (
    <>
      <ProductSEO product={product} />

      <div>
        <ProductDetailClient2
          isToken={token ? true : false}
          product={product}
        />
        <div className="py-10 px-6 lg:px-20">
          <h2 className="text-[40px] font-serif">Related Product</h2>
          <ProductSliderWithoutFilter slides={product.related_products} />
        </div>
        <div className="py-10 px-6 lg:px-20">
          <h2 className="text-[40px] font-serif">Shop Best Sellers</h2>
          <ProductSliderWithoutFilter slides={product.top_selling_products} />
        </div>
      </div>
    </>
  );
}
