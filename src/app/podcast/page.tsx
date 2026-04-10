import { INSURANCE_PODCAST_SHOWCASES } from "@/data/insurance-podcasts";
import {
  fetchMergedPodcastEpisodes,
  getPodcastRssUrls,
  isPodcastRssConfigured,
  PODCAST_PAGE_EPISODE_LIMIT,
} from "@/lib/podcast-rss";
import { PodcastPageClient } from "./podcast-page-client";

/** Refresh RSS-backed episode list periodically (matches API route cache). */
export const revalidate = 3600;

export default async function PodcastPage() {
  if (!isPodcastRssConfigured()) {
    return <PodcastPageClient mode="static" items={INSURANCE_PODCAST_SHOWCASES} />;
  }

  const urls = getPodcastRssUrls();

  try {
    const data = await fetchMergedPodcastEpisodes(urls, PODCAST_PAGE_EPISODE_LIMIT);
    return <PodcastPageClient mode="rss" episodes={data.items} channelTitle={undefined} />;
  } catch {
    return <PodcastPageClient mode="rss" episodes={[]} channelTitle={undefined} />;
  }
}
