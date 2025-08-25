"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "./product-card";

type Product = {
  id: number | string;
  image: string;
  title: string;
  reviews: number;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  entries: number;
  tag?: string;
  colorOptions?: string[];
};

export default function ProductSlider({ products }: { products: Product[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4.2 },
        }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
