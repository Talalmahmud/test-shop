import SearchPage from "@/components/shared/search-page";
import Image from "next/image";

import React, { Suspense } from "react";

const Page = async () => {
  const listData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/categories/navigation`
  ).then((res) => res.json());
  const processData = listData.map((item: Category) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    children: item.children.map((subItem) => ({
      id: subItem.id,
      name: subItem.name,
      slug: subItem.slug,
      children: subItem.children.map((subSubItem) => ({
        id: subSubItem.id,
        name: subSubItem.name,
        slug: subSubItem.slug,
      })),
    })),
  }));
  // console.log(processData);
  return (
    <div>
      <Suspense>
        <Image
          src={
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="logo"
          width={1200}
          height={100}
          className=" w-full h-[200px] object-fill"
        />
        <SearchPage categoryList={processData} />
      </Suspense>
    </div>
  );
};

export default Page;
