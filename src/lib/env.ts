import { PUBLIC_TARGET } from "astro:env/client";

export const isStaticEnvironment = () => PUBLIC_TARGET === "neocities";

const PUBLIC_ORIGIN = "https://alts-alt.online";

// browser image requests must always hit the public endpoint
export const buildImageSrc = (path: `/${string}`): string =>
  new URL(path, PUBLIC_ORIGIN).toString();

// event stream requests will always come from the client, never web server
// so they will always be served via the public origin
export const buildEventsUrl = (path: `/${string}`): URL =>
  new URL(path, PUBLIC_ORIGIN);
