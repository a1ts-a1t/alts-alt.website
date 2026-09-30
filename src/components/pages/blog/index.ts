import { getImage } from "astro:assets";
import type { AstroGlobal, MarkdownInstance } from "astro";
import type { BlogPosting, WithContext } from "schema-dts";
import { getCanonicalUrl, type OgImage } from "~/components/layout";
import { getImageMetadata } from "~/lib/image";

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  datePublished: string;
  coverImage?: string;
}

export interface BlogPost {
  url: string;
  title: string;
  datePublished: Date;
  description: string;
}

/**
 * Returns all blog posts in reverse chronological order
 * as they match /src/pages/blog/*.md
 */
export const getBlogPosts = () =>
  Object.values(
    import.meta.glob<MarkdownInstance<BlogPostFrontmatter>>(
      "/src/pages/blog/*.md",
      { eager: true },
    ),
  )
    .map(
      (post): BlogPost => ({
        url: post.url?.replace(/\.html$/, "") ?? "",
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        datePublished: new Date(post.frontmatter.datePublished),
      }),
    )
    .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime());

export const getCoverOgImage = async (
  frontmatter: BlogPostFrontmatter,
  Astro: AstroGlobal,
): Promise<OgImage | undefined> => {
  const { coverImage, title } = frontmatter;
  if (!coverImage) return undefined;

  const image = await getImage({
    src: getImageMetadata(coverImage),
    width: 1200,
    height: 630,
    fit: "cover",
    position: "centre",
    format: "png",
  });

  return {
    url: new URL(image.src, Astro.site).toString(),
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
    alt: title,
  };
};

export const asBlogPostingJsonLd = async (
  frontmatter: BlogPostFrontmatter,
  Astro: AstroGlobal,
): Promise<WithContext<BlogPosting>> => {
  const { title, description, datePublished, coverImage } = frontmatter;
  const url = getCanonicalUrl(Astro).toString();
  const metadata = coverImage ? getImageMetadata(coverImage) : undefined;
  const { src } = metadata ? await getImage({ src: metadata }) : {};
  const coverImageUrl = src ? new URL(src, Astro.site) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    url,
    headline: title,
    description,
    datePublished: new Date(datePublished).toISOString(),
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "alts_alt_",
      url: "https://alts-alt.online",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(coverImageUrl ? { image: coverImageUrl.toString() } : {}),
  };
};
