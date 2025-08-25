"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Play, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  button1Text: string;
  button2Text: string;
  button1Link: string;
  button2Link: string;
}

const Hero = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const slides: Slide[] = [
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "New Arrivals",
      description:
        "Be the first to explore our new arrivals and get ahead of the fashion curve with these stunning pieces.",
      button1Text: "View Collection",
      button2Text: "Learn More",
      button1Link: "#",
      button2Link: "#",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      title: "Exclusive Offers",
      description:
        "Limited time offers on premium products. Don't miss out on these incredible deals.",
      button1Text: "See Offers",
      button2Text: "Get Inspired",
      button1Link: "#",
      button2Link: "#",
    },
  ];

  // Update navigation when swiper is initialized
  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      // Update navigation after a short delay to ensure DOM is ready
      setTimeout(() => {
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }, 100);
    }
  }, [swiperInstance]);

  return (
    <section className="relative h-[700px] w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: white; width: 10px; height: 10px; margin: 0 4px;"></span>`;
          },
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-[700px] w-full"
        onSwiper={setSwiperInstance}
        onInit={(swiper) => {
          // Reinitialize navigation with the correct elements
          setTimeout(() => {
            swiper.navigation.init();
            swiper.navigation.update();
          }, 100);
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full w-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
              <div className="max-w-3xl space-y-6 px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 transform flex-col items-center space-y-6">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-full font-medium">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {slide.button1Text}
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 px-6 py-3 rounded-full font-medium"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {slide.button2Text}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-3 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-3 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
