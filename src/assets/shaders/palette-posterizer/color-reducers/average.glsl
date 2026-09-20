vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    return vec4((textureColor + paletteColor) / 2.0);
}
