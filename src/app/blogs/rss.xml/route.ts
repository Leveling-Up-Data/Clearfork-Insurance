import RSS from "rss";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://clearforkinsurance.com";

export async function GET() {
  const feed = new RSS({
    title: "SIG Clearfork Insurance Group Blog",
    description: "Insurance tips, industry insights, and news from SIG Clearfork Insurance Group.",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/blogs/rss.xml`,
    language: "en",
    pubDate: new Date(),
  });

  const posts = getAllPosts();
  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blogs/${post.slug}`,
      date: new Date(post.date),
      author: post.author,
      categories: post.tags,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
