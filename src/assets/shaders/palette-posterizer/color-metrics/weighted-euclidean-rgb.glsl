float metric(in vec4 color1, in vec4 color2)
{
    float redMean = (color1.r + color2.r) / 2.0;
    vec4 diff = color1 - color2;
    vec3 squaredDiff = vec3(diff.r * diff.r, diff.g * diff.g, diff.b * diff.b);
    vec3 weightedDiff = vec3((2.0 + redMean / 256.0) * squaredDiff.r, 4.0 * squaredDiff.g, (2.0 + (255.0 - redMean) / 256.0) * squaredDiff.b);
    return weightedDiff.r + weightedDiff.g + weightedDiff.b;
}
