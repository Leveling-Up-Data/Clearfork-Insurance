import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE = "https://clearforkinsurance.com";

const STATIC_PAGES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/home-auto-insurance", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/commercial-insurance", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/life-insurance", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/bonds", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/cyber-insurance", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/our-story", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/get-a-quote", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/videos", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/podcast", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/blogs", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticEntries = STATIC_PAGES.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const blogEntries = posts.map((post) => ({
    url: `${BASE}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
