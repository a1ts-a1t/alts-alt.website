import React from 'react';
import { BLACK, BLUE, CYAN, GREEN, MAGENTA, RED, RgbColor, WHITE, YELLOW, colorToHexString } from '../../common/colorUtils';

interface DefaultPaletteOptionProps {
    name: string;
    palette: RgbColor[];
    onClick: () => void;
}

const DefaultPaletteOption: React.FC<DefaultPaletteOptionProps> = ({
    name,
    palette,
    onClick,
}) => {
    return (
        <div className='flex h-6 min-w-max flex-row justify-between gap-x-4 hover:cursor-pointer' onClick={ onClick }>
            <div>{ name }</div>
            <div className='border-text flex max-w-[calc(100vw/3)] flex-row gap-x-0 overflow-x-auto border-2'>
                { palette.map((color, idx) => {
                    const colorHexString = colorToHexString(color);
                    return (
                        <div
                            className='my-auto size-5 min-w-5'
                            style={ { backgroundColor: `#${colorHexString}` } }
                            key={ `${name}-${colorHexString}-${idx}` }
                        />
                    );
                }) }
            </div>
        </div>
    );
};

export const DEFAULT_PALETTE_OPTIONS: Omit<DefaultPaletteOptionProps, 'onClick'>[] = [
    { name: 'Monochrome', palette: [ BLACK, WHITE ] },
    { name: '2-bit Grayscale', palette: [ ...Array(3).fill(0).map(
        (_, idx) => ({ red: 85 * idx, green: 85 * idx, blue: 85 * idx }),
    ), WHITE ] },
    { name: '4-bit Grayscale', palette: [ ...Array(15).fill(0).map(
        (_, idx) => ({ red: 17 * idx, green: 17 * idx, blue: 17 * idx }),
    ), WHITE ] },
    { name: 'RGB', palette: [ RED, GREEN, BLUE ] },
    { name: 'CMYK', palette: [ CYAN, MAGENTA, YELLOW, BLACK ] },
    { name: 'RYB', palette: [ RED, YELLOW, BLUE ] },
    { name: 'Teletext', palette: [ RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, BLACK, WHITE ] },
    { name: '4-bit RGBI', palette: [
        ...Array(8).fill(0).map((_, idx) => ({
            red: idx >= 4 ? 170 : 0,
            green: (idx % 4) >= 2 ? 170 : 0,
            blue: (idx % 2) >= 1 ? 170 : 0,
        })),
        RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, BLACK, WHITE,
    ] },
    { name: 'Apple II', palette: [
        BLACK, MAGENTA, GREEN, WHITE,
        { red: 0, green: 170, blue: 255 }, // blue
        { red: 255, green: 80, blue: 0 }, // orange
    ] },
    { name: 'PICO-8', palette: [
        { red: 0, green: 0, blue: 0 },
        { red: 29, green: 43, blue: 83 },
        { red: 126, green: 37, blue: 83 },
        { red: 0, green: 135, blue: 81 },
        { red: 171, green: 82, blue: 54 },
        { red: 95, green: 87, blue: 79 },
        { red: 194, green: 195, blue: 199 },
        { red: 255, green: 241, blue: 232 },
        { red: 255, green: 0, blue: 77 },
        { red: 255, green: 163, blue: 0 },
        { red: 255, green: 236, blue: 39 },
        { red: 0, green: 228, blue: 54 },
        { red: 41, green: 173, blue: 255 },
        { red: 131, green: 118, blue: 156 },
        { red: 255, green: 119, blue: 168 },
        { red: 255, green: 204, blue: 170 },
    ] },
    { name: 'Matplotlib', palette: [
        { red: 31, green: 119, blue: 180 },
        { red: 255, green: 127, blue: 14 },
        { red: 44, green: 160, blue: 44 },
        { red: 214, green: 39, blue: 40 },
        { red: 148, green: 103, blue: 189 },
        { red: 140, green: 86, blue: 75 },
        { red: 227, green: 119, blue: 194 },
        { red: 127, green: 127, blue: 127 },
        { red: 188, green: 189, blue: 34 },
        { red: 23, green: 190, blue: 207 },
    ] },
    { name: 'Game Boy', palette: [
        { red: 41, green: 65, blue: 57 },
        { red: 57, green: 89, blue: 65 },
        { red: 90, green: 121, blue: 66 },
        { red: 123, green: 130, blue: 16 },
    ] },
    { name: 'Crayola 8-Pack', palette: [
        { red: 237, green: 10, blue: 63 }, // red
        { red: 1, green: 163, blue: 104 }, // green
        { red: 0, green: 102, blue: 255 }, // blue
        { red: 175, green: 89, blue: 62 }, // brown
        BLACK,
        { red: 255, green: 104, blue: 31 }, // orange
        { red: 131, green: 89, blue: 163 }, // purple
        { red: 252, green: 232, blue: 131 }, // yellow
    ] },
    { name: 'Animal Crossing Designs', palette: [
        { red: 255, green: 255, blue: 255 },
        { red: 136, green: 136, blue: 136 },
        { red: 0, green: 0, blue: 0 },
        { red: 255, green: 0, blue: 0 },
        { red: 255, green: 102, blue: 0 },
        { red: 255, green: 255, blue: 0 },
        { red: 34, green: 221, blue: 34 },
        { red: 0, green: 136, blue: 51 },
        { red: 0, green: 205, blue: 255 },
        { red: 16, green: 119, blue: 255 },
        { red: 0, green: 0, blue: 255 },
        { red: 204, green: 0, blue: 255 },
        { red: 255, green: 0, blue: 204 },
        { red: 255, green: 170, blue: 136 },
        { red: 153, green: 50, blue: 0 },
    ] },
    { name: 'Trans Pride', palette: [
        { red: 91, green: 206, blue: 250 }, // blue
        { red: 245, green: 169, blue: 184 }, // pink
        WHITE,
    ] },
    { name: 'Virtual Boy', palette: [
        BLACK,
        { red: 85, green: 0, blue: 0 },
        { red: 164, green: 0, blue: 0 },
        { red: 239, green: 0, blue: 0 },
    ] },
    // per https://www.r-bloggers.com/2020/05/say-it-aint-so-using-weezer-album-cover-colours-in-r/
    { name: 'Weezer', palette: [
        { red: 24, green: 155, blue: 204 }, // blue
        { red: 190, green: 204, blue: 65 }, // green
        { red: 234, green: 33, blue: 58 }, // red
        { red: 243, green: 243, blue: 243 }, // white
        { red: 13, green: 13, blue: 13 }, // black
    ] },
    { name: 'Mii Favorite Colors', palette: [
        { red: 212, green: 29, blue: 15 }, // red
        { red: 254, green: 112, blue: 23 }, // orange
        { red: 255, green: 222, blue: 32 }, // yellow
        { red: 121, green: 211, blue: 31 }, // lime green
        { red: 0, green: 122, blue: 49 }, // green
        { red: 7, green: 73, blue: 179 }, // blue
        { red: 56, green: 169, blue: 222 }, // light blue
        { red: 247, green: 89, blue: 123 }, // pink
        { red: 113, green: 41, blue: 172 }, // purple
        { red: 73, green: 57, blue: 23 }, // brown
        { red: 230, green: 228, blue: 231 }, // white
        { red: 23, green: 24, blue: 16 }, // black
    ] },
    { name: 'MS Paint', palette: [
        { red: 0, green: 0, blue: 0 },
        { red: 128, green: 128, blue: 128 },
        { red: 128, green: 0, blue: 0 },
        { red: 128, green: 128, blue: 0 },
        { red: 0, green: 128, blue: 0 },
        { red: 0, green: 128, blue: 128 },
        { red: 0, green: 0, blue: 128 },
        { red: 128, green: 0, blue: 128 },
        { red: 128, green: 128, blue: 64 }, 
        { red: 0, green: 64, blue: 64 },
        { red: 0, green: 128, blue: 255 },
        { red: 0, green: 64, blue: 128 },
        { red: 128, green: 0, blue: 255 },
        { red: 128, green: 64, blue: 0 },
        { red: 255, green: 255, blue: 255 },
        { red: 192, green: 192, blue: 192 },
        { red: 255, green: 0, blue: 0 },
        { red: 255, green: 255, blue: 0 },
        { red: 0, green: 255, blue: 0 },
        { red: 0, green: 255, blue: 255 },
        { red: 0, green: 0, blue: 255 },
        { red: 255, green: 0, blue: 255 },
        { red: 255, green: 255, blue: 128 },
        { red: 0, green: 255, blue: 128 },
        { red: 128, green: 255, blue: 255 },
        { red: 128, green: 128, blue: 255 },
        { red: 255, green: 0, blue: 128 },
        { red: 255, green: 128, blue: 64 },
    ] },
];

export default DefaultPaletteOption;

