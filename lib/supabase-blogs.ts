import { supabase } from "@/lib/supabase";
import { PublicBlog } from "@/api/blogs.api";

export interface SupabaseBlogDetail {
    id: string;
    title: string;
    slug: string | null;
    excerpt: string;
    content: string;
    cover_image_url: string;
    category: string;
    tags: string[];
    status: "draft" | "published";
    publish_date: string | null;
    created_at: string;
    views: number | null;
    author_id: string;
}

/**
 * Map a Supabase BlogPost row to the PublicBlog shape used by BlogCard.
 */
export function mapToPublicBlog(post: SupabaseBlogDetail): PublicBlog {
    return {
        _id: post.id,
        title: post.title,
        slug: post.slug ?? post.id, // Fall back to ID if slug is null
        featuredImage: post.cover_image_url || undefined,
        category: post.category || undefined,
        excerpt: post.excerpt || undefined,
        createdAt: post.created_at,
    };
}

/**
 * Fetch published blog posts from Supabase (paginated).
 */
export async function getSupabaseBlogs(
    page: number = 1,
    limit: number = 6
): Promise<{ blogs: PublicBlog[]; total: number }> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from("blog_posts")
        .select(
            "id, title, slug, excerpt, cover_image_url, category, created_at, status",
            { count: "exact" }
        )
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("Failed to fetch blogs from Supabase:", error.message);
        return { blogs: [], total: 0 };
    }

    return {
        blogs: (data as SupabaseBlogDetail[]).map(mapToPublicBlog),
        total: count ?? 0,
    };
}

/**
 * Fetch a single published blog post by slug from Supabase.
 * Returns null if not found or on error.
 */
export async function getSupabaseBlogBySlug(
    slug: string
): Promise<SupabaseBlogDetail | null> {
    // First try matching by slug
    const { data: bySlug, error: slugError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (!slugError && bySlug) return bySlug as SupabaseBlogDetail;

    // Fall back to ID lookup (when slug was null and we used ID as the URL param)
    const { data: byId, error: idError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", slug)
        .eq("status", "published")
        .single();

    if (!idError && byId) return byId as SupabaseBlogDetail;

    return null;
}
