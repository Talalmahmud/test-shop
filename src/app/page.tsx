import Hero from "@/components/shared/hero";
import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Hyperloop Hoodie",
    reviews: 1281,
    rating: 5,
    originalPrice: 15800,
    discountedPrice: 9400,
    entries: 9400,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#2f4f4f", "#6b7280", "#374151"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHxlbnwwfHwwfHx8MA%3D%3D",
    title: "AO Long Sleeve Curve-Hem Tee",
    reviews: 2062,
    rating: 5,
    originalPrice: 8600,
    discountedPrice: 5100,
    entries: 5100,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#374151"],
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="py-10 px-6  lg:px-7">
        <h2 className="text-[40px] font-serif ">Shop Best Sellers</h2>
        <div className=" flex items-center gap-2 py-4">
          <Button className=" rounded-full">men</Button>{" "}
          <Button className=" rounded-full">women</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
