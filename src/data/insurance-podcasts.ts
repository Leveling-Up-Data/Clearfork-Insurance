const img = (path: string) => encodeURI(path);

/** Curated insurance topics only. Replace `listenUrl` when your real show/episodes are live. */
export type InsurancePodcastShowcase = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  avatar: string;
  authorName: string;
  authorSubtitle: string;
  /** Spotify, Apple Podcasts, or any public listen link */
  listenUrl: string;
};

export const INSURANCE_PODCAST_SHOWCASES: InsurancePodcastShowcase[] = [
  {
    id: "rv",
    title: "RV Insurance: Protecting Your Adventures",
    excerpt:
      "Choosing coverage limits, full-timer options, and what to watch for with towing, storage, and roadside help.",
    image: img("/images/group photo 1 (1)_1761008519000.jpg"),
    avatar: img("/images/david hargrove head shot_1761004385331.jpg"),
    authorName: "David Hargrove",
    authorSubtitle: "Owner",
    listenUrl: "https://open.spotify.com/show/3yVcLzTuxVS2bXbc5dNDsG",
  },
  {
    id: "cyber",
    title: "Cyber Insurance: What You Need to Know",
    excerpt:
      "How cyber coverage helps businesses respond to incidents—breach response, ransomware, and business interruption.",
    image: img("/images/SCR-20250919-sqme_1758335513957.jpeg"),
    avatar: img("/images/sid hargrove headshot_1761004385331.jpg"),
    authorName: "Sid Hargrove",
    authorSubtitle: "Owner",
    listenUrl: "https://open.spotify.com/show/2VRS1IJCTn2Nlkg33S1KG2",
  },
];

/** Home content hub uses the same curated list (2 topics). */
export const INSURANCE_PODCASTS_HOME = INSURANCE_PODCAST_SHOWCASES;
