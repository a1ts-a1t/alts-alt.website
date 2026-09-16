export class Color {
  red: number;
  green: number;
  blue: number;

  private constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  public static fromRgb(rgb: {
    red: number;
    green: number;
    blue: number;
  }): Color {
    const { red, green, blue } = rgb;
    return new Color(red, green, blue);
  }

  public static fromHexString(hexString: string): Color {
    const hexDigits = hexString.replace(/^#/, "");
    const expanded =
      hexDigits.length === 3
        ? [...hexDigits].map((digit) => digit.repeat(2)).join("")
        : hexDigits;
    const red = parseInt(expanded.slice(0, 2), 16);
    const green = parseInt(expanded.slice(2, 4), 16);
    const blue = parseInt(expanded.slice(4, 6), 16);
    return new Color(red, green, blue);
  }

  public asHexString(): string {
    const { red, green, blue } = this;
    return `#${[red, green, blue]
      .map((channel) => channel.toString(16).padStart(2, "0"))
      .join("")}`;
  }

  public asRgbString(): string {
    const { red, green, blue } = this;
    return `rgb(${red} ${green} ${blue})`;
  }
}
