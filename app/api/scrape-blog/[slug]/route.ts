import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const url = `https://blog.happyvoyager.com/${slug}/`;

    // Fetch the HTML from the blog post page
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog post: ${response.status} ${response.statusText}`,
      );
    }

    const html = await response.text();

    // Save HTML to file for inspection
    // const htmlFilePath = join(process.cwd(), `scraped-blog-${slug}.html`);
    // writeFileSync(htmlFilePath, html, "utf-8");
    // console.log("✅ Blog post HTML saved to:", htmlFilePath);

    const $ = cheerio.load(html);

    // Extract blog post data
    const title = $("h1.entry-title").first().text().trim();
    const featuredImage =
      $(".overlay-media img").first().attr("data-pk-src") ||
      $(".overlay-media img").first().attr("src") ||
      $(".entry-media img").first().attr("data-pk-src") ||
      $(".entry-media img").first().attr("src") ||
      $("meta[property='og:image']").attr("content") ||
      "";

    const date =
      $(".meta-date time").first().text().trim() ||
      $(".meta-date a").first().text().trim();

    const author =
      $(".meta-author .author a").first().text().trim() ||
      $(".author-name").first().text().trim() ||
      "The Happy Voyager";

    // Extract categories
    const categories: string[] = [];
    $(".meta-category a, .post-categories a").each((_, element) => {
      const category = $(element).text().trim();
      if (category) {
        categories.push(category);
      }
    });

    // Extract tags
    const tags: string[] = [];
    $(".post-tags a, .tagcloud a").each((_, element) => {
      const tag = $(element).text().trim();
      if (tag) {
        tags.push(tag);
      }
    });

    // Extract content
    const content = $(".entry-content").first().html() || "";

    // Extract excerpt/description
    const excerpt =
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='description']").attr("content") ||
      $(".entry-excerpt").first().text().trim() ||
      "";

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post not found or invalid slug",
        },
        { status: 404 },
      );
    }

    // console.log("\n📄 Blog Post Scraped:");
    // console.log("━".repeat(50));
    // console.log(`Title: ${title}`);
    // console.log(`Author: ${author}`);
    // console.log(`Date: ${date}`);
    // console.log(`Categories: ${categories.join(", ")}`);
    // console.log(`Tags: ${tags.join(", ")}`);
    // console.log("━".repeat(50));

    return NextResponse.json({
      success: true,
      blog: {
        slug,
        title,
        content,
        excerpt,
        featuredImage: featuredImage.startsWith("http")
          ? featuredImage
          : featuredImage && !featuredImage.startsWith("data:")
            ? `https://blog.happyvoyager.com${featuredImage}`
            : "",
        date,
        author,
        categories,
        tags,
        url,
      },
      scrapedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to scrape blog post",
      },
      { status: 500 },
    );
  }
}
