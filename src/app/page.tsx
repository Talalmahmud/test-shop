import Hero from "@/components/shared/hero";
import ProductSlider from "@/components/shared/slider";
import ProductSlider2 from "@/components/shared/slider2";
import TrendCollection from "@/components/shared/trend-collection";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwamFja2V0fGVufDB8fDB8fHww",
    title: "AO Long Sleeve Curve-Hem Tee",
    reviews: 2062,
    rating: 5,
    originalPrice: 8600,
    discountedPrice: 5100,
    entries: 5100,
    tag: "1x Entries",
    colorOptions: ["#cccccc", "#000000", "#374151"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuJTIwamFja2V0fGVufDB8fDB8fHww",
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
    id: 4,
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
  {
    id: 5,
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
    id: 6,
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
  {
    id: 7,
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
    id: 8,
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
type Category = {
  id: number;
  name: string;
  thumbnail?: string;
  categories: {
    id: number;
    name: string;
    categories: {
      id: number;
      name: string;
    }[];
  }[];
};

export default async function Home() {
  const fetchHero = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/elevatedbd-main/public/api/v2/sliders`
  ).then((res) => res.json());

  const bestSelling = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/elevatedbd-main/public/api/v2/products-list/best-selling`
  ).then((res) => res.json());
  console.log(bestSelling);

  const listData = await fetch(
    "http://192.168.50.3/elevatedbd-main/public/api/v2/categories/navigation"
  ).then((res) => res.json());
  const processData = listData.map((item: Category) => ({
    id: item.id,
    name: item.name,
    thumbnail: item.thumbnail,
  }));
  const processData2 = [...processData];

  const cols = 4;

  // group items into rows of max 4
  const rows = [];
  for (let i = 0; i < processData2.length; i += cols) {
    rows.push(processData2.slice(i, i + cols));
  }
  return (
    <div>
      <Hero photos={fetchHero.data} />

      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif ">Shop Best Sellers</h2>
        <div className=" flex items-center gap-2 py-4">
          <Button className=" rounded-full">men</Button>{" "}
          <Button className=" rounded-full">women</Button>
        </div>
        <ProductSlider2 slides={bestSelling.data.products} />
      </div>

      <div className="py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif ">Shop New Releases</h2>
        <div className=" flex items-center gap-2 py-4">
          <Button className=" rounded-full">men</Button>{" "}
          <Button className=" rounded-full">women</Button>
        </div>
        <ProductSlider slides={products} />
      </div>

      <div className="py-10 px-6 lg:px-7">
        <h2 className="text-[40px] font-serif ">Shop by Category</h2>
        <div className="h-[1px] w-full bg-slate-300 my-2"></div>
        <div className="space-y-6">
          {rows.map((row, rowIndex) => {
            const count = row.length;
            let basisClass = "basis-1/4"; // default for 4 items

            if (count === 1) basisClass = "basis-full";
            if (count === 2) basisClass = "basis-1/2";
            if (count === 3) basisClass = "basis-1/3";

            return (
              <div key={rowIndex} className="flex gap-6">
                {row.map((category: Category) => (
                  <Link
                    href={`/category/${category.id}`}
                    key={category.id}
                    className={`relative h-[400px] rounded-xl overflow-hidden group cursor-pointer ${basisClass}`}
                  >
                    <Image
                      src={
                        category.thumbnail ||
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60"
                      }
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <p className="text-white text-[16px] font-semibold absolute bottom-4 text-center w-full underline">
                      {category.name}
                    </p>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-10 px-6 lg:px-7">
        <h2 className="text-[40px] font-serif ">Trending Collections</h2>
        <TrendCollection />
      </div>

      <div className="py-10 px-6 lg:px-7">
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className=" w-full h-[600px] relative">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Sale Banner"
              fill
              className=" object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className=" absolute inset-0 bg-black/30 "></div>
            <div className=" absolute  z-10 flex items-end flex-col right-8 bottom-6 text-white ">
              <p className=" text-[40px]"> Mens</p>

              <div className=" grid grid-cols-2 gap-4">
                <Button className=" mt-6 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200">
                  Shop Now
                </Button>
                <Button className=" mt-6 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div className=" w-full h-[600px] relative">
            <Image
              src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Sale Banner"
              fill
              className=" object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className=" absolute inset-0 bg-black/30 "></div>
            <div className=" absolute  z-10 flex items-end flex-col right-8 bottom-6 text-white ">
              <p className=" text-[40px] "> Mens</p>

              <div className=" grid grid-cols-2 gap-4">
                <Button className=" mt-6 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200">
                  Shop Now
                </Button>
                <Button className=" mt-6 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
