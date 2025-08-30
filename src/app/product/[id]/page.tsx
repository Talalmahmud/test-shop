import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// const product = {
//   id: 1,
//   title: "Hyperloop Hoodie",
//   reviews: 1281,
//   rating: 5,
//   originalPrice: 15800,
//   discountedPrice: 9400,
//   entries: 9400,
//   stapleColors: ["#9ca3af", "#374151", "#000000"], // gray, dark gray, black
//   seasonalColors: ["#64748b", "#7f1d1d", "#14532d"], // blue, maroon, green
//   sizes: ["S", "M", "L", "XL", "XXL"],
//   styles: ["Hoodie", "Pullover"],
//   description:
//     "We’ve taken the best features of your favorite hoodie and improved them with our Hyperloop French Terry fabric. A soft hand touch but durable enough to last through daily wear, the 4-way stretch construction allows this sweatshirt to retain its shape over time.",
//   images: ["/hoodie-blue.png", "/hoodie-model.png"],
// };

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product1 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product-details/${id}`
  ).then((res) => res.json());
  const productImage = [
    product1.data?.media?.thumbnail,
    ...product1.data?.media?.gallery.map(
      (img: { original: string }) => img.original
    ),
  ];

  return (
    <section className="container mx-auto md:px-7 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left - Images */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {productImage.map((img, i) => (
          <div
            key={i}
            className="relative w-full h-[450px] rounded-xl overflow-hidden bg-gray-100"
          >
            <Image
              src={img}
              alt={img}
              height={200}
              width={600}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Right - Details */}
      <div>
        {/* Reviews */}
        <div className="flex items-center gap-1 text-yellow-500">
          {/* {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < product1.reviews.star_rating.value
                  ? "fill-yellow-500"
                  : "fill-gray-200"
              )}
            />
          ))} */}
          <span className="ml-2 text-sm text-gray-500">
            {product1?.data.reviews?.statistics?.total} reviews
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mt-2">{product1?.data.name}</h1>

        {/* Price */}
        <div className="mt-3">
          <p className="text-red-600 font-semibold text-xl">
            BDT {product1?.data.pricing?.base_price.toLocaleString()}
          </p>
          <p className="line-through text-gray-400 text-sm">
            BDT {product1?.data.pricing?.discounted_price.toLocaleString()}
          </p>
          {/* <p className="text-sm text-red-500">Earn {product1.entries} entries</p> */}
        </div>

        {/* Colors */}
        <div className="mt-5">
          <p className="font-medium"> Colors</p>
          <div className="flex gap-2 mt-2">
            {product1.data.specifications.colors.map(
              (color: { code: string }, i: number) => (
                <span
                  key={i}
                  className="w-7 h-7 rounded-full border cursor-pointer"
                  style={{ backgroundColor: color.code }}
                />
              )
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-6">
          <p className="font-medium">Size</p>
          {product1.data.specifications.attributes.map(
            (attribute: { name: string; values: string[]; id: string }) => (
              <div className="flex flex-col" key={attribute.id}>
                <p>{attribute.name}</p>
                <div className="flex gap-3 mt-2">
                  {attribute.values.map((size, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="w-12 h-12 rounded-md"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )
          )}
          {/* <div className="flex gap-3 mt-2">
            {product1.sizes.map((size, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-12 h-12 rounded-md"
              >
                {size}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Styles */}
        {/* <div className="mt-6">
          <p className="font-medium">Style</p>
          <div className="flex gap-3 mt-2">
            {product.styles.map((style, i) => (
              <Button
                key={i}
                variant="outline"
                className="px-6 py-2 rounded-md"
              >
                {style}
              </Button>
            ))}
          </div>
        </div> */}

        {/* Add to Cart */}
        <Button className="w-full mt-8 h-12 text-lg font-semibold">
          Add To Cart
        </Button>

        {/* Description */}
        <div className="mt-6 text-sm text-gray-600">
          <p>{product1.data.description}</p>
          {/* {SafeComponent(product1.data.description)} */}
          <div
            dangerouslySetInnerHTML={{ __html: product1.data.description }}
          />
        </div>

        {/* Accordion Sections */}
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="size-fit">
            <AccordionTrigger>Size & Fit</AccordionTrigger>
            <AccordionContent>
              True to size. Model is 5&apos;10&quot;, 170lbs and wears a size M.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="materials-care">
            <AccordionTrigger>Materials & Care</AccordionTrigger>
            <AccordionContent>
              95% Cotton, 5% Spandex. Machine wash cold, tumble dry low.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
