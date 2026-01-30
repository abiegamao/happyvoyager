import { MOCK_BLOGS } from "@/lib/mock-data";
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogListingPage() {
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
                            Stories, tips, and inspiration for your next handcrafted journey. Discover the world through our eyes.
                        </p>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {MOCK_BLOGS.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex space-x-2">
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${page === 1
                                            ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                                            : "bg-white text-[var(--color-charcoal)] border border-[var(--color-border)] hover:bg-[var(--color-secondary)]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <span className="w-10 h-10 flex items-center justify-center text-[var(--color-muted-foreground)]">...</span>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
