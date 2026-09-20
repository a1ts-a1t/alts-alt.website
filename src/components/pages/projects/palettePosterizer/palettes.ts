import { Color } from "~/lib/color";

export interface PaletteOption {
  name: string;
  palette: Color[];
}

const BLACK = Color.fromRgb({ red: 0, green: 0, blue: 0 });
const WHITE = Color.fromRgb({ red: 255, green: 255, blue: 255 });
const RED = Color.fromRgb({ red: 255, green: 0, blue: 0 });
const GREEN = Color.fromRgb({ red: 0, green: 255, blue: 0 });
const BLUE = Color.fromRgb({ red: 0, green: 0, blue: 255 });
const CYAN = Color.fromRgb({ red: 0, green: 255, blue: 255 });
const MAGENTA = Color.fromRgb({ red: 255, green: 0, blue: 255 });
const YELLOW = Color.fromRgb({ red: 255, green: 255, blue: 0 });

export const PALETTE_OPTIONS: PaletteOption[] = [
  { name: "Monochrome", palette: [BLACK, WHITE] },
  {
    name: "2-bit Grayscale",
    palette: [
      ...Array.from({ length: 3 }, (_, idx) => {
        const value = 85 * idx;
        return Color.fromRgb({ red: value, green: value, blue: value });
      }),
      WHITE,
    ],
  },
  {
    name: "4-bit Grayscale",
    palette: [
      ...Array.from({ length: 15 }, (_, idx) => {
        const value = 17 * idx;
        return Color.fromRgb({ red: value, green: value, blue: value });
      }),
      WHITE,
    ],
  },
  { name: "RGB", palette: [RED, GREEN, BLUE] },
  { name: "CMYK", palette: [CYAN, MAGENTA, YELLOW, BLACK] },
  { name: "RYB", palette: [RED, YELLOW, BLUE] },
  {
    name: "Teletext",
    palette: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, BLACK, WHITE],
  },
  {
    name: "4-bit RGBI",
    palette: [
      ...Array.from({ length: 8 }, (_, idx) => {
        const red = idx >= 4 ? 170 : 0;
        const green = idx % 4 >= 2 ? 170 : 0;
        const blue = idx % 2 >= 1 ? 170 : 0;
        return Color.fromRgb({ red, green, blue });
      }),
      RED,
      GREEN,
      BLUE,
      CYAN,
      MAGENTA,
      YELLOW,
      BLACK,
      WHITE,
    ],
  },
  {
    name: "Apple II",
    palette: [
      BLACK,
      MAGENTA,
      GREEN,
      WHITE,
      Color.fromRgb({ red: 0, green: 170, blue: 255 }), // blue
      Color.fromRgb({ red: 255, green: 80, blue: 0 }), // orange
    ],
  },
  {
    name: "PICO-8",
    palette: [
      Color.fromRgb({ red: 0, green: 0, blue: 0 }),
      Color.fromRgb({ red: 29, green: 43, blue: 83 }),
      Color.fromRgb({ red: 126, green: 37, blue: 83 }),
      Color.fromRgb({ red: 0, green: 135, blue: 81 }),
      Color.fromRgb({ red: 171, green: 82, blue: 54 }),
      Color.fromRgb({ red: 95, green: 87, blue: 79 }),
      Color.fromRgb({ red: 194, green: 195, blue: 199 }),
      Color.fromRgb({ red: 255, green: 241, blue: 232 }),
      Color.fromRgb({ red: 255, green: 0, blue: 77 }),
      Color.fromRgb({ red: 255, green: 163, blue: 0 }),
      Color.fromRgb({ red: 255, green: 236, blue: 39 }),
      Color.fromRgb({ red: 0, green: 228, blue: 54 }),
      Color.fromRgb({ red: 41, green: 173, blue: 255 }),
      Color.fromRgb({ red: 131, green: 118, blue: 156 }),
      Color.fromRgb({ red: 255, green: 119, blue: 168 }),
      Color.fromRgb({ red: 255, green: 204, blue: 170 }),
    ],
  },
  {
    name: "Matplotlib",
    palette: [
      Color.fromRgb({ red: 31, green: 119, blue: 180 }),
      Color.fromRgb({ red: 255, green: 127, blue: 14 }),
      Color.fromRgb({ red: 44, green: 160, blue: 44 }),
      Color.fromRgb({ red: 214, green: 39, blue: 40 }),
      Color.fromRgb({ red: 148, green: 103, blue: 189 }),
      Color.fromRgb({ red: 140, green: 86, blue: 75 }),
      Color.fromRgb({ red: 227, green: 119, blue: 194 }),
      Color.fromRgb({ red: 127, green: 127, blue: 127 }),
      Color.fromRgb({ red: 188, green: 189, blue: 34 }),
      Color.fromRgb({ red: 23, green: 190, blue: 207 }),
    ],
  },
  {
    name: "Game Boy",
    palette: [
      Color.fromRgb({ red: 41, green: 65, blue: 57 }),
      Color.fromRgb({ red: 57, green: 89, blue: 65 }),
      Color.fromRgb({ red: 90, green: 121, blue: 66 }),
      Color.fromRgb({ red: 123, green: 130, blue: 16 }),
    ],
  },
  {
    name: "Crayola 8-Pack",
    palette: [
      Color.fromRgb({ red: 237, green: 10, blue: 63 }), // red
      Color.fromRgb({ red: 1, green: 163, blue: 104 }), // green
      Color.fromRgb({ red: 0, green: 102, blue: 255 }), // blue
      Color.fromRgb({ red: 175, green: 89, blue: 62 }), // brown
      BLACK,
      Color.fromRgb({ red: 255, green: 104, blue: 31 }), // orange
      Color.fromRgb({ red: 131, green: 89, blue: 163 }), // purple
      Color.fromRgb({ red: 252, green: 232, blue: 131 }), // yellow
    ],
  },
  {
    name: "Animal Crossing Designs",
    palette: [
      Color.fromRgb({ red: 255, green: 255, blue: 255 }),
      Color.fromRgb({ red: 136, green: 136, blue: 136 }),
      Color.fromRgb({ red: 0, green: 0, blue: 0 }),
      Color.fromRgb({ red: 255, green: 0, blue: 0 }),
      Color.fromRgb({ red: 255, green: 102, blue: 0 }),
      Color.fromRgb({ red: 255, green: 255, blue: 0 }),
      Color.fromRgb({ red: 34, green: 221, blue: 34 }),
      Color.fromRgb({ red: 0, green: 136, blue: 51 }),
      Color.fromRgb({ red: 0, green: 205, blue: 255 }),
      Color.fromRgb({ red: 16, green: 119, blue: 255 }),
      Color.fromRgb({ red: 0, green: 0, blue: 255 }),
      Color.fromRgb({ red: 204, green: 0, blue: 255 }),
      Color.fromRgb({ red: 255, green: 0, blue: 204 }),
      Color.fromRgb({ red: 255, green: 170, blue: 136 }),
      Color.fromRgb({ red: 153, green: 50, blue: 0 }),
    ],
  },
  {
    name: "Trans Pride",
    palette: [
      Color.fromRgb({ red: 91, green: 206, blue: 250 }),
      Color.fromRgb({ red: 245, green: 169, blue: 184 }),
      WHITE,
    ],
  },
  {
    name: "Virtual Boy",
    palette: [
      BLACK,
      Color.fromRgb({ red: 85, green: 0, blue: 0 }),
      Color.fromRgb({ red: 164, green: 0, blue: 0 }),
      Color.fromRgb({ red: 239, green: 0, blue: 0 }),
    ],
  },
  // per https://www.r-bloggers.com/2020/05/say-it-aint-so-using-weezer-album-cover-colours-in-r/
  {
    name: "Weezer",
    palette: [
      Color.fromRgb({ red: 24, green: 155, blue: 204 }), // blue
      Color.fromRgb({ red: 190, green: 204, blue: 65 }), // green
      Color.fromRgb({ red: 234, green: 33, blue: 58 }), // red
      Color.fromRgb({ red: 243, green: 243, blue: 243 }), // white
      Color.fromRgb({ red: 13, green: 13, blue: 13 }), // black
    ],
  },
  {
    name: "Mii Favorite Colors",
    palette: [
      Color.fromRgb({ red: 212, green: 29, blue: 15 }), // red
      Color.fromRgb({ red: 254, green: 112, blue: 23 }), // orange
      Color.fromRgb({ red: 255, green: 222, blue: 32 }), // yellow
      Color.fromRgb({ red: 121, green: 211, blue: 31 }), // lime green
      Color.fromRgb({ red: 0, green: 122, blue: 49 }), // green
      Color.fromRgb({ red: 7, green: 73, blue: 179 }), // blue
      Color.fromRgb({ red: 56, green: 169, blue: 222 }), // light blue
      Color.fromRgb({ red: 247, green: 89, blue: 123 }), // pink
      Color.fromRgb({ red: 113, green: 41, blue: 172 }), // purple
      Color.fromRgb({ red: 73, green: 57, blue: 23 }), // brown
      Color.fromRgb({ red: 230, green: 228, blue: 231 }), // white
      Color.fromRgb({ red: 23, green: 24, blue: 16 }), // black
    ],
  },
  {
    name: "MS Paint",
    palette: [
      Color.fromRgb({ red: 0, green: 0, blue: 0 }),
      Color.fromRgb({ red: 128, green: 128, blue: 128 }),
      Color.fromRgb({ red: 128, green: 0, blue: 0 }),
      Color.fromRgb({ red: 128, green: 128, blue: 0 }),
      Color.fromRgb({ red: 0, green: 128, blue: 0 }),
      Color.fromRgb({ red: 0, green: 128, blue: 128 }),
      Color.fromRgb({ red: 0, green: 0, blue: 128 }),
      Color.fromRgb({ red: 128, green: 0, blue: 128 }),
      Color.fromRgb({ red: 128, green: 128, blue: 64 }),
      Color.fromRgb({ red: 0, green: 64, blue: 64 }),
      Color.fromRgb({ red: 0, green: 128, blue: 255 }),
      Color.fromRgb({ red: 0, green: 64, blue: 128 }),
      Color.fromRgb({ red: 128, green: 0, blue: 255 }),
      Color.fromRgb({ red: 128, green: 64, blue: 0 }),
      Color.fromRgb({ red: 255, green: 255, blue: 255 }),
      Color.fromRgb({ red: 192, green: 192, blue: 192 }),
      Color.fromRgb({ red: 255, green: 0, blue: 0 }),
      Color.fromRgb({ red: 255, green: 255, blue: 0 }),
      Color.fromRgb({ red: 0, green: 255, blue: 0 }),
      Color.fromRgb({ red: 0, green: 255, blue: 255 }),
      Color.fromRgb({ red: 0, green: 0, blue: 255 }),
      Color.fromRgb({ red: 255, green: 0, blue: 255 }),
      Color.fromRgb({ red: 255, green: 255, blue: 128 }),
      Color.fromRgb({ red: 0, green: 255, blue: 128 }),
      Color.fromRgb({ red: 128, green: 255, blue: 255 }),
      Color.fromRgb({ red: 128, green: 128, blue: 255 }),
      Color.fromRgb({ red: 255, green: 0, blue: 128 }),
      Color.fromRgb({ red: 255, green: 128, blue: 64 }),
    ],
  },
];
