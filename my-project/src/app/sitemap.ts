import { MetadataRoute } from "next";

const BASE_URL = "https://cleaninstead.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: today, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/checklist`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/residential`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/deep-cleaning`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/move-in-out`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/post-construction`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: today, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/about`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: today, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/reviews`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tips`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/rewards`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/careers`, lastModified: today, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/welcome-home-note`, lastModified: today, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
  ];

  const locationPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/locations`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/surrey`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/vancouver`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/burnaby`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/richmond`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/langley`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/delta`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/white-rock`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/coquitlam`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/maple-ridge`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/locations/north-vancouver`, lastModified: today, changeFrequency: "monthly", priority: 0.85 },
  ];

  return [...staticPages, ...locationPages];
}
