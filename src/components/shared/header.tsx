import { Search, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import Cart from "./cart";
import ProductSearch from "./search";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Image from "next/image";
import MobileMenu from "./mobile-menu";

const linkList = [
  { name: "Home", href: "#" },
  { name: "Products", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

type Category = {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
    categories: {
      id: number;
      name: string;
    }[];
  }[];
};

const Header = async () => {
  const listData = await fetch(
    "http://192.168.50.3/elevatedbd-main/public/api/v2/categories/navigation"
  ).then((res) => res.json());
  const processData = listData.map((item: Category) => ({
    id: item.id,
    name: item.name,
    categories: item.categories.map((subItem) => ({
      id: subItem.id,
      name: subItem.name,
      categories: subItem.categories.map((subSubItem) => ({
        id: subSubItem.id,
        name: subSubItem.name,
      })),
    })),
  }));

  return (
    <div className="bg-white flex items-center justify-between w-screem  border-b-[1px] border-slate-300 py-4 top-0 left-0 sticky z-50 ">
      <MobileMenu categories={processData} />

      <NavigationMenu className="hidden md:flex mx-4 text-black">
        <NavigationMenuList>
          {processData.map((category: Category) => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger className="[&>svg]:hidden bg-transparent hover:bg-gray-100 px-4 py-2">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[600px] bg-white p-6 shadow-lg rounded-md">
                  <h2 className="text-2xl font-bold mb-4">
                    {category.name} Collection
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {category.categories.map((subCategory) => (
                      <div key={subCategory.id}>
                        <h3 className="font-semibold mb-3 text-gray-800 border-b pb-1">
                          <Link
                            href={`/category/${subCategory.id}`}
                            className="hover:text-blue-600"
                          >
                            {subCategory.name}
                          </Link>
                        </h3>
                        <ul className="space-y-2">
                          {subCategory.categories.map((subSubCategory) => (
                            <li key={subSubCategory.id}>
                              <Link
                                href={`/category/${subSubCategory.id}`}
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
                      href={`/category/${category.id}`}
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

      <Link href={"/"} className="active:animate-ping ">
        <Image src={"/logo.png"} alt="Logo" width={40} height={10} />
      </Link>

      <div className="flex items-center space-x-4 pr-6">
        <ProductSearch />
        <Link href={"/login"}>
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
