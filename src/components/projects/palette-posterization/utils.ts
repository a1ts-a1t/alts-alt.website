import fragmentShaderSourceTemplate from './shaders/fragment-shader.glsl.template';
import paletteColorReducerSource from './shaders/color-reducers/palette.glsl';
import averageColorReducerSource from './shaders/color-reducers/average.glsl';
import preserveHueColorReducerSource from './shaders/color-reducers/preserve-hue.glsl';
import preserveSlColorReducerSource from './shaders/color-reducers/preserve-sl.glsl';
import mixboxColorReducerSource from './shaders/color-reducers/mixbox.glsl';
import euclideanRgbColorMetricSource from './shaders/color-metrics/euclidean-rgb.glsl';
import weightedEuclideanRgbColorMetricSource from './shaders/color-metrics/weighted-euclidean-rgb.glsl';
import deltaEColorMetricSource from './shaders/color-metrics/delta-e.glsl';
import hueColorMetricSource from './shaders/color-metrics/hue.glsl';
import lightnessColorMetricSource from './shaders/color-metrics/lightness.glsl';
import saturationColorMetricSource from './shaders/color-metrics/saturation.glsl';
import { interpolateStringTemplate } from '../../common/utils';

export enum ColorMetricType {
    EUCLIDEAN_RGB = 'Euclidean RGB',
    WEIGHTED_EUCLIDEAN_RGB = 'Weighted Euclidean RGB',
    DELTA_E = 'Delta E',
    HUE = 'Hue Difference',
    SATURATION = 'Saturation Difference',
    LIGHTNESS = 'Lightness Difference',
}

export enum ColorReducerType {
    PALETTE = 'Render palette color',
    PRESERVE_SL = 'Preserve saturation and lightness',
    PRESERVE_HUE = 'Preserve hue',
    AVERAGE = 'Average by color channel',
    MIXBOX = 'Mixbox average',
}

export const COLOR_METRIC_TO_SOURCE: Record<ColorMetricType, string> = {
    [ColorMetricType.EUCLIDEAN_RGB]: euclideanRgbColorMetricSource,
    [ColorMetricType.WEIGHTED_EUCLIDEAN_RGB]: weightedEuclideanRgbColorMetricSource,
    [ColorMetricType.DELTA_E]: deltaEColorMetricSource,
    [ColorMetricType.HUE]: hueColorMetricSource,
    [ColorMetricType.SATURATION]: saturationColorMetricSource,
    [ColorMetricType.LIGHTNESS]: lightnessColorMetricSource,
};

export const COLOR_REDUCER_TO_SOURCE: Record<ColorReducerType, string> = {
    [ColorReducerType.PALETTE]: paletteColorReducerSource,
    [ColorReducerType.AVERAGE]: averageColorReducerSource,
    [ColorReducerType.PRESERVE_HUE]: preserveHueColorReducerSource,
    [ColorReducerType.PRESERVE_SL]: preserveSlColorReducerSource,
    [ColorReducerType.MIXBOX]: mixboxColorReducerSource,
};

export const getFragmentShader = (colorMetric: ColorMetricType, colorReducer: ColorReducerType) => {
    const colorMetricSourceString = COLOR_METRIC_TO_SOURCE[colorMetric];
    const colorReducerSourceString = COLOR_REDUCER_TO_SOURCE[colorReducer];
    return interpolateStringTemplate(fragmentShaderSourceTemplate, {
        COLOR_METRIC_SOURCE_STRING: colorMetricSourceString,
        COLOR_REDUCER_SOURCE_STRING: colorReducerSourceString,
    });
};
