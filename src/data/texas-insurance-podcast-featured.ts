const img = (path: string) => encodeURI(path);

/** Texas Department of Insurance — featured episode (Spotify for Creators + embed). */
export const TEXAS_INSURANCE_PODCAST_FEATURED = {
  title: "Everyone needs a fire escape plan",
  excerpt:
    "Every second counts during a fire and having a clear exit strategy saves lives—whether you’re at home, a hotel, or a business. Knowing how fast fires can spread and preparing before an emergency strikes are the best ways to protect yourself and your family.",
  image: img("/images/group photo 1 (1)_1761008519000.jpg"),
  authorName: "Texas Department of Insurance",
  authorSubtitle: "The Texas Insurance Podcast",
  episodePageUrl:
    "https://creators.spotify.com/pod/profile/texas-insurance-podcast/episodes/Everyone-needs-a-fire-escape-plan-e3hktf6",
  spotifyEmbedSrc:
    "https://open.spotify.com/embed/episode/66BikCNHFwegzhjUah2KOB?utm_source=generator",
} as const;
