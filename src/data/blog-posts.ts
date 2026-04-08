import {
  BLACK_BOX_AUTO_INSURANCE_MARKDOWN,
  BLACK_BOX_TEXAS_PROPERTY_MARKDOWN,
  HOMEOWNERS_INSPECTION_GUIDE_MARKDOWN,
} from "@/data/blog-bodies";

const img = (path: string) => encodeURI(path);

export type BlogCategory =
  | "Home & Auto"
  | "Commercial"
  | "Life"
  | "Cyber"
  | "Performance";

export type BlogPostDetail = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  bodyFormat?: "plain" | "markdown";
  date: string;
  category: BlogCategory;
  author: string;
  imageSrc: string;
  quote?: string;
  inlineImageSrc?: string;
  bulletSections?: { title: string; items: string[] }[];
};

export function getPostSlugs(): string[] {
  return BLOG_POSTS_DETAIL.map((p) => p.slug);
}

export function getPostIndex(slug: string): number {
  return BLOG_POSTS_DETAIL.findIndex((p) => p.slug === slug);
}

export function getPrevNextSlugs(slug: string): { prev: string | null; next: string | null } {
  const i = getPostIndex(slug);
  if (i < 0) return { prev: null, next: null };
  const prev = i > 0 ? BLOG_POSTS_DETAIL[i - 1].slug : null;
  const next =
    i < BLOG_POSTS_DETAIL.length - 1 && i >= 0 ? BLOG_POSTS_DETAIL[i + 1].slug : null;
  return { prev, next };
}

export function getPopularPosts(excludeSlug: string, limit = 4): BlogPostDetail[] {
  return BLOG_POSTS_DETAIL.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export const BLOG_POSTS_DETAIL: BlogPostDetail[] = [
  {
    slug: "insurance-rates-are-a-black-box-texas-property",
    title: "Insurance Rates Are a Black Box: Understanding Texas Property Insurance Rates",
    excerpt:
      "You open your homeowners renewal and the premium has jumped again. The letter offers a vague explanation — \"adjustments reflecting current loss experience\" — and you are expected to accept it. What you are almost certainly not told is how that number was calculated, which tier you have been placed in, or what it will cost you to file a claim. In Texas, much of that information is shielded from public view.",
    body: BLACK_BOX_TEXAS_PROPERTY_MARKDOWN,
    bodyFormat: "markdown",
    date: "April 08, 2026",
    category: "Home & Auto",
    author: "David Hargrove",
    imageSrc: img("/images/group photo 3_1761008420820.jpg"),
    quote:
      "The rate pages are filed. The math is done. But the reasoning behind your premium is largely invisible to you.",
  },
  {
    slug: "homeowners-insurance-inspection-guide-texas",
    title: "So You Received an Inspection on Your New Homeowners Policy",
    excerpt:
      "Most homeowners assume that once they have insurance, the hard part is over. But a property inspection can upend your coverage, cancel your policy, or quietly raise your premiums — all without much warning. A guide for Texas homeowners — and anyone shopping for coverage.",
    body: HOMEOWNERS_INSPECTION_GUIDE_MARKDOWN,
    bodyFormat: "markdown",
    date: "April 08, 2026",
    category: "Home & Auto",
    author: "Sid Hargrove",
    imageSrc: img("/images/group photo 1 (1)_1761008519000.jpg"),
    quote:
      "Just because your old carrier accepted your home's condition doesn't mean your new one will. Inspection standards vary significantly between insurance companies.",
  },
  {
    slug: "insurance-rates-black-box-auto-insurance-edition",
    title: "Insurance Rates Are a Black Box 2.0: The Auto Insurance Edition",
    excerpt:
      "If you read the first installment of this series, you already know the core points: insurance pricing is built on layers of data, algorithms, and actuarial judgment that carriers are largely not required to explain to the people paying for them. This article focuses on what is unique to auto.",
    body: BLACK_BOX_AUTO_INSURANCE_MARKDOWN,
    bodyFormat: "markdown",
    date: "April 08, 2026",
    category: "Home & Auto",
    author: "David Hargrove",
    imageSrc: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
    quote:
      "You can shop ten carriers and get ten different premiums for the same driver, the same car, and the same coverage limits. Almost none of them will tell you why.",
  },
  {
    slug: "lorem-ipsum-dolor-sit-amet-consectetur-elit",
    title: "Lorem Ipsum Dolor Sit Amet Consectetur Elit",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempora.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. We will update this content later.",
    date: "January 08, 2026",
    category: "Performance",
    author: "Sid Hargrove",
    imageSrc: img("/images/group photo 1 (1)_1761008519000.jpg"),
  },
  {
    slug: "cyber-insurance-what-you-need-to-know",
    title: "Cyber Insurance: What You Need to Know",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempora.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. How cyber coverage helps businesses respond to incidents—breach response, ransomware, and business interruption. We will update this content later.",
    date: "January 08, 2026",
    category: "Cyber",
    author: "Sid Hargrove",
    imageSrc: img("/images/SCR-20250919-sqme_1758335513957-DJk4-g.jpeg"),
    inlineImageSrc: img("/images/group photo 1 (1)_1761008519000.jpg"),
    quote:
      "How cyber coverage helps businesses respond to incidents—breach response, ransomware, and business interruption.",
  },
  {
    slug: "performance-and-bid-bonds-explained",
    title: "Performance and Bid Bonds Explained",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempora.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We will update this content later.",
    date: "January 08, 2026",
    category: "Performance",
    author: "David Hargrove",
    imageSrc: img("/images/group photo 3_1761008420820.jpg"),
  },
  {
    slug: "commercial-property-and-liability-basics",
    title: "Commercial Property and Liability Basics",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempora.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We will update this content later.",
    date: "January 08, 2026",
    category: "Commercial",
    author: "Leslie Dolman",
    imageSrc: img("/images/group photo 1 (1)_1761008519000.jpg"),
  },
  {
    slug: "umbrella-coverage-for-your-family",
    title: "Umbrella Coverage for Your Family",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempora.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We will update this content later.",
    date: "January 08, 2026",
    category: "Home & Auto",
    author: "Kelli Bahner",
    imageSrc: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
  },
  {
    slug: "workers-compensation-and-your-business",
    title: "Workers Compensation and Your Business",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempora.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We will update this content later.",
    date: "January 08, 2026",
    category: "Commercial",
    author: "Sid Hargrove",
    imageSrc: img("/images/group photo 3_1761008420820.jpg"),
  },
];

export function getPostBySlug(slug: string): BlogPostDetail | undefined {
  return BLOG_POSTS_DETAIL.find((p) => p.slug === slug);
}
