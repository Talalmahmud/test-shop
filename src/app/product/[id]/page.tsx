import ProductDetailClient from "@/components/shared/product-details";
import ProductSlider2 from "@/components/shared/slider2";
import ProductSliderWithoutFilter from "@/components/shared/sliderwithoutfilter";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch product data
  const product2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
  ).then((res) => res.json());

  // Fetch related product data

  const relatedProduct = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/related/${id}`
  ).then((res) => res.json());

  console.log(relatedProduct);
  // For best selling products
  const bestSelling = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/best-selling?limit=30`
  ).then((res) => res.json());

  return (
    <div>
      <ProductDetailClient product2={product2.data[0]} />

      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif">Related Product</h2>
        <ProductSliderWithoutFilter slides={relatedProduct.data} />
      </div>
      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif">Shop Best Sellers</h2>
        <ProductSlider2 slides={bestSelling.data.products} />
      </div>
    </div>
  );
}
