declare module "mixbox" {
  interface Mixbox {
    lutTexture(gl: WebGL2RenderingContext): WebGLTexture;
  }

  const mixbox: Mixbox;
  export default mixbox;
}
