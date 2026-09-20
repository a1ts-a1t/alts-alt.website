export const getById = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const ele = document.getElementById(id);
  if (ele === null) {
    throw new Error(`Found no element with id: ${id}`);
  }

  return ele as T;
};

export function getBySelector<T extends HTMLElement = HTMLElement>(
  selector: string,
): T;
export function getBySelector<T extends HTMLElement = HTMLElement>(
  parent: HTMLElement,
  selector: string,
): T;
export function getBySelector<T extends HTMLElement = HTMLElement>(
  parentOrSelector: HTMLElement | string,
  optionalSelector?: string,
): T {
  if (typeof parentOrSelector === "string") {
    const node = document.querySelector(parentOrSelector);

    if (node === null) {
      throw new Error(`No element found: ${parentOrSelector}`);
    }

    return node as T;
  }

  // shouldn't be allowed via TS
  if (optionalSelector === undefined) {
    throw new Error("Invalid getBySelector call");
  }

  const node = parentOrSelector.querySelector(optionalSelector);
  if (node === null) {
    throw new Error(
      `No element found with parent ${parentOrSelector.tagName}: ${optionalSelector}`,
    );
  }

  return node as T;
}

export type NodeIdentifier<T extends HTMLElement = HTMLElement> = T | string;

export function resolveRootNode<T extends HTMLElement = HTMLElement>(
  nodeIdentifier: NodeIdentifier<T>,
): T {
  if (typeof nodeIdentifier === "string") {
    return getById<T>(nodeIdentifier);
  }

  return nodeIdentifier;
}

export const killEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

const placePopup = (
  referenceNode: HTMLElement,
  popupNode: HTMLElement,
  gapPx: number,
): void => {
  const containingBlock = popupNode.offsetParent;

  if (containingBlock === null) {
    // the popup is not displayed, so there is nothing to position yet
    return;
  }

  const referenceRect = referenceNode.getBoundingClientRect();
  const popupHeight = popupNode.offsetHeight;
  const spaceBelow = window.innerHeight - referenceRect.bottom;
  const spaceAbove = referenceRect.top;
  const side =
    spaceBelow < popupHeight + gapPx && spaceAbove > spaceBelow
      ? "above"
      : "below";

  // absolute `top` resolves against the offsetParent's padding box, so
  // rebase the viewport-space target onto that box
  const containingBlockTop =
    containingBlock.getBoundingClientRect().top + containingBlock.clientTop;
  const popupTop =
    (side === "above"
      ? referenceRect.top - gapPx - popupHeight
      : referenceRect.bottom + gapPx) - containingBlockTop;

  popupNode.style.top = `${Math.round(popupTop)}px`;
  popupNode.dataset.popupSide = side;
};

/**
 * Given a popup element and a reference element the popup is anchored to,
 * register listeners that position the popup either above or below the trigger.
 * Positioning respects screen real-estate and will flip above or below based on
 * screen space.
 * @returns the callback removing the attached event listeners
 */
export const watchPopupPlacement = ({
  referenceNode,
  popupNode,
  gapPx = 8,
}: {
  referenceNode: HTMLElement;
  popupNode: HTMLElement;
  gapPx?: number;
}): (() => void) => {
  const updatePlacement = () => placePopup(referenceNode, popupNode, gapPx);

  updatePlacement();

  window.addEventListener("resize", updatePlacement);
  window.addEventListener("scroll", updatePlacement, {
    capture: true,
    passive: true,
  });

  let removed = false;
  return () => {
    if (removed) {
      return;
    }

    window.removeEventListener("resize", updatePlacement);
    window.removeEventListener("scroll", updatePlacement, {
      capture: true,
    });

    removed = true;
  };
};

export class HTMLStringBuilder {
  private readonly tag: string;
  private readonly attributes: Record<string, string> = {};
  private readonly innerHTML: string = "";

  private constructor(
    tag: string,
    attributes: Record<string, string>,
    innerHTML: string,
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.innerHTML = innerHTML;
  }

  public static fromTag(tag: string): HTMLStringBuilder {
    return new HTMLStringBuilder(tag, {}, "");
  }

  public withAttribute(name: string, value: string): HTMLStringBuilder {
    return new HTMLStringBuilder(
      this.tag,
      { ...this.attributes, [name]: value },
      this.innerHTML,
    );
  }

  public withInnerHtml(innerHTML: string): HTMLStringBuilder {
    return new HTMLStringBuilder(this.tag, this.attributes, innerHTML);
  }

  public asString(): string {
    const { attributes, tag, innerHTML } = this;
    const attributesString = Object.entries(attributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");
    return `<${tag} ${attributesString}>${innerHTML}</${tag}>`;
  }
}
