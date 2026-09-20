---
layout: "~/layouts/ProjectLayout.astro"
title: "Palette Posterizer"
projectComponentPath: "~/components/pages/projects/palettePosterizer"
---

The idea behind this project was to make a play on posterization with custom paletting. Posterization works by rounding color values in the pixels of an image such that we’re left with a smaller set of final colors used. The point of this project was to give users the ability to pick that smaller set of final colors (let’s say a palette) and control over how the rounding happens.

We control the latter with two processes. First, a metric function defines the distance between two colors. The color in the palette that an image is closest to will be the color that that image pixel is rounded to. Then, a reducer function defines what pixel color to render depending on the present image pixel color and the chosen color from the palette.

As always, if you end up using this and run into issues, let me know on [this website’s GitHub page](https://github.com/a1ts-a1t/alts-alt.neocities.org/issues).

Happy posterizing!
