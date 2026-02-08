import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const url = "https://blog.happyvoyager.com/";

    // Fetch the HTML from the blog page
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }

    const html = await response.text();

    // Save HTML to file for inspection
    // const htmlFilePath = join(process.cwd(), "scraped-blog.html");
    // writeFileSync(htmlFilePath, html, "utf-8");
    // console.log("✅ HTML saved to:", htmlFilePath);

    const $ = cheerio.load(html);

    // Extract blog data from different sections
    const featuredBlogs: Array<{
      title: string;
      excerpt: string;
      link: string;
      image: string;
      date: string;
      author: string;
    }> = [];

    const trendingBlogs: Array<{
      title: string;
      excerpt: string;
      link: string;
      image: string;
      date: string;
      author: string;
    }> = [];

    // Track featured URLs to avoid duplicates
    const featuredUrls = new Set<string>();

    // Scrape Featured Slider Section
    $(".cs-block-slider-featured article").each((index, element) => {
      const $article = $(element);

      const title = $article.find("h2.entry-title a").first().text().trim();
      const excerpt = $article.find(".post-excerpt").first().text().trim();
      const link = $article.find("h2.entry-title a").first().attr("href") || "";
      const image =
        $article.find("img").first().attr("data-pk-src") ||
        $article.find("img").first().attr("src") ||
        "";
      const date = $article.find(".meta-date a").first().text().trim();
      const author = "The Happy Voyager";

      if (title && excerpt) {
        const fullLink = link.startsWith("http")
          ? link
          : `https://blog.happyvoyager.com${link}`;

        featuredBlogs.push({
          title,
          excerpt,
          link: fullLink,
          image: image.startsWith("http")
            ? image
            : image && !image.startsWith("data:")
              ? `https://blog.happyvoyager.com${image}`
              : "",
          date,
          author,
        });
        featuredUrls.add(fullLink);
      }
    });

    // Scrape List Section (Main content area)
    $(".cs-block-archive-posts .post-list").each((index, element) => {
      const $article = $(element);

      const title = $article.find("h2.entry-title a").first().text().trim();
      const excerpt = $article.find(".post-excerpt").first().text().trim();
      const link = $article.find("h2.entry-title a").first().attr("href") || "";
      const image =
        $article.find("img").first().attr("data-pk-src") ||
        $article.find("img").first().attr("src") ||
        "";
      const date = $article.find(".meta-date a").first().text().trim();
      const author =
        $article.find(".meta-author a").first().text().trim() ||
        "The Happy Voyager";

      if (title && excerpt) {
        const fullLink = link.startsWith("http")
          ? link
          : `https://blog.happyvoyager.com${link}`;

        featuredBlogs.push({
          title,
          excerpt,
          link: fullLink,
          image: image.startsWith("http")
            ? image
            : image && !image.startsWith("data:")
              ? `https://blog.happyvoyager.com${image}`
              : "",
          date,
          author,
        });
        featuredUrls.add(fullLink);
      }
    });

    // Scrape Trending Sidebar Section (only items not in featured)
    $(".cnvs-block-posts-sidebar-numbered article").each((index, element) => {
      const $article = $(element);

      const title = $article.find("h2.entry-title a").first().text().trim();
      const excerpt = $article.find(".post-excerpt").first().text().trim();
      const link = $article.find("h2.entry-title a").first().attr("href") || "";
      const fullLink = link.startsWith("http")
        ? link
        : `https://blog.happyvoyager.com${link}`;

      // Only add if not already in featured
      if (title && !featuredUrls.has(fullLink)) {
        const image =
          $article.find("img").first().attr("data-pk-src") ||
          $article.find("img").first().attr("src") ||
          "";
        const date = $article.find(".meta-date a").first().text().trim();
        const author =
          $article.find(".meta-author a").first().text().trim() ||
          "The Happy Voyager";

        trendingBlogs.push({
          title,
          excerpt,
          link: fullLink,
          image: image.startsWith("http")
            ? image
            : image && !image.startsWith("data:")
              ? `https://blog.happyvoyager.com${image}`
              : "",
          date,
          author,
        });
      }
    });

    // console.log("\n📊 Scraping Results:");
    // console.log("━".repeat(50));
    // console.log(`Featured blogs: ${featuredBlogs.length}`);
    // console.log(`Trending blogs: ${trendingBlogs.length}`);
    // console.log("━".repeat(50));

      // if (featuredBlogs.length > 0) {
      //   console.log("\n🌟 FEATURED BLOGS:");
      //   featuredBlogs.forEach((blog, index) => {
      //     console.log(`\n${index + 1}. ${blog.title || "No title"}`);
      //     console.log(`   Link: ${blog.link}`);
      //     console.log(`   Date: ${blog.date || "N/A"}`);
      //     console.log(`   Author: ${blog.author || "N/A"}`);
      //     console.log(
      //       `   Excerpt: ${blog.excerpt ? blog.excerpt.substring(0, 100) + "..." : "N/A"}`,
      //     );
      //   });
      // }

    // if (trendingBlogs.length > 0) {
    //   console.log("\n🔥 TRENDING BLOGS:");
    //   trendingBlogs.forEach((blog, index) => {
    //     console.log(`\n${index + 1}. ${blog.title || "No title"}`);
    //     console.log(`   Link: ${blog.link}`);
    //   });
    // }

    // if (featuredBlogs.length === 0 && trendingBlogs.length === 0) {
    //   console.log(
    //     "\n⚠️ No blogs found. Check the HTML structure in scraped-blog.html",
    //   );
    // }
    // console.log("\n" + "━".repeat(50));

    return NextResponse.json({
      success: true,
      featured: {
        count: featuredBlogs.length,
        blogs: featuredBlogs,
      },
      trending: {
        count: trendingBlogs.length,
        blogs: trendingBlogs,
      },
      scrapedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to scrape blog",
      },
      { status: 500 },
    );
  }
}
