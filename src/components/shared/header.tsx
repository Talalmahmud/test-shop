import { Search, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import Cart from "./cart";
import ProductSearch from "./search";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import { cookies } from "next/headers";

const Header = async () => {
  const cookie = await cookies();
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
  // <div className="bg-white flex items-center justify-between w-screem  border-b-[1px] border-slate-300 py-4 top-0 left-0 sticky z-50 ">

  return (
    <div className="bg-white grid grid-cols-3 w-full border-b-[1px] border-slate-300 py-4 top-0 left-0 sticky z-50 ">
      <MobileMenu categories={processData} />

      <NavigationMenu className="hidden lg:flex pl-7 scrollbar-hide w-full  text-black">
        <NavigationMenuList>
          {processData.map((category: Category) => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger className="[&>svg]:hidden bg-transparent hover:bg-gray-100 px-2 py-2">
                <Link
                  href={`/search?category_slug=${category.slug}`}
                  className="hover:text-blue-600"
                >
                  {" "}
                  {category.name}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-screen bg-white p-6 scrollbar-hide rounded-md">
                  <div className="grid grid-cols-2 gap-6">
                    {category.children.map((subCategory) => (
                      <div key={subCategory.id}>
                        <h3 className="font-semibold mb-3 text-gray-800 border-b pb-1">
                          <Link
                            href={`/search?category_slug=${subCategory.slug}`}
                            className="hover:text-blue-600"
                          >
                            {subCategory.name}
                          </Link>
                        </h3>
                        <ul className="space-y-2">
                          {subCategory.children.map((subSubCategory) => (
                            <li key={subSubCategory.id}>
                              <Link
                                href={`/search?category_slug=${subSubCategory.slug}`}
                                className="text-gray-600 hover:text-blue-600 block py-1"
                              >
                                {subSubCategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <Link
                      href={`/search?category_slug=${category.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All {category.name}
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex justify-center">
        <Link href={"/"} className="active:animate-ping">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        </Link>
      </div>

      <div className=" flex justify-end items-center w-full space-x-4 pr-6">
        <ProductSearch />
        <Link
          href={cookie.get("token") ? "/user" : "/login"}
          className=" hidden md:block"
        >
          <div className=" h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
            <UserRound size={14} />
          </div>
        </Link>
        <Cart />
      </div>
    </div>
  );
};

export default Header;
