import Image from "next/image";
import Link from "next/link";
import React from "react";

type Category = {
  id: number;
  name: string;
  thumbnail: string;
};

const Category = async () => {
  const listData = await fetch(
    "http://192.168.50.3/elevatedbd-main/public/api/v2/categories/navigation"
  ).then((res) => res.json());
  const processData = listData.map((item: Category) => ({
    id: item.id,
    name: item.name,
    thumbnail: item.thumbnail,
  }));
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {processData.map((category: Category) => (
        <Link
          href={"/search/uygu"}
          key={category.id}
          className="relative w-full h-[500px] rounded-xl overflow-hidden group cursor-pointer"
        >
          <Image
            src={category.thumbnail}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <p className="text-white text-[16px] font-semibold absolute bottom-4 flex items-center justify-center w-full underline">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Category;
