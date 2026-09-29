import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getBlogPosts } from "~/components/pages/blog";

export const GET: APIRoute = ({ site }) =>
  rss({
    title: "alts_alt_",
    description: "some stuff i've written in my free time!!",
    site: site ?? "https://alts-alt.online",
    items: getBlogPosts().map((blogPost) => ({
      title: blogPost.title,
      description: blogPost.description,
      pubDate: blogPost.datePublished,
      link: blogPost.url,
    })),
  });
