import type { MarkdownInstance } from "astro";

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  datePublished: string;
}

export interface BlogPost {
  url: string;
  title: string;
  datePublished: Date;
  description: string;
}

/**
 * Returns all blog posts in chronilogical order
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
