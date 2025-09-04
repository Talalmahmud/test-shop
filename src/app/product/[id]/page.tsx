import ProductDetailClient2 from "@/components/shared/product-details2";
import ProductSlider2 from "@/components/shared/slider2";
import ProductSliderWithoutFilter from "@/components/shared/sliderwithoutfilter";
import { getToken } from "@/services/token";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();

  const product3 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product-details/${id}`
  ).then((res) => res.json());
  return (
    <div>
      {/* <ProductDetailClient product2={product2.data[0]} /> */}
      <ProductDetailClient2
        isToken={token ? true : false}
        product={product3.data}
      />
      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif">Related Product</h2>
        <ProductSliderWithoutFilter slides={product3.data.related_products} />
      </div>
      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif">Shop Best Sellers</h2>
        <ProductSliderWithoutFilter
          slides={product3.data.top_selling_products}
        />
      </div>
    </div>
  );
}
