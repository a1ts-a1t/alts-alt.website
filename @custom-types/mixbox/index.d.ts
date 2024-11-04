declare module 'mixbox' {
    export type Rgba = { r: number; g: number; b: number; a?: number };
    export type RgbArray = [ number, number, number ];
    export type RgbaArray = [ number, number, number, number ];
    export type Latent = [ number, number, number, number, number, number, number ];

    export type Color = string | RgbArray | RgbaArray | Rgba | number;

    export function lerp(
        color1: Color, color2: Color, t: number,
    ): RgbArray | RgbaArray | void;

    export function lerpFloat(
        color1: Color, color2: Color, t: number,
    ): RgbArray | void;

    export function lerpLinearFloat(
        color1: Color, color2: Color, t: number,
    ): RgbArray | void;

    export function rgbToLatent(r: Color, g?: number, b?: number): Latent | void;

    export function latentToRgb(latent: Latent): RgbArray;

    export function floatRgbToLatent(r: Color, g?: number, b?: number): Latent | void;

    export function latentToFloatRgb(latent: Latent): RgbArray;

    export function linearFloatRgbToLatent(r: Color, g?: number, b?: number): Latent | void;

    export function latentToLinearFloatRgb(latent: Latent): RgbArray;

    export function glsl(): string;

    export function lutTexture(gl: WebGLRenderingContext): WebGLTexture;
}
