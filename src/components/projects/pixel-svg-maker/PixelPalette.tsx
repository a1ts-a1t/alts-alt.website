import React, { useState } from 'react';
import ColorPicker from '../../common/ColorPicker';
import { RgbColor, colorToRgbString } from '../../common/colorUtils';

const DEFAULT_COLOR_QUEUE_LENGTH = 12;

interface PixelPaletteProps {
    currentColor: RgbColor | undefined;
    colorQueue: Array<RgbColor | undefined>;
    onPickColor: (color: RgbColor) => void;
}

const PixelPalette: React.FC<PixelPaletteProps> = ({
    currentColor,
    colorQueue,
    onPickColor,
}: PixelPaletteProps) => {
    const [ isColorPickerOpen, setIsColorPickerOpen ] = useState<boolean>(false);

    if (currentColor === undefined) {
        return (<></>);
    }

    const handlePickColor = (color: RgbColor | undefined) => {
        if (color === undefined) {
            return;
        }

        setIsColorPickerOpen(false);
        onPickColor(color);
    };

    return (
        <div className='flex w-full flex-col gap-y-1'>
            <div
                className='border-text aspect-square h-12 w-full cursor-pointer border-2'
                style={ { backgroundColor: colorToRgbString(currentColor)} }
                onClick={ () => setIsColorPickerOpen(true) }
            />
            <div className='flex w-full flex-row gap-x-1'>
                { colorQueue.map((val, idx) => (
                    <div
                        key={ `${val === undefined ? 'empty' : colorToRgbString(val)}-${idx}` }
                        className='border-text h-6 border-2 sm:h-12'
                        style={ { 
                            backgroundColor: val === undefined ? 'rgba(0, 0, 0, 0%)' : colorToRgbString(val),
                            width: `${100/DEFAULT_COLOR_QUEUE_LENGTH}%`,
                        } }
                        onClick={ () => handlePickColor(val) }
                    />
                )).filter((_, idx) => idx < DEFAULT_COLOR_QUEUE_LENGTH) }
            </div>
            { isColorPickerOpen
                ? (
                    <ColorPicker
                        initialColor={ currentColor }
                        onPickColor={ handlePickColor }
                        onClose={ () => setIsColorPickerOpen(false) }
                    />
                ) : (<></>) }
        </div>
    );
};

export default PixelPalette;

