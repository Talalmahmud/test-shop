"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard2 from "./product-card-2";

interface Slide {
  id: string | number;
  name: string;
  slug: string;
  thumbnail: string;
  base_price: string;
  discounted_price: string;
  discount_percentage: number;
  rating: number;
  rating_stars: {
    rating: number;
    full_stars: number;
    half_star: number;
    empty_stars: number;
    stars_html: string;
  };
  gender_name: string;
  wholesale_product: number;
  auction_product: number;
  sales_count: number;
  club_point: string | null;
  // Optional fields that might not be present in all items
  colorOptions?: string[];
  entries?: number;
  tag?: string;
}

type Props = {
  slides: Slide[];
  className?: string;
};

const ProductSlider2 = ({ slides, className }: Props) => {
  console.log(slides);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("men");

  // Filter slides based on active filter
  const filteredSlides = useMemo(() => {
    return slides.filter(
      (slide) =>
        slide?.gender_name?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [slides, activeFilter]);

  // Reset swiper to beginning when filter changes
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(0);
      swiperInstance.update();
    }
  }, [filteredSlides, swiperInstance]);

  // Update navigation when swiper is initialized
  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      setTimeout(() => {
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }, 100);
    }
  }, [swiperInstance, filteredSlides]); // Added filteredSlides dependency

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
    <div className="space-y-4 w-full">
      {/* Filter Buttons */}
      <div className="flex items-center gap-3 py-4">
        <Button
          variant={activeFilter === "men" ? "default" : "outline"}
          className={cn(
            "rounded-full px-6 py-2 transition-all",
            activeFilter === "men" && "bg-primary text-primary-foreground"
          )}
          onClick={() => setActiveFilter("men")}
        >
          Men
        </Button>
        <Button
          variant={activeFilter === "women" ? "default" : "outline"}
          className={cn(
            "rounded-full px-6 py-2 transition-all",
            activeFilter === "women" && "bg-primary text-primary-foreground"
          )}
          onClick={() => setActiveFilter("women")}
        >
          Women
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground px-2">
        Showing {filteredSlides.length} product
        {filteredSlides.length !== 1 ? "s" : ""}
      </div>

      <section
        className={cn("relative w-full overflow-hidden py-4", className)}
      >
        {filteredSlides.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              spaceBetween={16}
              slidesPerView={"auto"}
              centeredSlides={false}
              grabCursor={true}
              onSwiper={setSwiperInstance}
              className="!overflow-visible"
            >
              {filteredSlides.map((slide) => (
                <SwiperSlide key={slide.id} className="!w-[300px]">
                  <ProductCard2 className="w-full sm:w-[300px]" item={slide} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <Button
              ref={prevRef}
              variant="outline"
              size="icon"
              className={cn(
                "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white backdrop-blur-sm transition-all hover:bg-slate-300 shadow-lg border-2 border-gray-200",
                "h-12 w-12",
                isBeginning && "opacity-0 pointer-events-none"
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="min-h-6 min-w-6" />
            </Button>

            <Button
              ref={nextRef}
              variant="outline"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white backdrop-blur-sm transition-all hover:bg-slate-300 shadow-lg border-2 border-gray-200",
                "h-12 w-12",
                isEnd && "opacity-0 pointer-events-none"
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="min-h-6 min-w-6" />
            </Button>
          </>
        ) : (
          // Empty state when no products match the filter
          <div className="text-center py-12 text-muted-foreground">
            <p>No {activeFilter} products found.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductSlider2;
