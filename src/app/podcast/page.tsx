import { INSURANCE_PODCAST_SHOWCASES } from "@/data/insurance-podcasts";
import { PodcastPageClient } from "./podcast-page-client";

export default async function PodcastPage() {
  const firstPodcast = INSURANCE_PODCAST_SHOWCASES[0];

  return (
    <PodcastPageClient mode="hybrid" firstItem={firstPodcast} />
  );
}
