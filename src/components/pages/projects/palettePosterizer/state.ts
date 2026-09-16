import { map } from "nanostores";
import type { Color } from "~/lib/color";
import { ColorMetric, ColorReducer } from "./utils";

export interface State {
  image: HTMLImageElement | undefined;
  palette: Color[];
  colorMetric: ColorMetric;
  colorReducer: ColorReducer;
}

export const stateStore = map<State>({
  image: undefined,
  palette: [],
  colorMetric: ColorMetric.EUCLIDEAN_RGB,
  colorReducer: ColorReducer.PALETTE,
});
