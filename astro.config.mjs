// @ts-check
import node from "@astrojs/node";
import { defineConfig, envField, fontProviders } from "astro/config";

const isVpsTarget = process.env.PUBLIC_TARGET === "vps";

export default defineConfig({
  ...(isVpsTarget ? { adapter: node({ mode: "standalone" }) } : {}),
  site: isVpsTarget
    ? "https://alts-alt.online"
    : "https://alts-alt.neocities.org",
  env: {
    schema: {
      PUBLIC_TARGET: envField.enum({
        context: "client",
        access: "public",
        values: ["neocities", "vps"],
        default: "vps",
      }),
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Ubuntu Mono",
      cssVariable: "--font-ubuntu-mono",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/UbuntuMono-Regular.ttf"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
  ],
  vite: {
    resolve: {
      extensions: [
        ".astro",
        ".mjs",
        ".js",
        ".mts",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
      ],
    },
  },
});
