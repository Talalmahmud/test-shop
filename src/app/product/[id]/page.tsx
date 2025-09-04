import ProductDetailClient2 from "@/components/shared/product-details2";
import { getToken } from "@/services/token";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();
  
  // Fetch product data
  // const product2 = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
  // ).then((res) => res.json());
  const product3 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product-details/${id}`
  ).then((res) => res.json());

  // Fetch related product data

  // const relatedProduct = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/products/related/${id}`
  // ).then((res) => res.json());

  // For best selling products
  // const bestSelling = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/best-selling?limit=30`
  // ).then((res) => res.json());

  return (
    <div>
      {/* <ProductDetailClient product2={product2.data[0]} /> */}
      <ProductDetailClient2 isToken={token?true:false} product={product3.data} />
      {/* <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif">Related Product</h2>
        <ProductSliderWithoutFilter slides={relatedProduct.data} />
      </div>
      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif">Shop Best Sellers</h2>
        <ProductSlider2 slides={bestSelling.data.products} />
      </div> */}
    </div>
  );
}
