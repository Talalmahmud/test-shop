import { AlignJustify } from "lucide-react";
import React from "react";
import {
  Sheet,
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
const MobileMenu = () => {
  return (
    <div className=" block md:hidden">
      <Sheet>
        <SheetTrigger>
          {" "}
          <div className=" h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
            <AlignJustify size={14} />
          </div>
        </SheetTrigger>
        <SheetContent className="px-4 min-w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[500px] xl:min-w-[500px] 2xl:min-w-[600px]">
          <SheetHeader className="mb-6">
            <SheetTitle className=" flex justify-between items-center font-bold">
              {" "}
            </SheetTitle>
            <SheetDescription className="text-base"></SheetDescription>
          </SheetHeader>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link href="/">Pant</Link>
                <Link href="/">Pant</Link>

                <Link href="/">Pant</Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link href="/">Pant</Link>
                <Link href="/">Pant</Link>

                <Link href="/">Pant</Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <Link href="/">Pant</Link>
                <Link href="/">Pant</Link>

                <Link href="/">Pant</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
