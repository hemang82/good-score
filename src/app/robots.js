export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://upscore.in";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/mobile-chat"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
