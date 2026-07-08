import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mydeeptalk.com",
      lastModified: new Date(),
    },
    {
      url: "https://mydeeptalk.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://mydeeptalk.com/therapists",
      lastModified: new Date(),
    },
  ];
}