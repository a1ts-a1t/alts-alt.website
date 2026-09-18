import {
  type IconSize,
  type IconSrc,
  updateIcon,
} from "~/components/core/Icon/utils";
import { getBySelector, type NodeIdentifier, resolveRootNode } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonAppearance = "bordered" | "ghosted";

const BUTTON_SIZES: readonly IconButtonSize[] = ["sm", "md", "lg"];
const BUTTON_APPEARANCES: readonly IconButtonAppearance[] = [
  "bordered",
  "ghosted",
];

export const ICON_SIZE: Record<
  IconButtonAppearance,
  Record<IconButtonSize, IconSize>
> = {
  bordered: { sm: "xs", md: "sm", lg: "sm" },
  ghosted: { sm: "md", md: "lg", lg: "xl" },
};

export type IconButtonProps = {
  "aria-label": string;
  src: IconSrc;
  id?: string;
  color?: ColorToken;
  size?: IconButtonSize;
  appearance?: IconButtonAppearance;
};

type UpdateIconButtonProps = Pick<
  IconButtonProps,
  "aria-label" | "color" | "size" | "appearance" | "src"
>;

const currentSize = (button: HTMLButtonElement): IconButtonSize =>
  BUTTON_SIZES.find((size) => button.classList.contains(`size-${size}`)) ??
  "sm";

const currentAppearance = (button: HTMLButtonElement): IconButtonAppearance =>
  BUTTON_APPEARANCES.find((appearance) =>
    button.classList.contains(`appearance-${appearance}`),
  ) ?? "ghosted";

export const updateIconButton = (
  rootIdentifier: NodeIdentifier<HTMLButtonElement>,
  {
    "aria-label": ariaLabel,
    color,
    size,
    appearance,
    src,
  }: Partial<UpdateIconButtonProps>,
): void => {
  const button = resolveRootNode(rootIdentifier);
  const icon = getBySelector(button, ".icon");

  if (color !== undefined) {
    button.style.setProperty("--Button-color", `var(--color-${color})`);
    updateIcon(icon, { color });
  }

  if (ariaLabel !== undefined) {
    button.setAttribute("aria-label", ariaLabel);
  }

  if (size !== undefined || appearance !== undefined) {
    const nextSize = size ?? currentSize(button);
    const nextAppearance = appearance ?? currentAppearance(button);

    button.classList.remove(
      ...BUTTON_SIZES.map((buttonSize) => `size-${buttonSize}`),
      ...BUTTON_APPEARANCES.map(
        (buttonAppearance) => `appearance-${buttonAppearance}`,
      ),
    );
    button.classList.add(`size-${nextSize}`, `appearance-${nextAppearance}`);
    updateIcon(icon, { size: ICON_SIZE[nextAppearance][nextSize] });
  }

  if (src !== undefined) {
    updateIcon(icon, { src });
  }
};
