import {
  getById,
  getBySelector,
  killEvent,
  watchPopupPlacement,
} from "~/lib/dom";

export interface MenuItemProps {
  label: string;
  iconSrc?: string;
  id: string;
}

export interface MenuConfig {
  triggerId: string;
  menuId: string;
  onOpenChange?: (state: "open" | "close") => void;
}

export class Menu {
  private triggerNode: HTMLElement;
  private menuNode: HTMLElement;
  private menuItemNodes: HTMLElement[] = [];
  private activeIndex: number | null = null;
  private onOpenChange?: (state: "open" | "close") => void;
  private unwatchPlacement: (() => void) | undefined;

  constructor({ triggerId, menuId, onOpenChange }: MenuConfig) {
    const triggerNode = getById(triggerId);
    const menuNode = getById(menuId);

    this.triggerNode = triggerNode;
    this.menuNode = menuNode;
    this.onOpenChange = onOpenChange;

    for (const menuItem of menuNode.querySelectorAll<HTMLElement>(
      '[role="menuitem"]',
    )) {
      this.menuItemNodes.push(menuItem);
      menuItem.setAttribute("tabindex", "-1");
    }

    if (this.menuItemCount() === 0) {
      return;
    }

    // assign relevant aria labels
    this.triggerNode.setAttribute("aria-haspopup", "true");
    this.triggerNode.setAttribute("aria-controls", menuId);
    this.triggerNode.setAttribute("aria-expanded", "false");

    this.menuNode.setAttribute("aria-labelledby", triggerId);
    this.menuNode.setAttribute("tabindex", "-1");

    this.menuNode.style.display = "none";

    // trigger event handlers
    this.triggerNode.addEventListener("click", (e) => {
      killEvent(e);

      if (this.isOpen()) {
        this.close();
        return;
      }

      this.open();
    });

    this.triggerNode.addEventListener("keydown", (e) => {
      const { key } = e;

      switch (key) {
        case " ":
        case "Enter":
        case "ArrowDown":
        case "Down":
          this.open();
          this.focusMenuItem(0);
          killEvent(e);
          break;

        case "Esc":
        case "Escape":
          this.close();
          killEvent(e);
          break;

        case "Up":
        case "ArrowUp":
          this.open();
          this.focusMenuItem(this.menuItemCount() - 1);
          killEvent(e);
          break;

        default:
          break;
      }
    });

    // menu event handlers
    this.menuNode.addEventListener("keydown", (e) => {
      const { key, ctrlKey, altKey, metaKey, shiftKey } = e;
      // we're not doing typeahead

      if (ctrlKey || altKey || metaKey) {
        return;
      }

      if (shiftKey && key === "Tab") {
        this.close();
        killEvent(e);
        return;
      }

      switch (key) {
        case " ":
        case "Enter":
          this.close();
          this.activeMenuItemNode()?.dispatchEvent(
            new MouseEvent("click", {
              bubbles: false,
              cancelable: true,
            }),
          );
          killEvent(e);
          break;

        case "Esc":
        case "Escape":
          this.close();
          killEvent(e);
          break;

        case "Up":
        case "ArrowUp": {
          const prevIndex =
            this.activeIndex === null
              ? 0
              : (this.activeIndex + this.menuItemCount() - 1) %
                this.menuItemCount();
          this.focusMenuItem(prevIndex);
          killEvent(e);
          break;
        }

        case "ArrowDown":
        case "Down": {
          const nextIndex =
            this.activeIndex === null
              ? 0
              : (this.activeIndex + 1) % this.menuItemCount();
          this.focusMenuItem(nextIndex);
          killEvent(e);
          break;
        }

        case "Home":
        case "PageUp":
          this.focusMenuItem(0);
          killEvent(e);
          break;

        case "End":
        case "PageDown":
          this.focusMenuItem(this.menuItemCount() - 1);
          killEvent(e);
          break;

        case "Tab":
          this.close();
          break;

        default:
          break;
      }
    });

    // menu item event listeners
    // menu items are responsible for their own click event handlers
    for (const menuItemNode of this.menuItemNodes) {
      menuItemNode.addEventListener("focusin", () =>
        menuItemNode.classList.add("focus"),
      );

      menuItemNode.addEventListener("focusout", () =>
        menuItemNode.classList.remove("focus"),
      );

      menuItemNode.addEventListener("click", () => this.close());
    }

    // window event handler, for outside click
    window.addEventListener(
      "mousedown",
      (e) => {
        const inMenuNode = this.menuNode.contains(e.target as Node);
        const inTriggerNode = this.triggerNode.contains(e.target as Node);
        if (!inMenuNode && !inTriggerNode) {
          this.close();
        }
      },
      true,
    );
  }

  private open() {
    if (this.isOpen()) {
      return;
    }

    this.menuNode.style.display = "block";
    this.unwatchPlacement = watchPopupPlacement({
      referenceNode: this.triggerNode,
      popupNode: this.menuNode,
    });
    this.triggerNode.setAttribute("aria-expanded", "true");
    this.menuNode.focus();
    this.focusMenuItem(0);
    this.onOpenChange?.("open");
  }

  private close() {
    if (!this.isOpen()) {
      return;
    }

    this.unwatchPlacement?.();

    this.triggerNode.setAttribute("aria-expanded", "false");
    this.menuNode.setAttribute("aria-activedescendant", "");

    for (const menuItem of this.menuItemNodes) {
      menuItem.classList.remove("focus");
    }

    this.menuNode.style.display = "none";
    this.triggerNode.focus();
    this.onOpenChange?.("close");
  }

  public isOpen() {
    return this.triggerNode.getAttribute("aria-expanded") === "true";
  }

  private focusMenuItem(focusIndex: number) {
    this.menuItemNodes.forEach((menuItem) => {
      menuItem.classList.remove("focus");
    });

    this.activeIndex = focusIndex;
    const focusedMenuItem = this.menuItemNodes.at(focusIndex);
    this.menuNode.setAttribute(
      "aria-activedescendant",
      focusedMenuItem?.id ?? "",
    );
    focusedMenuItem?.classList.add("focus");
    focusedMenuItem?.scrollIntoView({ block: "nearest" });
  }

  private activeMenuItemNode() {
    if (this.activeIndex == null) {
      return null;
    }

    if (this.activeIndex < 0 || this.activeIndex >= this.menuItemCount()) {
      return null;
    }

    return this.menuItemNodes[this.activeIndex];
  }

  private menuItemCount() {
    return this.menuItemNodes.length;
  }
}

export const createMenu = (menuConfig: MenuConfig) => {
  return new Menu(menuConfig);
};

export const updateMenuItem = (
  id: string,
  { iconSrc, label }: Partial<MenuItemProps>,
): void => {
  const menuItem = getById(id);
  const labelNode = getBySelector(menuItem, ".label");
  const iconNode = getBySelector(menuItem, ".icon");

  if (iconSrc !== undefined) {
    iconNode.style.setProperty("--bg-image", `url(${iconSrc})`);
  }

  if (label !== undefined) {
    labelNode.innerText = label;
  }
};
