import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft, FilterIcon, Search, X } from "lucide-react";
import { Button } from "../ui/button";

const Filter = () => {
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Button>Filter</Button>
      </SheetTrigger>
      <SheetContent className="px-4 min-w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[500px] xl:min-w-[500px] 2xl:min-w-[600px]">
        <SheetHeader className="mb-6">
          <SheetTitle className=" flex justify-between items-center font-bold">
            {" "}
            <SheetClose asChild>
              <button className="flex items-center text-blue-600 text-[24px] font-medium hover:underline">
                <ArrowLeft className="mr-2" />
                Back to Shopping
              </button>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="text-base"></SheetDescription>
        </SheetHeader>

        <div className=" px-4"></div>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
