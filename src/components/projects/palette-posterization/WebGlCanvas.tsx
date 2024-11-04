import React, { useEffect, useRef } from 'react';
import { RgbColor } from '../../common/colorUtils';
import { initArrayBuffer, initProgram, initTexture, setAttributeToArrayBuffer, setTexture } from '../../common/webglUtils';
import { ColorMetricType, getFragmentShader, ColorReducerType } from './utils';
import vertexShaderSource from './shaders/vertex-shader.glsl';
import mixbox from 'mixbox';

interface WebGlCanvasProps {
    image: HTMLImageElement | undefined;
    palette: RgbColor[];
    colorMetric: ColorMetricType;
    colorReducer: ColorReducerType;
}

const WebGlCanvas: React.FC<WebGlCanvasProps> = ({
    image,
    palette,
    colorMetric,
    colorReducer,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas?.getContext('webgl2') ?? undefined;

        if (canvas === null || gl === undefined || image === undefined) {
            return;
        }

        const program = initProgram(gl, vertexShaderSource, getFragmentShader(colorMetric, colorReducer));
        if (program === undefined) {
            console.error('Program could not be initialized.');
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(devicePixelRatio * canvas.clientWidth);
        canvas.height = Math.floor(devicePixelRatio * canvas.clientWidth * image.height / image.width);

        const positionBuffer = initArrayBuffer(
            gl,
            new Float32Array([
                0.0, 0.0,
                canvas.width, 0.0,
                0.0, canvas.height,
                0.0, canvas.height,
                canvas.width, 0.0,
                canvas.width, canvas.height,
            ]),
        );
            
        const texCoordBuffer = initArrayBuffer(
            gl,
            new Float32Array([
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                0.0, 1.0,
                1.0, 0.0,
                1.0, 1.0,
            ]),
        );

        if (positionBuffer === undefined || texCoordBuffer === undefined) {
            console.error('Buffers could not be initialized.');
            return;
        }

        const texture = initTexture(gl);
        if (texture === undefined) {
            console.error('Texture could not be initialized.');
            return;
        }

        setTexture(gl, texture, image);
        
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);

        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

        const paletteBufferData = palette.flatMap(
            (color) => [ color.red / 255, color.green / 255, color.blue / 255, 1 ],
        );
        paletteBufferData.push(...((new Array((64 - palette.length) * 4)).fill(0))); // pad with 0s
        const paletteLocation = gl.getUniformLocation(program, 'u_palette');
        gl.uniform4fv(paletteLocation, paletteBufferData);

        const paletteSizeLocation = gl.getUniformLocation(program, 'u_paletteSize');
        gl.uniform1i(paletteSizeLocation, palette.length);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        setAttributeToArrayBuffer(gl, positionBuffer, positionLocation);

        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        setAttributeToArrayBuffer(gl, texCoordBuffer, texCoordLocation);

        if (colorReducer === ColorReducerType.MIXBOX) {
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, mixbox.lutTexture(gl));
            gl.uniform1i(gl.getUniformLocation(program, 'mixbox_lut'), 0);
        }

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }, [ image, palette, colorMetric, colorReducer ]);

    if (image === undefined) {
        return (
            <></>
        );
    }

    return (
        <canvas ref={ canvasRef } />
    );
};

export default WebGlCanvas;
