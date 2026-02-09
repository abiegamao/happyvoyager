import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import BlogContent from "@/components/BlogContent";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

// Next.js 13+ params handling
interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ScrapedBlog {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
  url: string;
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  // Skip during build time to avoid localhost connection errors
  // Pages will be generated on-demand for production
  return [];
}

// Allow dynamic params for new blog posts not available at build time
export const dynamicParams = true;

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  let blog: ScrapedBlog | null = null;
  let error = false;

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL;

    // Add timeout to fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${baseUrl}/api/scrape-blog/${slug}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      error = true;
    } else {
      const data = await response.json();
      if (data.success && data.blog) {
        blog = data.blog;
      } else {
        error = true;
      }
    }
  } catch (err) {
    console.error("Error fetching blog:", err);
    error = true;
  }

  // Show custom error message if blog not found
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] font-sans">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors group mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to All Stories
            </Link>

            <div className="text-center py-20">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-[var(--color-secondary)] rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[var(--color-muted-foreground)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
                Blog Post Not Found
              </h1>
              <p className="text-lg text-[var(--color-muted-foreground)] mb-8 max-w-md mx-auto">
                Sorry, we couldn't find the blog post you're looking for. It may
                have been moved or doesn't exist.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
              >
                Browse All Articles
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans">
      <Header />

      <main className="pt-24 pb-16">
        {/* Back Link */}
        <div className="container mx-auto px-6 max-w-4xl mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Stories
          </Link>
        </div>

        <article className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="mb-12 text-center space-y-6">
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {blog.categories.slice(0, 3).map((category, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-secondary)]/50 text-[var(--color-charcoal)] border border-[var(--color-secondary)]"
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-[var(--color-charcoal)] leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center justify-center space-x-6 text-sm text-[var(--color-muted-foreground)]">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={blog.date}>{formatDate(blog.date)}</time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-xl mb-12 group">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </div>
          )}

          {/* Content */}
          <div className="mx-auto">
            <BlogContent content={blog.content} />
          </div>

          {/* Share / Tags Footer */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
            <div className="text-sm font-medium text-[var(--color-muted-foreground)]">
              {blog.tags && blog.tags.length > 0 && (
                <>
                  Tags:{" "}
                  <span className="text-[var(--color-charcoal)]">
                    {blog.tags.join(", ")}
                  </span>
                </>
              )}
            </div>
            <button className="flex items-center space-x-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-charcoal)] transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
