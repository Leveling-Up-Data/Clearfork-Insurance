/**
 * Minimal RSS 2.0 + common iTunes podcast tags (no external XML dependency).
 * Covers standard feeds (e.g. RSS.com) used by the podcast page.
 */

export type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string | { value?: string };
  enclosure?: { url?: string };
  itunes?: {
    image?: string | { $?: { href?: string } };
    episode?: string | number;
  };
};

export type ParsedRssFeed = {
  title?: string;
  itunes?: { image?: string | { $?: { href?: string } } };
  items?: RssItem[];
};

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) =>
      String.fromCodePoint(Number.parseInt(d, 10)),
    );
}

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

/** First match of <tag>...</tag> or <prefix:tag>...</prefix:tag> inside `block`. */
function firstTaggedBlock(block: string, localName: string): string | undefined {
  const escaped = localName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<(?:[a-zA-Z_][\\w.-]*:)?${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[a-zA-Z_][\\w.-]*:)?${escaped}>`,
    "i",
  );
  const m = block.match(re);
  if (!m) return undefined;
  return decodeXmlEntities(stripCdata(m[1]).trim());
}

function attrHref(xml: string, tag: string): string | undefined {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<(?:[a-zA-Z_][\\w.-]*:)?${escaped}[^>]*href\\s*=\\s*["']([^"']+)["'][^>]*\\/?>`,
    "i",
  );
  const m = xml.match(re);
  return m ? decodeXmlEntities(m[1].trim()) : undefined;
}

function enclosureUrl(itemXml: string): string | undefined {
  const m = itemXml.match(
    /<enclosure([^>]*)\/?>/i,
  );
  if (!m) return undefined;
  const tag = m[1];
  const urlM = tag.match(/\burl\s*=\s*["']([^"']+)["']/i);
  return urlM ? decodeXmlEntities(urlM[1].trim()) : undefined;
}

function parseGuid(itemXml: string): string | { value?: string } | undefined {
  const inner = firstTaggedBlock(itemXml, "guid");
  if (inner === undefined) return undefined;
  return { value: inner };
}

function parseItem(itemXml: string): RssItem {
  const title = firstTaggedBlock(itemXml, "title");
  const link = firstTaggedBlock(itemXml, "link");
  const pubDate = firstTaggedBlock(itemXml, "pubDate");
  const description = firstTaggedBlock(itemXml, "description");
  const content =
    firstTaggedBlock(itemXml, "encoded") ?? description ?? undefined;
  const episodeRaw = firstTaggedBlock(itemXml, "episode");
  const itunesImageHref = attrHref(itemXml, "image");

  const itunes: RssItem["itunes"] = {};
  if (episodeRaw !== undefined && episodeRaw !== "")
    itunes.episode = /^\d+$/.test(episodeRaw)
      ? Number.parseInt(episodeRaw, 10)
      : episodeRaw;
  if (itunesImageHref) itunes.image = { $: { href: itunesImageHref } };

  const encUrl = enclosureUrl(itemXml);
  const guid = parseGuid(itemXml);

  return {
    title,
    link,
    pubDate,
    content: content ?? description,
    contentSnippet: undefined,
    guid,
    enclosure: encUrl ? { url: encUrl } : undefined,
    itunes: Object.keys(itunes).length ? itunes : undefined,
  };
}

function splitItemBlocks(channelXml: string): string[] {
  const blocks: string[] = [];
  const lower = channelXml.toLowerCase();
  let pos = 0;
  for (;;) {
    const open = lower.indexOf("<item", pos);
    if (open === -1) break;
    const gt = channelXml.indexOf(">", open);
    if (gt === -1) break;
    const close = lower.indexOf("</item>", gt);
    if (close === -1) break;
    blocks.push(channelXml.slice(open, close + "</item>".length));
    pos = close + "</item>".length;
  }
  return blocks;
}

/** Extract first <channel>...</channel> inner XML (best effort). */
function channelInner(xml: string): string {
  const m = xml.match(/<channel[^>]*>([\s\S]*?)<\/channel>/i);
  return m ? m[1] : xml;
}

export function parseRssXml(xml: string): ParsedRssFeed {
  const channel = channelInner(xml);
  const channelTitle = firstTaggedBlock(channel, "title");
  const channelItunesImage = attrHref(channel, "image");
  const itunes = channelItunesImage
    ? { image: { $: { href: channelItunesImage } } as const }
    : undefined;

  const itemBlocks = splitItemBlocks(channel);
  const items = itemBlocks.map(parseItem);

  return {
    title: channelTitle,
    itunes,
    items,
  };
}

export async function parseRssFeedFromUrl(feedUrl: string): Promise<ParsedRssFeed> {
  const res = await fetch(feedUrl, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml, */*",
      "User-Agent": "ClearforkInsurance/1.0 (+https://clearforkinsurance.com)",
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  return parseRssXml(xml);
}
