import React from 'react';
import { Mode } from './utils';

interface PixelSvgMakerControlsProps {
    mode: Mode;
    onPencilButtonClick: () => void;
    onEraserButtonClick: () => void;
    onUndo: () => void;
    svgString: string;
}

const PixelSvgMakerControls: React.FC<PixelSvgMakerControlsProps> = ({
    mode,
    onPencilButtonClick,
    onEraserButtonClick,
    onUndo,
    svgString,
}: PixelSvgMakerControlsProps) => {
    return (

        <div className='flex flex-row flex-wrap justify-between'>
            <div className='flex max-w-1/5 flex-row gap-x-2'>
                <button
                    className='outline-primary size-10 max-w-1/2 p-1 outline'
                    onClick={ onPencilButtonClick }
                    style={ { outlineWidth: mode === Mode.PENCIL ? '2px' : '0px' } }
                >
                    <div
                        aria-description='Pencil mode'
                        title='Pencil mode'
                        className='bg-text m-auto size-5 bg-clip-[url(/static/icons/pencil.svg)]'
                    />
                </button>
                <button
                    className='outline-primary size-10 max-w-1/2 p-1 outline'
                    onClick={ onEraserButtonClick }
                    style={ { outlineWidth: mode === Mode.ERASER ? '2px' : '0px' } }
                >
                    <div
                        aria-description='Eraser mode'
                        title='Eraser mode'
                        className='bg-text m-auto size-5 bg-clip-[url(/static/icons/eraser.svg)]'
                    />
                </button>
                <button
                    className='size-10 max-w-1/2 p-1'
                    onClick={ onUndo }
                >
                    <div
                        aria-description='Undo'
                        title='Undo'
                        className='bg-text m-auto size-5 bg-clip-[url(/static/icons/undo.svg)]'
                    />
                </button>
            </div>
            <div className='flex max-w-1/5 flex-row gap-x-2'>
                <a
                    href={ URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' })) }
                    download='pixel-art.svg'
                    className='outline-enabled flex size-10 max-w-1/2 items-center justify-center p-1 outline outline-2'
                >
                    <div
                        aria-description='Download pixel art as SVG'
                        title='Download pixel art as SVG'
                        className='bg-text m-auto size-5 bg-clip-[url(/static/icons/download.svg)]'
                    />
                </a>
                <button
                    onClick={ () => navigator.clipboard.writeText(svgString) }
                    className='outline-enabled flex size-10 max-w-1/2 items-center justify-center p-1 outline outline-2'
                >
                    <div
                        aria-description='Copy pixel art to clipboard'
                        title='Copy pixel art to clipboard'
                        className='bg-text m-auto size-5 bg-clip-[url(/static/icons/clipboard.svg)]'
                    />
                </button>
            </div>
        </div>
    );
};

export default PixelSvgMakerControls;

