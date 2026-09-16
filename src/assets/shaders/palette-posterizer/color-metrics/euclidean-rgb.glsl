float metric(in vec4 color1, in vec4 color2)
{
    vec4 diff = color1 - color2;
    return diff.r * diff.r + diff.g * diff.g + diff.b * diff.b;
}
