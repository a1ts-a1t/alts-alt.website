import { persistentAtom } from "@nanostores/persistent";

export const themeStore = persistentAtom<"light" | "dark" | "system">(
  "theme",
  "system",
);
export const contrastStore = persistentAtom<"default" | "high" | "system">(
  "contrast",
  "system",
);
export const motionStore = persistentAtom<"default" | "reduced" | "system">(
  "motion",
  "system",
);

export const initializeStores = () => {
  themeStore.subscribe((value) => {
    const isSystemDark =
      value === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isSystemDark) {
      document.documentElement.classList.add("dark");
      return;
    }

    if (value === "system") {
      document.documentElement.classList.remove("dark");
      return;
    }

    if (value === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    // light mode
    document.documentElement.classList.remove("dark");
  });

  contrastStore.subscribe((value) => {
    if (value === "high") {
      document.documentElement.classList.add("contrast");
    } else {
      // default contrast
      document.documentElement.classList.remove("contrast");
    }
  });
};

export const getNormalizedTheme = (value?: "light" | "dark" | "system") => {
  const themeStoreValue = value ?? themeStore.get();
  const isSystemDark =
    themeStoreValue === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isSystemDark) {
    return "dark";
  }

  if (themeStoreValue === "system") {
    return "light";
  }

  return themeStoreValue;
};

export const getNormalizedContrastMode = (
  value?: "default" | "high" | "system",
) => {
  const contrastStoreValue = value ?? contrastStore.get();
  const isSystemHighContrast =
    contrastStoreValue === "system" &&
    window.matchMedia("(prefers-contrast: more)").matches;

  if (isSystemHighContrast) {
    return "high";
  }

  if (contrastStoreValue === "system") {
    return "default";
  }

  return contrastStoreValue;
};

export const getNormalizedMotionMode = (
  value?: "default" | "reduced" | "system",
) => {
  const motionStoreValue = value ?? motionStore.get();
  const isSystemReducedMotion =
    motionStoreValue === "system" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isSystemReducedMotion) {
    return "reduced";
  }

  if (motionStoreValue === "system") {
    return "default";
  }

  return motionStoreValue;
};
