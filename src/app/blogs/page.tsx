import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insurance tips, industry insights, and news from SIG Clearfork Insurance Group in Benbrook, TX.",
  alternates: { canonical: "https://clearforkinsurance.com/blogs" },
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <h1 className="mb-2 text-4xl font-bold text-[var(--navy)]">Blog</h1>
        <p className="mb-10 text-lg text-[var(--slate)]">
          Insurance tips, industry insights, and news from our team.
        </p>
        {posts.length === 0 ? (
          <p className="text-[var(--slate)]">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="block rounded-xl border border-[var(--mist)] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-3 text-xs text-[var(--slate)]">
                  <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-[var(--navy)]">{post.title}</h2>
                <p className="text-sm text-[var(--slate)]">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--green-primary)]/20 bg-[var(--green-light)] px-3 py-0.5 text-xs font-medium text-[var(--green-dark)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
