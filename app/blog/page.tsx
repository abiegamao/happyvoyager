import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogFilters from "@/components/BlogFilters";

import { getSupabaseBlogs, getSupabaseCategories } from "@/lib/supabase-blogs";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";

interface BlogListingPageProps {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const { page, category, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 6;

  // Fetch published blogs and categories from Supabase
  const [blogsResponse, categories] = await Promise.all([
    getSupabaseBlogs(currentPage, limit, search, category),
    getSupabaseCategories(),
  ]);

  const { blogs: supabaseBlogs, total } = blogsResponse;
  const totalPages = Math.ceil(total / limit);

  const displayedBlogs = supabaseBlogs;

  // Construct URL for pagination
  const getPaginationHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (targetPage > 1) params.set("page", targetPage.toString());
    if (category && category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : "/blog";
  };

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

        {/* Filters Section */}
        <BlogFilters categories={categories} />

        {/* Featured Blogs Section */}
        <section className="container mx-auto px-6 max-w-7xl mb-20">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-script text-[var(--color-charcoal)] mb-2 relative inline-block">
                <span className="relative z-10">
                  {search || (category && category !== "all") ? "Filtered Stories" : "Featured Stories"}
                </span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[var(--color-primary)]/20 -rotate-1 rounded-full -z-10" />
              </h2>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                {search || (category && category !== "all")
                  ? `Found ${total} ${total === 1 ? 'article' : 'articles'}`
                  : "Handpicked articles and travel guides"}
              </p>
            </div>
          </div>

          {displayedBlogs.length === 0 ? (
            <div className="text-center py-24 bg-[var(--color-secondary)]/10 rounded-[3rem] border border-dashed border-[var(--color-border)]">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Filter className="w-10 h-10 text-[var(--color-muted-foreground)]/30" />
              </div>
              <p className="text-[var(--color-charcoal)] text-xl font-medium mb-2">
                No stories match your criteria
              </p>
              <p className="text-[var(--color-muted-foreground)] mb-8">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                Clear all filters
              </Link>
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
            <div className="mt-20 flex justify-center items-center space-x-6">
              {currentPage > 1 ? (
                <Link
                  href={getPaginationHref(currentPage - 1)}
                  className="group flex items-center space-x-2 px-8 py-4 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-xl transition-all text-[var(--color-charcoal)]"
                >
                  <ArrowLeft className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:-translate-x-1" />
                  <span className="font-semibold">Previous</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center space-x-2 px-8 py-4 rounded-full bg-[var(--color-secondary)]/50 border border-transparent text-[var(--color-muted-foreground)] cursor-not-allowed opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-semibold">Previous</span>
                </button>
              )}

              <span className="text-sm font-bold text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/30 px-6 py-3 rounded-full border border-[var(--color-border)]/50">
                Page <span className="text-[var(--color-primary)]">{currentPage}</span> of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={getPaginationHref(currentPage + 1)}
                  className="group flex items-center space-x-2 px-8 py-4 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-xl transition-all text-[var(--color-charcoal)]"
                >
                  <span className="font-semibold">Next</span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center space-x-2 px-8 py-4 rounded-full bg-[var(--color-secondary)]/50 border border-transparent text-[var(--color-muted-foreground)] cursor-not-allowed opacity-50"
                >
                  <span className="font-semibold">Next</span>
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
