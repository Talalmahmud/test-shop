import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Notice from "@/components/shared/notice";
import Footer from "@/components/shared/footer";
import { CartProvider } from "@/components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevate BD | Where style meets affordability",
  description:
    "Discover Elevate BD – where style meets affordability. Shop quality products at unbeatable prices.",
  keywords: [
    "Elevate BD",
    "Bangladesh Fashion",
    "Affordable Style",
    "Online Shopping",
    "Ecommerce",
  ],
  authors: [{ name: "Elevate BD Team" }],
  openGraph: {
    title: "Elevate BD | Where style meets affordability",
    description:
      "Discover Elevate BD – where style meets affordability. Shop quality products at unbeatable prices.",
    url: "/logo.jpeg", // 🔥 Replace with your actual domain
    siteName: "Elevate BD",
    images: [
      {
        url: "/opengraph-image.png", // 🔥 put your OG image inside /public
        width: 1200,
        height: 630,
        alt: "Elevate BD - Where style meets affordability",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourtwitter", // 🔥 replace with your Twitter username if you have
  //   creator: "@yourtwitter",
  //   images: ["/logo.jpeg"],
  // },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // metadataBase: new URL("https://yourdomain.com"), 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hide`}
      >
        <CartProvider>
          <Notice />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
