// @ts-check
import node from "@astrojs/node";
import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";

const isVpsTarget = process.env.PUBLIC_TARGET === "vps";

/** @type {import("vite").Plugin} */
const optimizeSvgAssets = {
  name: "optimize-svg-assets",
  apply: "build",
  async generateBundle(_options, bundle) {
    const svgOptimizer = svgoOptimizer();
    for (const asset of Object.values(bundle)) {
      if (asset.type !== "asset" || !asset.fileName.endsWith(".svg")) {
        continue;
      }
      const source =
        typeof asset.source === "string"
          ? asset.source
          : new TextDecoder().decode(asset.source);

      asset.source = await svgOptimizer.optimize(source, asset.fileName);
    }
  },
};

const SSR_ROUTES = ["/links.astro"];

/** @type {import("astro").AstroIntegration} */
const ssrRouting = {
  name: "ssr-routing",
  hooks: {
    "astro:route:setup": ({ route }) => {
      const isSsrRoute = SSR_ROUTES.some((ssrRoute) =>
        route.component.endsWith(`src/pages${ssrRoute}`),
      );

      // ssr is only valid on the VPS and never in neocities
      if (isSsrRoute) {
        route.prerender = !isVpsTarget;
      }
    },
  },
};

export default defineConfig({
  ...(isVpsTarget ? { adapter: node({ mode: "standalone" }) } : {}),
  integrations: [ssrRouting],
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
    plugins: [optimizeSvgAssets], // optimizes un-inlined svg assets
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
