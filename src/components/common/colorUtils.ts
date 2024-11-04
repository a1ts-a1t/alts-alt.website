import { clamp, frac, int } from './mathUtils';

/** all fields from 0 to 255 inclusive */
export interface RgbColor {
    red: number;
    green: number;
    blue: number;
}

export const colorToRgbString = (color: RgbColor) => {
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
};

export const numberToTwoDigitHexString = (n: number): string => {
    return n.toString(16).padStart(2, '0').slice(-2);
};

export const colorToHexString = (color: RgbColor): string => {
    return `${numberToTwoDigitHexString(color.red)}${numberToTwoDigitHexString(color.green)}${numberToTwoDigitHexString(color.blue)}`;
};

/**
 * converts a given hex string to the corresponding color
 * returns undefined if the hex string is not valie
 * string should contain leading hash (#)
 */
export const hexStringToColor = (s: string): RgbColor | undefined => {
    const sanitizedString = s.trim().toLowerCase();

    const sixCharMatch = sanitizedString.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
    const threeCharMatch = sanitizedString.match(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/);

    if (threeCharMatch !== null) {
        const redVal = threeCharMatch.at(1);
        const greenVal = threeCharMatch.at(2);
        const blueVal = threeCharMatch.at(3);

        return redVal === undefined || blueVal === undefined || greenVal === undefined
            ? undefined
            : {
                red: parseInt(redVal + redVal, 16),
                green: parseInt(greenVal + greenVal, 16),
                blue: parseInt(blueVal + blueVal, 16),
            };
    }


    if (sixCharMatch !== null) {
        const redVal = sixCharMatch.at(1);
        const greenVal = sixCharMatch.at(2);
        const blueVal = sixCharMatch.at(3);

        return redVal === undefined || blueVal === undefined || greenVal === undefined
            ? undefined
            : {
                red: parseInt(redVal, 16),
                green: parseInt(greenVal, 16),
                blue: parseInt(blueVal, 16),
            };
    }

    return undefined;
};

export const RED: RgbColor = {
    red: 255,
    green: 0,
    blue: 0,
};

export const GREEN: RgbColor = {
    red: 0,
    green: 255,
    blue: 0,
};

export const BLUE: RgbColor = {
    red: 0,
    green: 0,
    blue: 255,
};

export const BLACK: RgbColor = {
    red: 0,
    green: 0,
    blue: 0,
};

export const WHITE: RgbColor = {
    red: 255,
    green: 255,
    blue: 255,
};

export const CYAN: RgbColor = {
    red: 0,
    green: 255,
    blue: 255,
};

export const MAGENTA: RgbColor = {
    red: 255,
    green: 0,
    blue: 255,
};

export const YELLOW: RgbColor = {
    red: 255,
    green: 255,
    blue: 0,
};

/** all fields from 0 to 1 */
export interface HslColor {
    hue: number;
    saturation: number;
    lightness: number;
}

export const toRgbColorValue = (val: number) => clamp(Math.floor(val), 0, 255);

/**
 * Converts an HSL Color to an RGB Color
 * From Computer Graphics and Geometric Modeling, page 306 (Agoston, 2005)
 * @see {@link https://www.google.com/books/edition/Computer_Graphics_and_Geometric_Modellin/fGX8yC-4vXUC | here} for more
 *
 * @param color: a color in RGB representation. all values are integers in [0, 255]
 * @returns a color in HSL representation. all values are real numbers in [0, 1]
 */
export const toRgbColor = (color: HslColor): RgbColor => {
    const { hue: h, saturation: s, lightness: l } = color;

    // achromatic case
    if (s === 0) {
        const rgbLightness = toRgbColorValue(l * 256);
        return { red: rgbLightness, green: rgbLightness, blue: rgbLightness };
    }

    const v = l < 0.5 ? l * (1 + s) : l + s - l * s;

    if (v === 0) {
        return { red: 0, green: 0, blue: 0 };
    }

    const min = 2 * l - v;
    const sv = (v - min) / v;
    const denormalizedHue = h * 6;
    const sextant = int(denormalizedHue);
    const fract = frac(sextant);
    const vsf = v * sv * fract;
    const mid1 = min + vsf;
    const mid2 = v - vsf;

    switch (sextant) {
        case 0:
            return { red: toRgbColorValue(v * 256), green: toRgbColorValue(mid1 * 256), blue: toRgbColorValue(min * 256) };
        case 1:
            return { red: toRgbColorValue(mid2 * 256), green: toRgbColorValue(v * 256), blue: toRgbColorValue(min * 256) };
        case 2:
            return { red: toRgbColorValue(min * 256), green: toRgbColorValue(v * 256), blue: toRgbColorValue(mid1 * 256) };
        case 3:
            return { red: toRgbColorValue(min * 256), green: toRgbColorValue(mid2 * 256), blue: toRgbColorValue(v * 256) };
        case 4:
            return { red: toRgbColorValue(mid1 * 256), green: toRgbColorValue(min * 256), blue: toRgbColorValue(v * 256) };
        case 5:
            return { red: toRgbColorValue(v * 256), green: toRgbColorValue(min * 256), blue: toRgbColorValue(mid2 * 256) };
        default:
            return { red: 0, green: 0, blue: 0 };
    }
};

/**
 * Converts an RGB Color to an HSL Color
 *
 * @param color: a color in RGB representation. all values are integers in [0, 255]
 * @returns a color in HSL representation. all values are real numbers in [0, 1]
 */
export const toHslColor = (color: RgbColor): HslColor => {
    const normedRed = color.red / 255;
    const normedGreen = color.green / 255;
    const normedBlue = color.blue / 255;
    const max = Math.max(normedRed, normedGreen, normedBlue);
    const min = Math.min(normedRed, normedGreen, normedBlue);
    const chroma = max - min;

    const lightness = (max + min) / 2;
    const saturation = chroma === 0 ? 0 : chroma / (1 - Math.abs(2 * lightness - 1));

    if (chroma === 0) {
        return { hue: 0, saturation, lightness };
    }

    switch (max) {
        case normedRed:
            return {
                hue: frac((((normedGreen - normedBlue) / chroma) % 6) / 6),
                saturation,
                lightness,
            };
        case normedGreen:
            return {
                hue: frac(((normedBlue - normedRed) / chroma + 2) / 6),
                saturation,
                lightness,
            };
        case normedBlue:
            return {
                hue: frac(((normedRed - normedGreen) / chroma + 4) / 6),
                saturation,
                lightness,
            };
        default:
            return { hue: 0, saturation, lightness };
    }
};

export interface LabColor {
    /** lightness, between 0 and 100 */
    l: number;
    /** red-green, between -127 and 127 */
    a: number;
    /** blue-yellow, between -127 and 127 */
    b: number;
}

const toLabColorHelper = (val: number) => {
    if (val > 0.008856) {
        return Math.pow(val, 1 / 3);
    }

    return 7.787 * val + 16 / 116;
};

/**
 * Converts an RGB Color to a L*a*b* Color
 * From OpenCV Docs
 * @see {@link https://docs.opencv.org/2.4/modules/imgproc/doc/miscellaneous_transformations.html?highlight=cvtcolor#cvtcolor | here} for more
 *
 * @param color: a color in RGB representation. all values are integers in [0, 255]
 * @returns a color in L*a*b* representation
 */
export const toLabColor = (color: RgbColor): LabColor => {
    const normedRed = color.red / 255;
    const normedGreen = color.green / 255;
    const normedBlue = color.blue / 255;

    const x = (0.412453 * normedRed + 0.357580 * normedGreen + 0.180423 * normedBlue) / 0.950456;
    const y = (0.212671 * normedRed + 0.715160 * normedGreen + 0.072169 * normedBlue);
    const z = (0.019334 * normedRed + 0.119193 * normedGreen + 0.950227 * normedBlue) / 1.088754;

    const l = y > 0.008856
        ? 116 * Math.pow(y, 1 / 3)
        : 903.3 * y;

    const a = 500 * (toLabColorHelper(x) - toLabColorHelper(y));
    const b = 200 * (toLabColorHelper(y) - toLabColorHelper(z));

    return { l, a, b };
};

