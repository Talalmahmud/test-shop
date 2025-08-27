import { AlignJustify } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";

// Define the category type
type CategoryItem = {
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

interface MobileMenuProps {
  categories: CategoryItem[];
}

const MobileMenu = ({ categories }: MobileMenuProps) => {
  return (
    <div className="pl-6 block md:hidden">
      <Sheet>
        <SheetTrigger>
          <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
            <AlignJustify size={14} />
          </div>
        </SheetTrigger>
        <SheetContent className="px-4 min-w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[500px] xl:min-w-[500px] 2xl:min-w-[600px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold">
              {" "}
              <Image src={"/logo.png"} alt="Logo" width={40} height={10} />
            </SheetTitle>
            <SheetDescription className="text-base"></SheetDescription>
          </SheetHeader>

          <Accordion type="single" collapsible className="w-full">
            {categories.map((category, index) => (
              <AccordionItem key={category.id} value={`item-${category.id}`}>
                <AccordionTrigger className="font-medium text-lg">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 border-l border-gray-200 ml-2">
                    {category.categories.map((subCategory) => (
                      <div key={subCategory.id} className="mb-4 last:mb-0">
                        <SheetClose asChild>
                          <Link
                            href={`/category/${subCategory.id}`}
                            className="font-medium text-gray-800 block py-2 hover:text-blue-600"
                          >
                            {subCategory.name}
                          </Link>
                        </SheetClose>

                        {subCategory.categories &&
                          subCategory.categories.length > 0 && (
                            <div className="pl-4 mt-2">
                              {subCategory.categories.map((subSubCategory) => (
                                <SheetClose key={subSubCategory.id} asChild>
                                  <Link
                                    href={`/category/${subSubCategory.id}`}
                                    className="text-gray-600 block py-1 hover:text-blue-600"
                                  >
                                    {subSubCategory.name}
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}

                    <SheetClose asChild>
                      <Link
                        href={`/category/${category.id}`}
                        className="mt-4 text-blue-600 font-medium inline-block hover:text-blue-800"
                      >
                        View All {category.name}
                      </Link>
                    </SheetClose>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Account</h3>
            <div className="flex flex-col gap-2">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="py-2 px-4 hover:bg-gray-100 rounded-md"
                >
                  Sign In
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/register"
                  className="py-2 px-4 hover:bg-gray-100 rounded-md"
                >
                  Create Account
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
