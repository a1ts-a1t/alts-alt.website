import { persistentAtom } from "@nanostores/persistent";
import { noop } from "./utils";

export type ThemeMode = "light" | "dark";
export type ContrastMode = "default" | "high";
export type MotionMode = "default" | "reduced";

type LocalStoreValue<T extends string> = T | "system";

export const themeStore = persistentAtom<LocalStoreValue<ThemeMode>>(
  "theme",
  "system",
);
export const contrastStore = persistentAtom<LocalStoreValue<ContrastMode>>(
  "contrast",
  "system",
);
export const motionStore = persistentAtom<LocalStoreValue<MotionMode>>(
  "motion",
  "system",
);

const SETTINGS_COOKIE_MAX_AGE_MS = 60 * 60 * 24 * 365 * 1000;

const writeSettingsCookie = (name: string, value: string): void => {
  if (typeof cookieStore === "undefined") {
    return;
  }

  cookieStore
    .set({
      name,
      value,
      path: "/",
      expires: Date.now() + SETTINGS_COOKIE_MAX_AGE_MS,
      sameSite: "lax",
    })
    .catch(noop);
};

export const initializeStores = (): void => {
  themeStore.subscribe((value) => {
    writeSettingsCookie("theme", value);

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
    writeSettingsCookie("contrast", value);

    if (value === "high") {
      document.documentElement.classList.add("contrast");
    } else {
      // default contrast
      document.documentElement.classList.remove("contrast");
    }
  });
};

export const normalizeLocalStoreThemeMode = (
  value: LocalStoreValue<ThemeMode>,
): ThemeMode => {
  const isSystemDark =
    value === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isSystemDark) {
    return "dark";
  }

  if (value === "system") {
    return "light";
  }

  return value;
};

export const getThemeMode = (): ThemeMode => {
  return normalizeLocalStoreThemeMode(themeStore.get());
};

export const normalizeLocalStoreContrastMode = (
  value: LocalStoreValue<ContrastMode>,
): ContrastMode => {
  const isSystemHighContrast =
    value === "system" && window.matchMedia("(prefers-contrast: more)").matches;

  if (isSystemHighContrast) {
    return "high";
  }

  if (value === "system") {
    return "default";
  }

  return value;
};

export const getContrastMode = (): ContrastMode => {
  return normalizeLocalStoreContrastMode(contrastStore.get());
};

export const normalizeLocalStoreMotionMode = (
  value: LocalStoreValue<MotionMode>,
): MotionMode => {
  const isSystemReducedMotion =
    value === "system" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isSystemReducedMotion) {
    return "reduced";
  }

  if (value === "system") {
    return "default";
  }

  return value;
};

export const getMotionMode = () => {
  return normalizeLocalStoreMotionMode(motionStore.get());
};
