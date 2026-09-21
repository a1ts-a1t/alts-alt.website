import { getBySelector } from "~/lib/dom";
import { buildLocalImageSrc } from "~/lib/env";

export interface CreatureState {
  id: string;
  radius: number;
  url: string;
  position: { x: number; y: number };
  sprite_path: `/${string}`;
  display_name: string;
}

export type KennelState = CreatureState[];

export type WidgetState = "loading" | "error" | "ready";

export const positionCreature = (
  creatureNode: HTMLAnchorElement,
  creatureState: CreatureState,
  containerNode: HTMLElement,
) => {
  const { clientWidth, clientHeight } = containerNode;
  const { radius, position, sprite_path: spritePath } = creatureState;
  const imageNode = getBySelector<HTMLImageElement>(creatureNode, "img");

  const domRadius = radius * Math.min(clientWidth, clientHeight);

  creatureNode.style.left = `${position.x * clientWidth - domRadius}px`;
  creatureNode.style.top = `${clientHeight - position.y * clientHeight - domRadius}px`;
  creatureNode.style.width = `${domRadius * 2}px`;
  creatureNode.style.height = `${domRadius * 2}px`;
  imageNode.src = buildLocalImageSrc(spritePath);
};

export const renderCreatureNode = (creatureState: CreatureState) => {
  const { url, display_name: displayName } = creatureState;

  const anchor = document.createElement("a");
  anchor.classList.add("creature");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.setAttribute("aria-label", `Link to ${displayName}`);

  const image = document.createElement("img");
  image.alt = `${displayName} sprite`;
  anchor.append(image);

  return anchor;
};
