---
layout: "~/layouts/ProjectLayout.astro"
title: "Palette Posterizer"
projectComponentPath: "~/components/pages/projects/palettePosterizer"
description: "customizable image posterization"
---

the idea behind this project was to make a play on posterization with custom paletting. posterization works by rounding color values in the pixels of an image such that we're left with a smaller set of final colors used. the point of this project was to give users the ability to pick that smaller set of final colors (let's say a palette) and control over how the rounding happens.

we control the latter with two processes. first, a metric function defines the distance between two colors. the color in the palette that an image is closest to will be the color that that image pixel is rounded to. then, a reducer function defines what pixel color to render depending on the present image pixel color and the chosen color from the palette.

as always, if you end up using this and run into issues, let me know on [this website's github page](https://github.com/a1ts-a1t/alts-alt.neocities.org/issues).

happy posterizing!
