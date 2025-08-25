import { Search, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import Cart from "./cart";
import ProductSearch from "./search";

const linkList = [
  { name: "Home", href: "#" },
  { name: "Products", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

const Header = () => {
  return (
    <div className="bg-white flex items-center justify-between w-full px-5 md:px-6 lg:px-10 border-b-[1px] border-slate-300 py-4 top-0 left-0 sticky z-50 ">
      <div className=" flex items-center gap-8">
        {linkList.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className=" font-bold text-[14px]"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <Link href={"/"} className="text-2xl font-bold text-gray-800">
        E-Shop
      </Link>

      <div className="flex items-center space-x-4">
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
