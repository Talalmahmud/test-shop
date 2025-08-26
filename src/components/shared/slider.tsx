"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "./product-card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  id: string | number;
  image: string;
  title: string;
  colorOptions?: string[];
  reviews: number;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  entries: number;
  tag?: string;
  href?: string;
}

type Props = {
  slides: Slide[];
  className?: string;
};

const ProductSlider = ({ slides, className }: Props) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Update navigation when swiper is initialized
  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      setTimeout(() => {
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }, 100);
    }
  }, [swiperInstance]);

  // Update button states on slide change
  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      const handleSlideChange = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      };

      swiperInstance.on("slideChange", handleSlideChange);

      return () => {
        swiperInstance.off("slideChange", handleSlideChange);
      };
    }
  }, [swiperInstance]);

  return (
    <section className={cn("relative w-full overflow-hidden py-4", className)}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        spaceBetween={16} // Consistent 16px gap between items
        slidesPerView={"auto"} // Allows flexible number of slides based on container width
        centeredSlides={false}
        grabCursor={true}
        onSwiper={setSwiperInstance}
        className="!overflow-visible" // Important to make slides visible outside container
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="!w-[400px]">
            {" "}
            {/* Fixed width for consistent sizing */}
            <ProductCard {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows with Shadcn UI */}
      <Button
        ref={prevRef}
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white backdrop-blur-sm transition-all hover:bg-slate-300 shadow-lg border-2 border-gray-200",
          "h-12 w-12", // Larger size
          isBeginning && "opacity-0 pointer-events-none"
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="min-h-6 min-w-6" /> {/* Larger icon */}
      </Button>

      <Button
        ref={nextRef}
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white backdrop-blur-sm transition-all hover:bg-slate-300 shadow-lg border-2 border-gray-200",
          "h-12 w-12", // Larger size
          isEnd && "opacity-0 pointer-events-none"
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="min-h-6 min-w-6" /> {/* Larger icon */}
      </Button>
    </section>
  );
};

export default ProductSlider;
