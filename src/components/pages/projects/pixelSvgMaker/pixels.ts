import type { Optional } from "type-fest";
import type { Color } from "~/lib/color";

export type Pixels = Optional<Color>[][];

export const pixelsFlatMap = <T>(
  pixels: Pixels,
  callback: (color: Optional<Color>, { x, y }: { x: number; y: number }) => T,
): T[] => {
  return pixels.flatMap((row, y) =>
    row.map((color, x) => callback(color, { x, y })),
  );
};

export const pixelsForEach = (
  pixels: Pixels,
  callback: (
    color: Optional<Color>,
    { x, y }: { x: number; y: number },
  ) => void,
): void => {
  pixels.forEach((row, y) => {
    row.forEach((color, x) => {
      callback(color, { x, y });
    });
  });
};
