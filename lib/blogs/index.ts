// Blog data aggregator - imports all blog posts
import { PublicBlog } from "@/api/blogs.api";
import { StaticBlogDetail, STATIC_BLOGS as southKoreaBlogs } from "./south-korea-travel-guide-diy-itinerary-for-5-days";
import { takeawaysFrom5AmClub } from "./takeaways-from-5-am-club-by-robin-sharma";
import { youAreEnough } from "./you-are-enough";
import { annualReview2020 } from "./annual-review-2020-reflection-and-review";
import { winningWithPeople } from "./winning-with-people-the-confrontation-principle-john-maxwell";
import { thinkAndTradeLikeAChampion } from "./think-and-trade-like-a-champion-by-mark-minervini-takeaway";

// Aggregate all blogs
const ALL_BLOGS: StaticBlogDetail[] = [
    ...southKoreaBlogs,
    takeawaysFrom5AmClub,
    youAreEnough,
    annualReview2020,
    winningWithPeople,
    thinkAndTradeLikeAChampion,
];

// Helper function to get all blogs
export const getAllBlogs = (): PublicBlog[] => {
    return ALL_BLOGS.map(({ content, author, categories, tags, ...blog }) => blog);
};

// Helper function to get blog by slug
export const getBlogBySlug = (slug: string): StaticBlogDetail | undefined => {
    return ALL_BLOGS.find((blog) => blog.slug === slug);
};

// Export type for use in other files
export type { StaticBlogDetail };
