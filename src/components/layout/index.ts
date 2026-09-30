import type { AstroGlobal } from "astro";

export const getCanonicalUrl = (Astro: AstroGlobal) => {
  const canonicalPathName = Astro.url.pathname
    .replace(/\.html$/, "") // remove trailing .html
    .replace(/\/$/, ""); // remove trailing slash

  return new URL(canonicalPathName, Astro.site);
};
