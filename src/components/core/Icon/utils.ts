import type { ImageMetadata } from "astro";
import type { SvgComponent } from "astro/types";
import { type NodeIdentifier, resolveRootNode } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type IconSrc = string | (SvgComponent & ImageMetadata);

export interface IconProps {
  color?: ColorToken;
  id?: string;
  class?: string;
  style?: Record<string, string>;
  size?: IconSize;
  src: IconSrc;
}

export const toSrcUrl = (src: IconSrc): string =>
  typeof src === "string" ? src : src.src;

const COLOR_CLASSES: Record<ColorToken, string> = {
  bg: "color-bg",
  text: "color-text",
  primary: "color-primary",
  secondary: "color-secondary",
  enabled: "color-enabled",
  muted: "color-muted",
};

const SIZE_CLASSES: Record<IconSize, string> = {
  xs: "size-xs",
  sm: "size-sm",
  md: "size-md",
  lg: "size-lg",
  xl: "size-xl",
};

export type UpdateIconProps = Pick<IconProps, "color" | "size" | "src">;

export const updateIcon = (
  rootIdentifier: NodeIdentifier,
  { color, size, src }: Partial<UpdateIconProps>,
): void => {
  const icon = resolveRootNode(rootIdentifier);

  if (color !== undefined) {
    icon.classList.remove(...Object.values(COLOR_CLASSES));
    icon.classList.add(COLOR_CLASSES[color]);
  }

  if (size !== undefined) {
    icon.classList.remove(...Object.values(SIZE_CLASSES));
    icon.classList.add(SIZE_CLASSES[size]);
  }

  if (src !== undefined) {
    icon.style.setProperty("--Icon-src", `url(${toSrcUrl(src)})`);
  }
};
