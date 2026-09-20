import { map } from "nanostores";
import { Color } from "~/lib/color";
import type { Pixels } from "./pixels";

export enum Mode {
  DRAW,
  ERASE,
}

export interface State {
  mode: Mode;
  pixels: Pixels;
  color: Color; // selected color
  history: Pixels[];
}

export const stateStore = map<State>({
  mode: Mode.DRAW,
  pixels: Array.from({ length: 16 }, () => new Array(16).fill(undefined)),
  color: Color.fromRgb({ red: 0, green: 0, blue: 0 }),
  history: [],
});

export const modifyAt = (x: number, y: number) => {
  if (x < 0 || x >= 16 || y < 0 || y >= 16) {
    return;
  }

  const { pixels, mode, color } = stateStore.get();

  const modifiedPixels = pixels.map((row) => [...row]);
  modifiedPixels[y][x] = mode === Mode.ERASE ? undefined : color;

  stateStore.setKey("pixels", modifiedPixels);
};

export const addToHistory = () => {
  const { pixels, history } = stateStore.get();
  const currentPixels = pixels.map((row) => [...row]);
  stateStore.setKey("history", [...history, currentPixels]);
};

export const undoFromHistory = () => {
  const { history } = stateStore.get();

  if (history.length === 0) {
    return;
  }

  const newHistory = history.slice(0, -1);
  stateStore.setKey("history", newHistory);

  if (newHistory.length === 0) {
    stateStore.setKey(
      "pixels",
      Array.from({ length: 16 }, () => new Array(16).fill(undefined)),
    );
    return;
  }

  stateStore.setKey("pixels", newHistory[newHistory.length - 1]);
};
