import ProductLoading from "@/components/shared/product-loading";
import { getToken } from "@/services/token";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookie = await cookies();

  let product = null;
  let error = null;

  try {
    const productResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-history-items/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")?.value}`,
        },
        next: { revalidate: 3600 },
      }
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
  return <div></div>;
}
