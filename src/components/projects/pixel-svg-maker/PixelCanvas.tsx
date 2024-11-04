import React, { useEffect, useRef, useState } from 'react';
import { RgbColor, colorToRgbString } from '../../common/colorUtils';

interface PixelCanvasProps {
    /**
     * the number of pixels on each side
     */
    pixelsPerSide: number;
    /**
     * the array of pixels that make up what's in the grid
     */
    pixelArray: Array<Array<RgbColor | undefined>>;
    /**
     * callback handler for clicking on a pixel, defined by the x/y coords
     * of the pixel clicked with respect to the current grid view window bounds
     */
    onPixelClick: (x: number, y: number) => void;
    /**
     * callback handler for finishing a draw
     */
    onDrawEnd: () => void;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({
    pixelsPerSide,
    pixelArray,
    onPixelClick,
    onDrawEnd,
}: PixelCanvasProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ containerWidth, setContainerWidth ] = useState<number | undefined>(undefined);
    const [ isMouseDown, setIsMouseDown ] = useState<boolean>(false);

    const resizeObserver = new ResizeObserver((entries) => {
        const resizedElement = entries.at(0);
        if (resizedElement === undefined) {
            return;
        }

        if (resizedElement.contentRect) {
            setContainerWidth(resizedElement.contentRect.width);
        }
    });

    const setCanvasSize = (canvas: HTMLCanvasElement): void => {
        if (containerWidth === undefined) {
            return;
        }

        canvas.width = containerWidth;
        canvas.height = containerWidth;
    };

    const renderPixels = (context: CanvasRenderingContext2D): void => {
        const pixelSideLength = context.canvas.width / pixelsPerSide;
        for (let x = 0; x < pixelsPerSide; x++) {
            for (let y = 0; y < pixelsPerSide; y++) {
                const color = pixelArray.at(y)?.at(x);
                if (color === undefined) {
                    (x + y) % 2 === 0 ? context.fillStyle = '#eaeaea' : context.fillStyle = '#dadada';
                    context.fillRect(x * pixelSideLength, y * pixelSideLength, pixelSideLength, pixelSideLength);
                    continue;
                }
                context.fillStyle = colorToRgbString(color);
                context.fillRect(x * pixelSideLength, y * pixelSideLength, pixelSideLength, pixelSideLength);
            }
        };
    };

    // subscribe to resize observer
    useEffect(() => {
        const containerElement = containerRef.current;
        if (containerElement === null) {
            return;
        }
        resizeObserver.observe(containerElement);
        return () => resizeObserver.unobserve(containerElement);
    }, []);

    // render grid and array when container size changes, or pixel dimensions change
    useEffect(() => {
        const canvasContext = canvasRef.current?.getContext('2d');
        if (canvasContext === null || canvasContext === undefined || containerWidth === undefined) {
            return;
        }

        setCanvasSize(canvasContext.canvas);
        renderPixels(canvasContext);

    }, [ pixelsPerSide, containerWidth, pixelArray ]);

    const drawPixel= (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (canvas === null) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;

        const pixelSideLength = canvas.width / pixelsPerSide;
        const pixelX = Math.floor(clickX / pixelSideLength);
        const pixelY = Math.floor(clickY / pixelSideLength);

        onPixelClick(pixelX, pixelY);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsMouseDown(true);
        drawPixel(event.clientX, event.clientY);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
        const touch = event.touches.item(0);
        setIsMouseDown(true);
        drawPixel(touch.clientX, touch.clientY);
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isMouseDown) {
            return;
        }
        drawPixel(event.clientX, event.clientY);
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
        const touch = event.touches.item(0);
        if (!isMouseDown) {
            return;
        }
        drawPixel(touch.clientX, touch.clientY);
    };
    
    const handleDrawEnd = () => {
        setIsMouseDown(false);
        onDrawEnd();
    };

    return (
        <div ref={ containerRef } className='flex aspect-square h-full items-center justify-center'>
            <canvas
                className='touch-none'
                ref={ canvasRef }
                onMouseDown={ handleMouseDown }
                onTouchStart={ handleTouchStart }
                onMouseMove={ handleMouseOver }
                onTouchMove={ handleTouchEnd }
                onMouseUp={ handleDrawEnd }
                onTouchEnd={ handleDrawEnd }
            />
        </div>
    );
};

export default PixelCanvas;

