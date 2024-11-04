uniform sampler2D mixbox_lut;

vec3 mixbox_eval_polynomial(vec3 c)
{
  float c0 = c[0];
  float c1 = c[1];
  float c2 = c[2];
  float c3 = 1.0 - (c0 + c1 + c2);

  float c00 = c0 * c0;
  float c11 = c1 * c1;
  float c22 = c2 * c2;
  float c01 = c0 * c1;
  float c02 = c0 * c2;
  float c12 = c1 * c2;
  float c33 = c3 * c3;

  return (c0*c00) * vec3(+0.07717053, +0.02826978, +0.24832992) +
         (c1*c11) * vec3(+0.95912302, +0.80256528, +0.03561839) +
         (c2*c22) * vec3(+0.74683774, +0.04868586, +0.00000000) +
         (c3*c33) * vec3(+0.99518138, +0.99978149, +0.99704802) +
         (c00*c1) * vec3(+0.04819146, +0.83363781, +0.32515377) +
         (c01*c1) * vec3(-0.68146950, +1.46107803, +1.06980936) +
         (c00*c2) * vec3(+0.27058419, -0.15324870, +1.98735057) +
         (c02*c2) * vec3(+0.80478189, +0.67093710, +0.18424500) +
         (c00*c3) * vec3(-0.35031003, +1.37855826, +3.68865000) +
         (c0*c33) * vec3(+1.05128046, +1.97815239, +2.82989073) +
         (c11*c2) * vec3(+3.21607125, +0.81270228, +1.03384539) +
         (c1*c22) * vec3(+2.78893374, +0.41565549, -0.04487295) +
         (c11*c3) * vec3(+3.02162577, +2.55374103, +0.32766114) +
         (c1*c33) * vec3(+2.95124691, +2.81201112, +1.17578442) +
         (c22*c3) * vec3(+2.82677043, +0.79933038, +1.81715262) +
         (c2*c33) * vec3(+2.99691099, +1.22593053, +1.80653661) +
         (c01*c2) * vec3(+1.87394106, +2.05027182, -0.29835996) +
         (c01*c3) * vec3(+2.56609566, +7.03428198, +0.62575374) +
         (c02*c3) * vec3(+4.08329484, -1.40408358, +2.14995522) +
         (c12*c3) * vec3(+6.00078678, +2.55552042, +1.90739502);
}

float mixbox_srgb_to_linear(float x)
{
  return (x >= 0.04045) ? pow((x + 0.055) / 1.055, 2.4) : x/12.92;
}

float mixbox_linear_to_srgb(float x)
{
  return (x >= 0.0031308) ? 1.055*pow(x, 1.0/2.4) - 0.055 : 12.92*x;
}

vec3 mixbox_srgb_to_linear(vec3 rgb)
{
  return vec3(mixbox_srgb_to_linear(rgb.r),
              mixbox_srgb_to_linear(rgb.g),
              mixbox_srgb_to_linear(rgb.b));
}

vec3 mixbox_linear_to_srgb(vec3 rgb)
{
  return vec3(mixbox_linear_to_srgb(rgb.r),
              mixbox_linear_to_srgb(rgb.g),
              mixbox_linear_to_srgb(rgb.b));
}

mat3 mixbox_rgb_to_latent(vec3 rgb)
{
  rgb = clamp(rgb, 0.0, 1.0);

  float x = rgb.r * 63.0;
  float y = rgb.g * 63.0;
  float z = rgb.b * 63.0;

  float iz = floor(z);

  float x0 = mod(iz, 8.0) * 64.0;
  float y0 = floor(iz / 8.0) * 64.0;

  float x1 = mod(iz + 1.0, 8.0) * 64.0;
  float y1 = floor((iz + 1.0) / 8.0) * 64.0;

  vec2 uv0 = vec2(x0 + x + 0.5, y0 + y + 0.5) / 512.0;
  vec2 uv1 = vec2(x1 + x + 0.5, y1 + y + 0.5) / 512.0;

  if (texture2D(mixbox_lut, vec2(0.5, 0.5) / 512.0).b < 0.1)
  {
    uv0.y = 1.0 - uv0.y;
    uv1.y = 1.0 - uv1.y;
  }

  vec3 c = mix(texture2D(mixbox_lut, uv0).rgb, texture2D(mixbox_lut, uv1).rgb, z - iz);

  return mat3(c, rgb - mixbox_eval_polynomial(c), vec3(0.0));
}

vec3 mixbox_latent_to_rgb(mat3 latent)
{
  vec3 rgb = clamp(mixbox_eval_polynomial(latent[0]) + latent[1], 0.0, 1.0);
  return rgb;
}

vec3 mixbox_lerp(vec3 color1, vec3 color2, float t)
{
  return mixbox_latent_to_rgb((1.0-t)*mixbox_rgb_to_latent(color1) + t*mixbox_rgb_to_latent(color2));
}

vec4 mixbox_lerp(vec4 color1, vec4 color2, float t)
{
  return vec4(mixbox_lerp(color1.rgb, color2.rgb, t), mix(color1.a, color2.a, t));
}

vec4 reducer(in vec4 textureColor, in vec4 paletteColor)
{
    return mixbox_lerp(textureColor, paletteColor, 0.5);
}
