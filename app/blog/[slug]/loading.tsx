import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans">
      <Header />

      <main className="pt-24 pb-16">
        {/* Back Link Skeleton */}
        <div className="container mx-auto px-6 max-w-4xl mb-8">
          <div className="h-5 w-40 bg-[var(--color-secondary)] rounded animate-pulse" />
        </div>

        <article className="container mx-auto px-6 max-w-4xl">
          {/* Header Skeleton */}
          <header className="mb-12 text-center space-y-6">
            {/* Category badges skeleton */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-6 w-20 bg-[var(--color-secondary)] rounded-full animate-pulse" />
              <div className="h-6 w-24 bg-[var(--color-secondary)] rounded-full animate-pulse" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-3">
              <div className="h-10 bg-[var(--color-secondary)] rounded-lg w-3/4 mx-auto animate-pulse" />
              <div className="h-10 bg-[var(--color-secondary)] rounded-lg w-2/3 mx-auto animate-pulse" />
            </div>

            {/* Meta info skeleton */}
            <div className="flex items-center justify-center space-x-6">
              <div className="h-4 w-32 bg-[var(--color-secondary)] rounded animate-pulse" />
              <div className="h-4 w-28 bg-[var(--color-secondary)] rounded animate-pulse" />
              <div className="h-4 w-24 bg-[var(--color-secondary)] rounded animate-pulse" />
            </div>
          </header>

          {/* Featured Image Skeleton */}
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[var(--color-secondary)] mb-12 animate-pulse" />

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-[var(--color-secondary)] rounded animate-pulse"
                style={{ width: `${Math.random() * 30 + 70}%` }}
              />
            ))}
          </div>

          {/* Tags section skeleton */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
            <div className="h-4 w-40 bg-[var(--color-secondary)] rounded animate-pulse" />
            <div className="h-4 w-32 bg-[var(--color-secondary)] rounded animate-pulse" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
