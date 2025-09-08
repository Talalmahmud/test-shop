import Hero from "@/components/shared/hero";
import ProductSlider2 from "@/components/shared/slider2";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  thumbnail?: string;
  slug?: string;
  categories: {
    id: number;
    name: string;
    slug?: string;
    categories: {
      id: number;
      name: string;
      slug?: string;
    }[];
  }[];
};

export default async function Home() {
  const fetchHero = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/sliders`
  ).then((res) => res.json());

  const bestSelling = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/best-selling?limit=30`
  ).then((res) => res.json());

  const trendingProduct = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/trending?limit=10`
  ).then((res) => res.json());

  const newProduct = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products-list/new-arrivals?limit=10`
  ).then((res) => res.json());

  const categoryData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/categories/navigation`
  ).then((res) => res.json());

  const processData = categoryData.map((item: Category) => ({
    id: item.id,
    name: item.name,
    thumbnail: item.thumbnail,
    slug: item.slug,
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

      <div className=" py-6 md:py-10 px-6 lg:px-20">
        <h2 className="text-[30px] md:text-[40px] font-serif ">
          Shop Best Sellers
        </h2>
        {/* <div className=" flex items-center gap-2 py-4">
          <Button className=" rounded-full">men</Button>{" "}
          <Button className=" rounded-full">women</Button>
        </div> */}
        <ProductSlider2 slides={bestSelling.data.products} />
      </div>

      <div className=" py-6 md:py-10 px-6 lg:px-20">
        <h2 className="text-[30px] md:text-[40px] font-serif ">
          Shop New Releases
        </h2>
        {/* <div className=" flex items-center gap-2 py-4">
          <Button className=" rounded-full">men</Button>{" "}
          <Button className=" rounded-full">women</Button>
        </div> */}
        {/* <ProductSlider slides={products} /> */}
        <ProductSlider2 slides={newProduct.data.products} />
      </div>

      <div className=" py-6 md:py-10 px-6 lg:px-7">
        <h2 className="text-[30px] md:text-[40px] font-serif ">
          Shop by Category
        </h2>
        <div className="h-[1px] w-full bg-slate-300 my-2"></div>
        <div className=" hidden md:block space-y-6">
          {rows.map((row, rowIndex) => {
            const count = row.length;
            let basisClass = " basis-1/4"; // default for 4 items

            if (count === 1) basisClass = "basis-full";
            if (count === 2) basisClass = "basis-1/2";
            if (count === 3) basisClass = "basis-1/3";

            return (
              <div key={rowIndex} className="flex gap-6">
                {row.map((category: Category) => (
                  <Link
                    href={`/search?category_slug=${category.slug}`}
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

        <div className=" md:hidden grid grid-cols-1 gap-6">
          {rows.flat().map((category: Category) => (
            <Link
              href={`/search?category_slug=${category.slug}`}
              key={category.id}
              className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden group cursor-pointer"
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
      </div>

      {/* <div className=" py-6 md:py-10 px-6 lg:px-20">
        <h2 className="text-[40px] font-serif ">Trending Collections</h2>
        <div className=" flex items-center gap-2 py-4">
          <Button className=" rounded-full">men</Button>{" "}
          <Button className=" rounded-full">women</Button>
        </div>
        <ProductSlider slides={products} />
        <ProductSlider2 slides={trendingProduct.data.products} />
      </div> */}

      <div className=" py-6 md:py-10 px-6 lg:px-7">
        <h2 className=" text-[30px] md:text-[40px] font-serif ">
          Trending Collections
        </h2>
        {/* <TrendCollection /> */}
        <ProductSlider2 slides={trendingProduct.data.products} />
      </div>

      <div className=" py-6 md:py-10 px-6 lg:px-7">
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className=" w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <Image
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sale Banner"
              fill
              className=" object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className=" absolute inset-0 bg-black/30 "></div>
            <div className=" absolute  z-10 flex items-end flex-col right-8 bottom-6 text-white ">
              <p className=" text-[40px]"> Womens</p>

              <div className=" grid grid-cols-1 gap-4">
                <Link href={"/search?gender=women"}>
                  <Button className=" mt-6 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sale Banner"
              fill
              className=" object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className=" absolute inset-0 bg-black/30 "></div>
            <div className=" absolute  z-10 flex items-end flex-col right-8 bottom-6 text-white ">
              <p className=" text-[40px] "> Mens</p>

              <div className=" grid grid-cols-1 gap-4">
                <Link href={"/search?gender=men"}>
                  <Button className=" mt-6 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
