// components/ProductSEO.tsx
import Head from "next/head";
// types/product.ts
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  meta_title: string;
  meta_description: string;
  meta_image: string;
  pricing: {
    discounted_price: number;
    base_price: number;
  };
  media: {
    thumbnail: string;
    gallery: Array<{
      original: string;
      thumbnail: string;
    }>;
  };
  inventory: {
    stock_status: string;
  };
  brand: {
    name: string;
  } | null;
  sku: string | null;
  // Add other properties as needed
}

export interface ProductSEOProps {
  product: Product;
}
export default function ProductSEO({ product }: ProductSEOProps) {
  const productUrl = `https://yourdomain.com/products/${product.slug}`;
  const productImage = product.meta_image || product.media.thumbnail;
  const price = product.pricing.discounted_price || product.pricing.base_price;
  const currency = "BDT"; // Adjust based on your currency
  const availability =
    product.inventory?.stock_status === "in_stock"
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  // Clean description by removing HTML tags
  const cleanDescription =
    product.meta_description?.replace(/<[^>]*>/g, "") ||
    product.description?.replace(/<[^>]*>/g, "") ||
    product.short_description?.replace(/<[^>]*>/g, "") ||
    `Buy ${product.name} at the best price`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{product.meta_title || product.name}</title>
      <meta name="title" content={product.meta_title || product.name} />
      <meta name="description" content={cleanDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={productUrl} />
      <meta property="og:title" content={product.meta_title || product.name} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={productImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="product:price:amount" content={price.toString()} />
      <meta property="product:price:currency" content={currency} />
      <meta property="product:availability" content={availability} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={productUrl} />
      <meta
        property="twitter:title"
        content={product.meta_title || product.name}
      />
      <meta property="twitter:description" content={cleanDescription} />
      <meta property="twitter:image" content={productImage} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            description: cleanDescription,
            image: productImage,
            sku: product.sku || `PROD-${product.id}`,
            mpn: product.id.toString(),
            brand: {
              "@type": "Brand",
              name: product.brand?.name || "Generic",
            },
            offers: {
              "@type": "Offer",
              url: productUrl,
              priceCurrency: currency,
              price: price,
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              itemCondition: "https://schema.org/NewCondition",
              availability: availability,
            },
          }),
        }}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={productUrl} />
    </Head>
  );
}
