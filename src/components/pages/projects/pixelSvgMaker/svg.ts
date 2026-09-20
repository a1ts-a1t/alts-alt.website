import { computed } from "nanostores";
import { HTMLStringBuilder } from "~/lib/dom";
import { isNonNull } from "~/lib/utils";
import { pixelsFlatMap, pixelsForEach } from "./pixels";
import { type State, stateStore } from "./state";

interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const getBounds = ({ pixels }: State): Bounds | null => {
  let bounds: Bounds | null = null;
  pixelsForEach(pixels, (color, { x, y }) => {
    if (color === undefined) {
      return;
    }

    if (bounds === null) {
      bounds = { xMin: x, xMax: x, yMin: y, yMax: y };
      return;
    }

    bounds.xMin = Math.min(bounds.xMin, x);
    bounds.xMax = Math.max(bounds.xMax, x);
    bounds.yMin = Math.min(bounds.yMin, y);
    bounds.yMax = Math.max(bounds.yMax, y);
  });

  return bounds;
};

export const asSvgString = (state: State) => {
  const bounds = getBounds(state);
  if (bounds === null) {
    return HTMLStringBuilder.fromTag("svg")
      .withAttribute("xmlns", "http://www.w3.org/2000/svg")
      .withAttribute("version", "1.1")
      .asString();
  }

  const rectStrings: string[] = pixelsFlatMap(
    state.pixels,
    (color, { x, y }) => {
      if (color === undefined) {
        return undefined;
      }

      return HTMLStringBuilder.fromTag("rect")
        .withAttribute("width", "1")
        .withAttribute("height", "1")
        .withAttribute("x", String(x))
        .withAttribute("y", String(y))
        .withAttribute("shape-rendering", "geometricPrecision")
        .withAttribute("fill", color.asRgbString())
        .asString();
    },
  ).filter(isNonNull);

  const { xMin, yMin, xMax, yMax } = bounds;

  return HTMLStringBuilder.fromTag("svg")
    .withAttribute("xmlns", "http://www.w3.org/2000/svg")
    .withAttribute("version", "1.1")
    .withAttribute(
      "viewBox",
      `${xMin} ${yMin} ${xMax - xMin + 1} ${yMax - yMin + 1}`,
    )
    .withAttribute("preserveAspectRatio", "xMidYMid meet")
    .withInnerHtml(rectStrings.join(""))
    .asString();
};

export const svgStringStore = computed(stateStore, asSvgString);
