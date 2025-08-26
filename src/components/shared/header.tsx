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

const linkList = [
  { name: "Home", href: "#" },
  { name: "Products", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

const Header = () => {
  return (
    <div className="bg-white flex items-center justify-between w-screem  border-b-[1px] border-slate-300 py-4 top-0 left-0 sticky z-50 ">
      <NavigationMenu className=" px-6">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className=" [&>svg]:hidden">
              Men
            </NavigationMenuTrigger>
            <NavigationMenuContent className=" w-full">
              <div className="w-screen bg-white p-6 shadow-lg">
                {/* Your menu content here */}
                <div className="">
                  <h2 className="text-2xl font-bold mb-4">
                    Men&apos;s Collection
                  </h2>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Clothing</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            T-Shirts
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Shirts
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Jeans
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Pants
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Jackets
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Footwear</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Sneakers
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Formal Shoes
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Sandals
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Boots
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Accessories</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Watches
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Bags
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Belts
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Sunglasses
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div>
                      <h3 className="font-semibold mb-3">Featured</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm mb-2">New Arrivals</p>
                        <button className="bg-black text-white px-4 py-2 rounded text-sm">
                          Shop Now
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className=" [&>svg]:hidden">
              Women
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 w-screen">
              <div className="w-screen bg-white p-6 shadow-lg">
                {/* Your menu content here */}
                <div className="container mx-auto">
                  <h2 className="text-2xl font-bold mb-4">
                    Women&apos;s Collection
                  </h2>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Clothing</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            T-Shirts
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Shirts
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Jeans
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Pants
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Jackets
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Footwear</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Sneakers
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Formal Shoes
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Sandals
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Boots
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Accessories</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Watches
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Bags
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Belts
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-blue-600">
                            Sunglasses
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div>
                      <h3 className="font-semibold mb-3">Featured</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm mb-2">New Arrivals</p>
                        <button className="bg-black text-white px-4 py-2 rounded text-sm">
                          Shop Now
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
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
