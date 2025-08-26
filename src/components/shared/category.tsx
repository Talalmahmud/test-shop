import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Men's",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1709295208567-ce817387e977?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGp3ZWxsYXJ5JTIwZ29sZHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Men's",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuJTIwamFja2V0fGVufDB8fDB8fHww",
    title: "Men's",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Men's",
  },
];

const Category = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative w-full h-[500px] rounded-xl overflow-hidden group cursor-pointer"
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Link
            href={"/"}
            className="text-white text-[16px] font-semibold absolute bottom-4 flex items-center justify-center w-full underline"
          >
            {category.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
