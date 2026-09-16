import type {
  IconButtonAppearance,
  IconButtonSize,
} from "~/components/core/IconButton/utils";
import { getById } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconLinkSize = IconButtonSize;
export type IconLinkAppearance = IconButtonAppearance;

export type IconLinkProps = {
  "aria-label": string;
  src: string;
  href: string;
  id?: string;
  rel?: string;
  target?: astroHTML.JSX.HTMLAttributeAnchorTarget;
  color?: ColorToken;
  size?: IconLinkSize;
  appearance?: IconLinkAppearance;
};

export const updateIconLink = (
  id: string,
  { "aria-label": ariaLabel, src, color, href }: Partial<IconLinkProps>,
): void => {
  const link = getById(id);

  if (src !== undefined) {
    link.style.setProperty("--bg-image", `url(${src})`);
  }

  if (color !== undefined) {
    link.style.setProperty("--icon-color", `var(--color-${color})`);
  }

  if (ariaLabel !== undefined) {
    link.setAttribute("aria-label", ariaLabel);
  }

  if (href !== undefined) {
    link.setAttribute("href", href);
  }
};
