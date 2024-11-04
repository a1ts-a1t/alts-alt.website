type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;

/**
 * Loads shaders of the given type into the given gl context
 * @param gl the webgl rendering context
 * @param type the type of shader, either gl.FRAGMENT_SHADER or gl.VERTEX_SHADER
 * @param source the string representation of the shader
 * @returns the shader or undefined if there was an error
 */
export const loadShader = (
    gl: WebGLContext,
    type: number,
    source: string,
) => {
    const shader = gl.createShader(type);

    if (shader === null) {
        return undefined;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return undefined;
    }

    return shader;
};

/**
 * Creates a webgl shader program
 * @param gl the webgl rendering context
 * @param vertexShaderSource the string representation of the vertex shader
 * @param fragmentShaderSource the string representation of the fragment shader
 * @returns the program or undefined if there was an error
 */
export const initProgram = (
    gl: WebGLContext,
    vertexShaderSource: string, 
    fragmentShaderSource: string,
) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (vertexShader === undefined || fragmentShader === undefined) {
        return undefined;
    }

    const program = gl.createProgram();

    if (program === null) {
        return undefined;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return undefined;
    }

    return program;
};

/**
 * Create a dummy texture
 * @param gl the webgl rendering context
 * @returns the texture or undefined if there was an error
 */
export const initTexture = (gl: WebGLContext) => {
    const texture = gl.createTexture();

    if (texture === null) {
        return undefined;
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // load in a dummy texture
    gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA, // internalFormat
        1, // width
        1, // height
        0, // border
        gl.RGBA, // srcFormat
        gl.UNSIGNED_BYTE, // srcType
        new Uint8Array([ 0, 0, 0, 0 ]), // source, a single clear pixel
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    return texture;
};

/**
 * Set the source of a texture
 * @param gl the webgl rendering context
 * @param texture the initialized webgl texture (created with {@link initTexture} perhaps)
 * @param source the source of the texture (eg image, video, etc)
 */
export const setTexture = (gl: WebGLContext, texture: WebGLTexture, source: TexImageSource) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0, // level
        gl.RGBA, // internalFormat
        gl.RGBA, // srcFormat
        gl.UNSIGNED_BYTE, // srcType
        source,
    );
};

/**
 * Initialize an array buffer
 * @param gl the webgl rendering context
 * @param srcData the data to put into the buffer
 * @returns the initialized buffer
 */
export const initArrayBuffer = (gl: WebGLContext, srcData: AllowSharedBufferSource) => {
    const buffer = gl.createBuffer();

    if (buffer === null) {
        return undefined;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, srcData, gl.STATIC_DRAW);
    return buffer;
};

/**
 * Set an attribute to an array buffer
 * @param gl the webgl rendering context
 * @param buffer the buffer to set the attribute to
 * @param attributeLocation the location of the attribute (from gl.getAttributeLocation(...))
 * @param num the number of data values per attribute value {@default 2}
 */
export const setAttributeToArrayBuffer = (
    gl: WebGLContext, 
    buffer: WebGLBuffer,
    attributeLocation: number,
    num: number = 2,
) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(
        attributeLocation, // attribute location
        num, // number of data values per attribute value
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0, // offset
    );
    gl.enableVertexAttribArray(attributeLocation);
};

/**
 * Clears the frame to draw new renders on
 * @param gl the webgl rendering context
 */
export const clearFrame = (gl: WebGLContext) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // clear to black
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

