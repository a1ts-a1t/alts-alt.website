import type { AstroGlobal } from "astro";

export interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export const getCanonicalUrl = (Astro: AstroGlobal) => {
  const canonicalPathName = Astro.url.pathname
    .replace(/\.html$/, "") // remove trailing .html
    .replace(/\/$/, ""); // remove trailing slash

  return new URL(canonicalPathName, Astro.site);
};
