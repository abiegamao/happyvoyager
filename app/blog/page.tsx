import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getSupabaseBlogs } from "@/lib/supabase-blogs";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BlogListingPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 6;

  // Fetch published blogs from Supabase
  const { blogs: supabaseBlogs, total } = await getSupabaseBlogs(
    currentPage,
    limit
  );
  const totalPages = Math.ceil(total / limit);

  const displayedBlogs = supabaseBlogs;

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col font-sans">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24 bg-[var(--color-secondary)] mb-12 overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-accent)] opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="container mx-auto relative z-10 max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-script text-[var(--color-charcoal)] animate-fade-in relative inline-block">
              <span className="relative z-10">Our Travel Journal</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--color-primary)]/30 -rotate-1 rounded-full -z-10" />
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl mx-auto leading-relaxed">
              Stories, tips, and inspiration for your next handcrafted journey.
              Discover the world through our eyes.
            </p>
          </div>
        </section>

        {/* Featured Blogs Section */}
        <section className="container mx-auto px-6 max-w-7xl mb-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-script text-[var(--color-charcoal)] mb-2 relative inline-block">
              <span className="relative z-10">Featured Stories</span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-[var(--color-primary)]/20 -rotate-1 rounded-full -z-10" />
            </h2>
            <p className="text-[var(--color-muted-foreground)] mt-2">
              Handpicked articles and travel guides
            </p>
          </div>

          {displayedBlogs.length === 0 ? (
            <div className="text-center py-16 bg-[var(--color-secondary)]/10 rounded-3xl border border-[var(--color-border)]">
              <p className="text-[var(--color-muted-foreground)] text-lg">
                No posts found. check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {displayedBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center space-x-6">
              {currentPage > 1 ? (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all text-[var(--color-charcoal)]"
                >
                  <ArrowLeft className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:-translate-x-1" />
                  <span className="font-medium">Previous</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[var(--color-secondary)]/50 border border-transparent text-[var(--color-muted-foreground)] cursor-not-allowed opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Previous</span>
                </button>
              )}

              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                Page <span className="text-[var(--color-primary)]">{currentPage}</span> of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all text-[var(--color-charcoal)]"
                >
                  <span className="font-medium">Next</span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[var(--color-secondary)]/50 border border-transparent text-[var(--color-muted-foreground)] cursor-not-allowed opacity-50"
                >
                  <span className="font-medium">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
