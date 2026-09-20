import { getById, killEvent, watchPopupPlacement } from "~/lib/dom";

export interface OptionProps {
  label: string;
  value: string;
  id: string;
}

export const getSelectIds = (rootId: string) => ({
  labelId: `${rootId}-label`,
  comboboxId: `${rootId}-combobox`,
  listboxId: `${rootId}-listbox`,
  placeholderId: `${rootId}-placeholder`,
});

export interface SelectConfig<T extends string = string> {
  id: string;
  onOpenChange?: (state: "open" | "close") => void;
  onSelectChange?: (value: T) => void;
  defaultSelected?: T;
}

enum SelectAction {
  Close,
  CloseSelect,
  First,
  Last,
  Next,
  Open,
  Previous,
}

class Select<T extends string = string> {
  private readonly rootNode: HTMLElement;
  private readonly labelNode: HTMLElement;
  private readonly comboboxNode: HTMLElement;
  private readonly listboxNode: HTMLElement;
  private readonly placeholderNode: HTMLElement;
  private readonly optionNodes: HTMLElement[];

  private readonly onOpenChange:
    | ((state: "open" | "close") => void)
    | undefined;
  private readonly onSelectChange: ((value: T) => void) | undefined;

  /** -1 when no option is active: a placeholder select the user has not navigated */
  private activeIndex: number = -1;
  private selectedIndex: number | null = null;
  private unwatchPlacement: (() => void) | undefined;

  constructor({
    id,
    onOpenChange,
    onSelectChange,
    defaultSelected,
  }: SelectConfig<T>) {
    this.rootNode = getById(id);

    const { labelId, comboboxId, listboxId, placeholderId } = getSelectIds(id);

    this.labelNode = getById(labelId);
    this.comboboxNode = getById(comboboxId);
    this.listboxNode = getById(listboxId);
    this.placeholderNode = getById(placeholderId);

    this.onOpenChange = onOpenChange;
    this.onSelectChange = onSelectChange;

    this.optionNodes = [
      ...this.listboxNode.querySelectorAll<HTMLElement>('[role="option"]'),
    ];

    if (this.optionNodes.length === 0) {
      return;
    }

    // set the initial selection directly rather than through selectOption,
    // which would notify the consumer of a change the user never made
    if (defaultSelected !== undefined) {
      const defaultSelectedIndex = this.optionNodes.findIndex(
        (optionNode) => optionNode.dataset.value === defaultSelected,
      );

      if (defaultSelectedIndex < 0) {
        throw new Error(
          `Select ${id} has no option with value: ${defaultSelected}`,
        );
      }

      const defaultOptionNode = this.optionNodes[defaultSelectedIndex];
      this.activeIndex = defaultSelectedIndex;
      this.selectedIndex = defaultSelectedIndex;
      defaultOptionNode.setAttribute("aria-selected", "true");
      this.placeholderNode.innerText = defaultOptionNode.dataset.label ?? "";
    }

    this.labelNode.addEventListener("click", () => {
      this.focusCombobox();
    });

    this.comboboxNode.addEventListener("click", () => {
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
      }

      this.focusCombobox();
    });

    this.comboboxNode.addEventListener("blur", (e) => {
      // do nothing if focus is moving into the listbox
      if (this.listboxNode.contains(e.relatedTarget as Node | null)) {
        return;
      }

      if (!this.isOpen()) {
        return;
      }

      if (this.activeIndex >= 0) {
        this.selectOption(this.activeIndex);
      }

      this.close();
    });

    this.comboboxNode.addEventListener("keydown", (e) => {
      const action = this.getActionFromKeyboardEvent(e);
      const maxIndex = this.optionNodes.length - 1;

      switch (action) {
        case SelectAction.First:
          this.open();
          this.setActiveOption(0);
          killEvent(e);
          break;
        case SelectAction.Last:
          this.open();
          this.setActiveOption(maxIndex);
          killEvent(e);
          break;
        case SelectAction.Next: {
          const nextIndex = Math.min(this.activeIndex + 1, maxIndex);
          this.setActiveOption(nextIndex);
          killEvent(e);
          break;
        }
        case SelectAction.Previous: {
          const previousIndex = Math.max(this.activeIndex - 1, 0);
          this.setActiveOption(previousIndex);
          killEvent(e);
          break;
        }
        case SelectAction.CloseSelect:
          if (this.activeIndex >= 0) {
            this.selectOption(this.activeIndex);
          }
          this.close();
          this.focusCombobox();
          killEvent(e);
          break;
        case SelectAction.Close:
          this.close();
          this.focusCombobox();
          killEvent(e);
          break;
        case SelectAction.Open:
          this.open();
          this.focusCombobox();
          killEvent(e);
          break;
        default:
          break;
      }
    });

    for (const [index, optionNode] of this.optionNodes.entries()) {
      optionNode.addEventListener("mousedown", killEvent);
      optionNode.addEventListener("click", () => {
        this.setActiveOption(index);
        this.selectOption(index);
        this.close();
        this.focusCombobox();
      });
    }

    window.addEventListener(
      "mousedown",
      (e) => {
        if (!this.isOpen() || this.rootNode.contains(e.target as Node)) {
          return;
        }

        if (this.activeIndex >= 0) {
          this.selectOption(this.activeIndex);
        }

        this.close();
      },
      true,
    );
  }

  private setActiveOption(activeIndex: number) {
    this.activeIndex = activeIndex;
    const activeOption = this.optionNodes[activeIndex];

    this.comboboxNode.setAttribute(
      "aria-activedescendant",
      activeOption?.id ?? "",
    );

    for (const optionNode of this.optionNodes) {
      optionNode.classList.remove("focus");
    }

    activeOption?.classList.add("focus");
    activeOption?.scrollIntoView({ block: "nearest" });
  }

  private selectOption(optionIndex: number) {
    const selectedOptionNode = this.optionNodes[optionIndex];
    if (this.selectedIndex !== optionIndex) {
      this.onSelectChange?.(selectedOptionNode.dataset.value as T);
    }

    for (const optionNode of this.optionNodes) {
      optionNode.setAttribute("aria-selected", "false");
    }

    selectedOptionNode.setAttribute("aria-selected", "true");

    this.placeholderNode.innerText = selectedOptionNode.dataset.label ?? "";

    this.activeIndex = optionIndex;
    this.selectedIndex = optionIndex;
  }

  private open() {
    if (this.isOpen()) {
      return;
    }

    this.rootNode.classList.toggle("open", true);
    this.unwatchPlacement = watchPopupPlacement({
      referenceNode: this.comboboxNode,
      popupNode: this.listboxNode,
    });
    this.comboboxNode.setAttribute("aria-expanded", "true");

    this.setActiveOption(this.activeIndex);
    this.onOpenChange?.("open");
  }

  private close() {
    if (!this.isOpen()) {
      return;
    }

    this.unwatchPlacement?.();

    this.rootNode.classList.toggle("open", false);
    this.comboboxNode.setAttribute("aria-expanded", "false");

    this.comboboxNode.setAttribute("aria-activedescendant", "");
    for (const optionNode of this.optionNodes) {
      optionNode.classList.remove("focus");
    }

    this.onOpenChange?.("close");
  }

  private focusCombobox() {
    this.comboboxNode.focus();
  }

  isOpen(): boolean {
    return this.comboboxNode.getAttribute("aria-expanded") === "true";
  }

  private getActionFromKeyboardEvent(e: KeyboardEvent): SelectAction | null {
    const { key, altKey } = e;
    if (!this.isOpen() && key === "ArrowUp") {
      return SelectAction.First;
    }

    const openKeys = ["ArrowDown", "Enter", " "];
    if (!this.isOpen() && openKeys.includes(key)) {
      return SelectAction.Open;
    }

    if (key === "Home") {
      return SelectAction.First;
    }

    if (key === "End") {
      return SelectAction.Last;
    }

    if (!this.isOpen()) {
      return null;
    }

    if (key === "ArrowUp" && altKey) {
      return SelectAction.CloseSelect;
    }

    if (key === "ArrowDown" && !altKey) {
      return SelectAction.Next;
    }

    if (key === "ArrowUp") {
      return SelectAction.Previous;
    }

    if (key === "PageUp") {
      return SelectAction.First;
    }

    // I don't think our selects will have enough options
    // to warrant page selection
    if (key === "PageDown") {
      return SelectAction.Last;
    }

    if (key === "Escape") {
      return SelectAction.Close;
    }

    if (key === "Enter" || key === " ") {
      return SelectAction.CloseSelect;
    }

    return null;
  }
}

export const createSelect = <T extends string = string>(
  selectConfig: SelectConfig<T>,
) => {
  return new Select<T>(selectConfig);
};
