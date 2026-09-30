import { getImage, type ImageMetadata } from "astro:assets";
import type { AstroGlobal, MarkdownInstance } from "astro";
import type { BlogPosting, WithContext } from "schema-dts";
import { getCanonicalUrl } from "~/components/layout";

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

const blogImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/blog/*",
  { eager: true },
);

const getCoverImageUrl = async (coverImage: string, Astro: AstroGlobal) => {
  const path = coverImage.replace(/^~\//, "/src/");
  const metadata = blogImages[path]?.default;
  if (!metadata) {
    throw new Error(`Blog image not found for path: ${coverImage}`);
  }

  const { src } = await getImage({ src: metadata });
  return new URL(src, Astro.site);
};

export const asBlogPostingJsonLd = async (
  frontmatter: BlogPostFrontmatter,
  Astro: AstroGlobal,
): Promise<WithContext<BlogPosting>> => {
  const { title, description, datePublished, coverImage } = frontmatter;
  const url = getCanonicalUrl(Astro).toString();
  const coverImageUrl = coverImage
    ? await getCoverImageUrl(coverImage, Astro)
    : undefined;

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
