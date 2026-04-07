import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { blogPostSchema, breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        type: "article",
        title: post.title,
        description: post.description,
        publishedTime: post.date,
        authors: [post.author],
      },
      twitter: { card: "summary_large_image", title: post.title, description: post.description },
      alternates: { canonical: `https://clearforkinsurance.com/blogs/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const schemas = [
    blogPostSchema(post),
    breadcrumbSchema([
      { name: "Home", url: "https://clearforkinsurance.com/" },
      { name: "Blog", url: "https://clearforkinsurance.com/blogs" },
      { name: post.title, url: `https://clearforkinsurance.com/blogs/${slug}` },
    ]),
  ];

  return (
    <article className="py-16">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blogs" },
            { label: post.title },
          ]}
        />
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3 text-sm text-[var(--slate)]">
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-[var(--navy)]">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--slate)]">{post.description}</p>
        </header>
        <div className="prose max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
