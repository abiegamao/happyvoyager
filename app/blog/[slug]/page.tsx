import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
import AuthorAboutSection from "@/components/AuthorAboutSection";
import CommentSection from "@/components/CommentSection";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, Share2 } from "lucide-react";
import { getSupabaseBlogBySlug, SupabaseBlogDetail } from "@/lib/supabase-blogs";

// Next.js 13+ params handling
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Normalize static + Supabase blog into a single shape for rendering
interface NormalizedBlog {
  title: string;
  featuredImage?: string;
  categories: string[];
  author: string;
  createdAt: string;
  content: string;
  tags: string[];
  supabaseId?: string; // Present only for Supabase-backed posts
}



function normalizeSupabase(blog: SupabaseBlogDetail): NormalizedBlog {
  return {
    title: blog.title,
    featuredImage: blog.cover_image_url || undefined,
    categories: blog.category ? [blog.category] : [],
    author: "Happy Voyager",
    createdAt: blog.created_at,
    content: blog.content ?? "",
    tags: blog.tags ?? [],
    supabaseId: blog.id,
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch from Supabase
  const supabaseBlog = await getSupabaseBlogBySlug(slug);
  const blog: NormalizedBlog | null = supabaseBlog ? normalizeSupabase(supabaseBlog) : null;

  // Show custom error message if blog not found in either source
  if (!blog) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] font-sans">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
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
                Sorry, we couldn&apos;t find the blog post you&apos;re looking for. It may
                have been moved or doesn&apos;t exist.
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

      <main className="pt-50 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            {/* Main Content */}
            {/* Main Content Column */}
            <div className="min-w-0 space-y-12">
              <article>
                {/* Header */}
                <header className="mb-12 space-y-6">
                  {blog.categories.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
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

                  <div className="flex items-center space-x-6 text-sm text-[var(--color-muted-foreground)]">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
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
                    {blog.tags.length > 0 && (
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

              {/* Comment Section — only for Supabase-backed posts */}
              {blog.supabaseId && (
                <CommentSection blogId={blog.supabaseId} />
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <AuthorAboutSection />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
