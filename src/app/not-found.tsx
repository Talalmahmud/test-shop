"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Search, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-primary/30 via-primary/20 to-purple-500/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.1 }}
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-primary/20 blur-3xl"
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.1, 0.35, 0.1], y: [0, -10, 0] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="absolute h-1 w-1 rounded-full bg-foreground/30"
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
          />
        ))}
      </div>

      <section className="container grid min-h-screen place-items-center px-4 py-16">
        <Card className="mx-auto w-full max-w-2xl border-border/50 bg-background/70 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                404
              </span>
              <p className="text-sm text-muted-foreground">Page not found</p>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Well, this is awkward 😅
            </h1>
            <p className="mt-3 text-muted-foreground">
              The page you’re looking for doesn’t exist or has been moved. Try
              searching below or head back home.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2"
              role="search"
              aria-label="Search site"
            >
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <Input
                  placeholder="Search our site…"
                  className="pl-9"
                  aria-label="Search"
                />
              </div>
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </form>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button asChild size="lg" className="rounded-2xl">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-2xl"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>

            {/* Helpful links */}
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                Popular destinations
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Pricing", href: "/pricing" },
                  { label: "Docs", href: "/docs" },
                  { label: "Blog", href: "/blog" },
                  { label: "Changelog", href: "/changelog" },
                ].map((l) => (
                  <Button
                    asChild
                    key={l.href}
                    variant="ghost"
                    className="rounded-full"
                  >
                    <Link href={l.href} className="text-sm">
                      {l.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subtle footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          Tip: Double-check the URL or try our site search.
        </motion.p>
      </section>
    </main>
  );
}
