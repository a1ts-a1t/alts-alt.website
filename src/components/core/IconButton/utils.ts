import { getById, getBySelector } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonAppearance = "bordered" | "ghosted";

export type IconButtonProps = {
  "aria-label": string;
  src: string;
  id?: string;
  color?: ColorToken;
  size?: IconButtonSize;
  appearance?: IconButtonAppearance;
};

export const updateIconButton = (
  id: string,
  { "aria-label": ariaLabel, src, color }: Partial<IconButtonProps>,
): void => {
  const button = getById(id);
  const span = getBySelector(button, "span");

  if (src !== undefined) {
    span.style.setProperty("--bg-image", `url(${src})`);
  }

  if (color !== undefined) {
    button.style.setProperty("--icon-color", `var(--color-${color})`);
  }

  if (ariaLabel !== undefined) {
    button.setAttribute("aria-label", ariaLabel);
  }
};
