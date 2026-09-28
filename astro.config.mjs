// @ts-check

import { satteri } from "@astrojs/markdown-satteri";
import node from "@astrojs/node";
import everforestDark from "@shikijs/themes/everforest-dark";
import everforestLight from "@shikijs/themes/everforest-light";
import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import { defineHastPlugin } from "satteri";

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

const restyleFootnotes = defineHastPlugin({
  name: "restyle-footnotes",
  element: {
    filter: ["section"],
    visit(node, ctx) {
      if (node.properties?.dataFootnotes !== true) {
        return;
      }
      ctx.insertBefore(node, {
        type: "element",
        tagName: "hr",
        properties: { className: ["footnote-divider"] },
        children: [],
      });
      const label = node.children.find(
        (child) =>
          child.type === "element" &&
          child.tagName === "h2" &&
          child.properties?.id === "footnote-label",
      );
      if (label !== undefined) {
        ctx.replaceNode(label, {
          type: "element",
          tagName: "h2",
          properties: { id: "footnote-label" },
          children: [{ type: "text", value: "footnotes" }],
        });
      }
    },
  },
});

export default defineConfig({
  ...(isVpsTarget
    ? {
        adapter: node({ mode: "standalone" }),
        output: "server",
        site: "https://alts-alt.online",
      }
    : {
        output: "static",
        site: "https://alts-alt.neocities.org",
        build: { format: "file" },
      }),
  env: {
    schema: {
      PUBLIC_TARGET: envField.enum({
        context: "client",
        access: "public",
        values: ["neocities", "vps"],
        default: "vps",
      }),
      SERVER_ORIGIN: envField.string({
        context: "server",
        access: "secret",
        default: "https://alts-alt.online",
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
  markdown: {
    processor: satteri({ hastPlugins: [restyleFootnotes] }),
    shikiConfig: {
      themes: {
        light: {
          ...everforestLight,
          fg: "var(--color-muted)",
          bg: "var(--color-bg)",
        },
        dark: {
          ...everforestDark,
          fg: "var(--color-muted)",
          bg: "var(--color-bg)",
        },
      },
      defaultColor: false,
    },
  },
});
