import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllBlogs } from "@/lib/blogs";

interface BlogListingPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  // Get static blogs
  const blogs = getAllBlogs();

  // For now, we'll display all blogs in the featured section
  // You can later implement category filtering based on searchParams
  const mappedFeaturedBlogs = blogs;

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

          {mappedFeaturedBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--color-muted-foreground)] text-lg">
                No featured posts available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {mappedFeaturedBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </section>

        {/* Trending Blogs Section - Hidden for now as we only have one blog */}
      </main>

      <Footer />
    </div>
  );
}
