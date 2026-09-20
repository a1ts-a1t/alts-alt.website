import { type IconSrc, updateIcon } from "~/components/core/Icon/utils";
import type {
  IconButtonAppearance,
  IconButtonSize,
} from "~/components/core/IconButton/utils";
import { getBySelector, type NodeIdentifier, resolveRootNode } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconLinkSize = IconButtonSize;
export type IconLinkAppearance = IconButtonAppearance;

export type IconLinkProps = {
  "aria-label": string;
  src: IconSrc;
  href: string;
  id?: string;
  rel?: string;
  target?: astroHTML.JSX.HTMLAttributeAnchorTarget;
  color?: ColorToken;
  size?: IconLinkSize;
  appearance?: IconLinkAppearance;
};

type UpdateIconLinkProps = Pick<
  IconLinkProps,
  "aria-label" | "color" | "href" | "src"
>;

export const updateIconLink = (
  rootIdentifier: NodeIdentifier<HTMLAnchorElement>,
  { "aria-label": ariaLabel, src, color, href }: Partial<UpdateIconLinkProps>,
): void => {
  const link = resolveRootNode(rootIdentifier);
  const icon = getBySelector(link, ".icon");

  if (src !== undefined) {
    updateIcon(icon, { src });
  }

  if (color !== undefined) {
    link.style.setProperty("--Link-color", `var(--color-${color})`);
    updateIcon(icon, { color });
  }

  if (ariaLabel !== undefined) {
    link.setAttribute("aria-label", ariaLabel);
  }

  if (href !== undefined) {
    link.setAttribute("href", href);
  }
};
