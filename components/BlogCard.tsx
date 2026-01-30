"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Blog } from "@/lib/mock-data";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    const router = useRouter();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <article
            onClick={() => router.push(`/blog/${blog.slug}`)}
            className="cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[var(--color-border)]"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[var(--color-charcoal)] shadow-sm backdrop-blur-sm">
                    {blog.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 space-y-4">
                {/* Meta info */}
                <div className="flex items-center text-xs text-[var(--color-muted-foreground)] space-x-4">
                    <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{blog.authorName}</span>
                    </div>
                </div>

                {/* Title & Excerpt */}
                <div className="space-y-2 flex-1">
                    <Link href={`/blog/${blog.slug}`} className="block focus:outline-none">
                        <h3 className="text-xl font-bold text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                            {blog.title}
                        </h3>
                    </Link>
                    <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed line-clamp-3">
                        {blog.excerpt}
                    </p>
                </div>

                {/* Footer / CTA */}
                <div className="pt-4 mt-auto border-t border-[var(--color-border)]">
                    <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-charcoal)] transition-colors group/link"
                    >
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
