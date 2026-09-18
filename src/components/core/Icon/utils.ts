import type { ImageMetadata } from "astro";
import type { SvgComponent } from "astro/types";
import { type NodeIdentifier, resolveRootNode } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * An icon glyph source: either a URL, or an Astro SVG import (a component
 * bundled with its image metadata on the server, plain metadata on the
 * client) — anything the mask can point at.
 */
export type IconSrc = string | (SvgComponent & ImageMetadata);

export interface IconProps {
  color?: ColorToken;
  id?: string;
  class?: string;
  style?: Record<string, string>;
  size?: IconSize;
  src: IconSrc;
}

export const SIZE_TO_PIXELS: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export const toSrcUrl = (src: IconSrc): string =>
  typeof src === "string" ? src : src.src;

export type UpdateIconProps = Pick<
  IconProps,
  "color" | "class" | "style" | "size" | "src"
>;

export const updateIcon = (
  rootIdentifier: NodeIdentifier,
  { color, class: className, style, size, src }: Partial<UpdateIconProps>,
): void => {
  const icon = resolveRootNode(rootIdentifier);

  if (color !== undefined) {
    icon.style.setProperty("--Icon-color", `var(--color-${color})`);
  }

  if (className !== undefined) {
    icon.className = className;
  }

  if (style !== undefined) {
    for (const [property, value] of Object.entries(style)) {
      icon.style.setProperty(property, value);
    }
  }

  if (size !== undefined) {
    icon.style.setProperty("--Icon-size", `${SIZE_TO_PIXELS[size]}px`);
  }

  if (src !== undefined) {
    icon.style.setProperty("--Icon-src", `url(${toSrcUrl(src)})`);
  }
};
