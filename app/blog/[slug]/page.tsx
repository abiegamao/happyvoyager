import { MOCK_BLOGS, MOCK_COMMENTS, Blog } from "@/lib/mock-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import BlogContent from "@/components/BlogContent";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

// Next.js 13+ params handling
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function SingleBlogPage({ params }: PageProps) {
    const { slug } = await params;
    const blog = MOCK_BLOGS.find((b) => b.slug === slug);

    if (!blog) {
        notFound();
    }

    const blogComments = MOCK_COMMENTS.filter((c) => c.blogId === blog._id);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

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
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-secondary)]/50 text-[var(--color-charcoal)] border border-[var(--color-secondary)]">
                            {blog.category}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-[var(--color-charcoal)] leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-center space-x-6 text-sm text-[var(--color-muted-foreground)]">
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{blog.authorName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
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

                    {/* Content */}
                    <div className="mx-auto">
                        <BlogContent content={blog.content} />
                    </div>

                    {/* Share / Tags Footer */}
                    <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
                        <div className="text-sm font-medium text-[var(--color-muted-foreground)]">
                            Tags: <span className="text-[var(--color-charcoal)]">{blog.category}, Travel, Lifestyle</span>
                        </div>
                        <button className="flex items-center space-x-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-charcoal)] transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>Share Article</span>
                        </button>
                    </div>
                </article>
            </main>

            {/* Comments Section */}
            <div className="bg-[var(--color-cream)]/50 border-t border-[var(--color-border)]">
                <div className="container mx-auto px-6">
                    <CommentSection initialComments={blogComments} slug={slug} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
