"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "../CartContext";
import { getToken } from "@/services/token";
import Link from "next/link";

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  meta_title: string;
  meta_description: string;
  meta_image: string;
  tags: string;
  sku: string | null;
  pricing: Pricing;
  type: ProductType;
  inventory: Inventory;
  media: Media;
  specifications: Specifications;
  brand: string | null;
  category: Category;
  seller: Seller;
  variants: Variant[];
  reviews: Reviews;
  features: Features;
  taxes: Tax[];
  urls: Urls;
  seo: Seo;
}

export interface Pricing {
  base_price: number;
  base_price_formatted: string;
  discounted_price: number;
  discounted_price_formatted: string;
  discount_percentage: number;
  discount_amount: number;
  discount_amount_formatted: string;
  unit: string;
  min_quantity: number;
  max_quantity: number;
  unit_price: number;
  unit_price_formatted: string;
}

export interface ProductType {
  wholesale: boolean;
  auction: boolean;
  digital: boolean;
  used: boolean;
  featured: boolean;
  todays_deal: boolean;
  published: boolean;
  approved: boolean;
}

export interface Inventory {
  total_quantity: number;
  stock_visibility: string;
  stock_status: string;
  low_stock_threshold: number;
  stock_warning: boolean;
}

export interface Media {
  thumbnail: string;
  gallery: Gallery[];
  video: Video;
  pdf: string | null;
  documentation: string | null;
}

export interface Gallery {
  original: string;
  thumbnail: string;
}

export interface Video {
  link: string | null;
  provider: string;
  thumbnail: string | null;
}

export interface Specifications {
  attributes: Attribute[];
  colors: Color[];
  specifications_list: SpecificationList[];
  weight: number;
  dimensions: Dimensions;
  warranty: string | null;
  warranty_type: string | null;
}

export interface Attribute {
  id: string;
  name: string;
  values: string[];
}

export interface Color {
  code: string;
  name: string;
  hex_code: string;
  display_color: string;
}

export interface SpecificationList {
  name: string;
  value: string;
}

export interface Dimensions {
  length: string | null;
  width: string | null;
  height: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  banner: string;
  description: string | null;
  level: number;
  order_level: number;
}

export interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string;
  rating: number;
  total_reviews: number;
  shop: string | null;
}

export interface Variant {
  id: number;
  variant: string;
  sku: string;
  quantity: number;
  price: number;
  price_formatted: string;
  image: string | null;
}

export interface Reviews {
  statistics: ReviewStatistics;
  list: [];
  star_rating: StarRating;
}

export interface ReviewStatistics {
  total: number;
  average: number;
  distribution: {
    "5_star": number;
    "4_star": number;
    "3_star": number;
    "2_star": number;
    "1_star": number;
  };
}

export interface StarRating {
  value: number;
  full_stars: number;
  half_star: number;
  empty_stars: number;
  visual: string;
}

export interface Features {
  club_points: number;
  estimated_shipping_days: number;
  cash_on_delivery: boolean;
  external_link: string | null;
  external_link_button: string | null;
  refundable: boolean;
  flash_deal: string | null;
}

export interface Tax {
  id: number;
  name: string | null;
  rate: number;
  type: string;
}

export interface Urls {
  web: string;
  share: {
    facebook: string;
    twitter: string;
    whatsapp: string;
    telegram: string;
  };
}

export interface Seo {
  meta_title: string;
  meta_description: string;
  meta_image: string;
  canonical_url: string;
  og_type: string;
  twitter_card: string;
}
interface ProductDetailClientProps {
  product: Product;
  isToken: boolean;
}

export default function ProductDetailClient({
  product,
  isToken,
}: ProductDetailClientProps) {
  console.log(product);
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<Color>(
    product.specifications.colors?.[0]
  );
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  // console.log([selectedColor?.name, ...Object.values(selectedOptions)]);
  function checkAllInString(str: string, arr: string[]) {
    // remove null/undefined/empty items and check
    return arr.filter(Boolean).every((item) => str.includes(item));
  }
  useEffect(() => {
    const variant = product.variants.find((v: Variant) =>
      checkAllInString(v.variant, [
        selectedColor?.name,
        ...Object.values(selectedOptions),
      ])
    );
    setSelectedVariant(variant || null);
  }, [product.variants, selectedColor, selectedOptions]);
  // console.log(selectedVariant);
  // handle option (like length, width)
  const handleOptionSelect = (optionName: string, value: string) => {
    const noSpaces = value.replaceAll(" ", "");
    setSelectedOptions((prev) => ({ ...prev, [optionName]: noSpaces }));
  };

  const currentPrice = selectedVariant?.price || product.pricing.base_price;
  const currentStock =
    selectedVariant?.quantity || product.inventory.total_quantity;
  const canAddToCart = currentStock > 0;

  const handleAddToCart = async () => {
    console.log(selectedVariant);
    if (!selectedVariant) {
      alert("Please select all options before adding to cart!");
      return;
    }
    // You can call your API/cart context here
    const res = await addToCart(product.id, selectedVariant.variant, 1);
    console.log(res);
  };

  return (
    <div>
      <section className="w-full px-6 md:px-7 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left - Images */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-[400px] lg:h-screen overflow-y-auto scrollbar-hide">
          {product.media.gallery.map(
            (photo: { original: string }, i: number) => (
              <div
                key={i}
                className="relative w-full min-h-[400px] md:min-h-[450px] rounded-xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={photo.original}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            )
          )}
        </div>

        {/* Right - Details */}
        <div>
          {/* Shop Info */}
          <div className="flex items-center gap-2 mb-4">
            {product.seller?.avatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm text-gray-600">
              {product.seller?.name}
            </span>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < product.reviews.statistics.average
                    ? "fill-yellow-500"
                    : "fill-gray-200"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviews.statistics.total} reviews)
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

          {/* Price */}
          <div className="mt-3">
            <p className="text-red-600 font-semibold text-xl">
              ৳ {currentPrice.toLocaleString()}
            </p>
            {product.pricing.discount_percentage > 0 && (
              <p className="line-through text-gray-400 text-sm">
                {product.pricing.base_price_formatted}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            <p
              className={`text-sm ${
                currentStock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {currentStock > 0
                ? `In Stock (${currentStock} available)`
                : "Out of Stock"}
            </p>
          </div>

          {/* Colors */}
          {product.specifications.colors.length > 0 && (
            <div className="mt-5">
              <p className="font-medium">Colors</p>
              <div className="flex gap-2 mt-2">
                {product.specifications.colors.map(
                  (color: Color, i: number) => (
                    <button
                      key={i}
                      className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition ${
                        selectedColor.hex_code === color.hex_code
                          ? "border-blue-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color.name}`}
                    >
                      <span
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color.hex_code }}
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Attributes (length, width, etc.) */}
          {product.specifications.attributes.map(
            (attr: Attribute, i: number) => (
              <div key={i} className="mt-5">
                <p className="font-medium">{attr.name}</p>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {attr.values.map((value: string, idx: number) => (
                    <Button
                      key={idx}
                      variant={
                        selectedOptions[attr.name] === value.replaceAll(" ", "")
                          ? "default"
                          : "outline"
                      }
                      className="rounded-md"
                      onClick={() => handleOptionSelect(attr.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Add to Cart */}
          {isToken ? (
            <Button
              className="w-full mt-8 h-12 text-lg font-semibold"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              {canAddToCart ? "Add To Cart" : "Out of Stock"}
            </Button>
          ) : (
            <Link className=" " href={"/login"}>
              <Button className="w-full mt-8">Please Login</Button>
            </Link>
          )}

          {/* Description */}
          <div className="mt-6 text-sm text-gray-600">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Accordion - Product Details */}
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="product-info">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    <strong>SKU:</strong> {product.sku || "N/A"}
                  </p>
                  <p>
                    <strong>Unit:</strong> {product.pricing.unit}
                  </p>
                  {product.tags && (
                    <div>
                      <strong>Tags:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.tags
                          .split(",")
                          .map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="bg-gray-100 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
