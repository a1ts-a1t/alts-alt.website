import { getById, getBySelector } from "~/lib/dom";

export type ImageObjectFit =
  | "fill"
  | "contain"
  | "cover"
  | "none"
  | "scale-down";

export type ImageObjectPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center";

export type ImageProps = {
  id?: string;
  src: string;
  alt: string;
  fallback: string;
  class?: string;
  objectFit?: ImageObjectFit;
  objectPosition?: ImageObjectPosition;
};

export const updateImage = (id: string, props: Partial<ImageProps>): void => {
  const coreImageNode = getById(id);
  const imageNode = getBySelector<HTMLImageElement>(coreImageNode, "img");

  if (props.src !== undefined) {
    coreImageNode.dataset.imageState = "pending";
    imageNode.src = props.src;
  }

  if (props.alt !== undefined) {
    imageNode.alt = props.alt;
  }

  if (props.fallback !== undefined) {
    const fallback = getBySelector(coreImageNode, ".fallback");
    fallback.textContent = props.fallback;
  }

  if (props.class !== undefined) {
    coreImageNode.className = ["image", props.class].filter(Boolean).join(" ");
  }

  if (props.objectFit !== undefined) {
    imageNode.style.setProperty("object-fit", props.objectFit);
  }

  if (props.objectPosition !== undefined) {
    imageNode.style.setProperty("object-position", props.objectPosition);
  }
};
