import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col font-sans">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section Skeleton */}
        <section className="relative px-6 py-16 md:py-24 bg-[var(--color-secondary)] mb-12">
          <div className="container mx-auto relative z-10 max-w-4xl text-center space-y-6">
            <div className="h-12 bg-white/20 rounded-lg w-3/4 mx-auto animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>
        </section>

        {/* Featured Blogs Section Skeleton */}
        <section className="container mx-auto px-6 max-w-7xl mb-20">
          <div className="mb-12">
            <div className="h-10 bg-[var(--color-secondary)] rounded-lg w-64 mb-2 animate-pulse" />
            <div className="h-4 bg-[var(--color-secondary)] rounded w-48 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-[var(--color-secondary)] rounded-2xl animate-pulse" />
                <div className="h-6 bg-[var(--color-secondary)] rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-[var(--color-secondary)] rounded w-full animate-pulse" />
                <div className="h-4 bg-[var(--color-secondary)] rounded w-2/3 animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
