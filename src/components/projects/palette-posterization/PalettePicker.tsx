import React, { useState } from 'react';
import ColorPicker from '../../common/ColorPicker';
import { BLACK, RgbColor, colorToHexString } from '../../common/colorUtils';
import Dropdown from '../../common/Dropdown';
import DefaultPaletteOption, { DEFAULT_PALETTE_OPTIONS } from './DefaultPaletteOption';

interface PalettePickerProps {
    /** the current palette */
    palette: RgbColor[];
    /** handler for palette changes. arg is the new palette) */
    onPaletteChange: (palette: RgbColor[]) => void;
}

const PalettePicker: React.FC<PalettePickerProps> = ({
    palette,
    onPaletteChange,
}: PalettePickerProps) => {
    const [ currentOpenPickerIndex, setCurrentOpenPickerIndex ] = useState<number | undefined>(undefined);

    const handlePickColor = (color: RgbColor, paletteIndex: number) => {
        const newPalette = palette.map((oldPaletteColor, oldPaletteIndex) => {
            if (paletteIndex === oldPaletteIndex) {
                return color;
            }
            return { ...oldPaletteColor };
        });
        setCurrentOpenPickerIndex(undefined);
        onPaletteChange(newPalette);
    };

    const handleRemoveColor = (paletteIndex: number) => {
        const newPalette = palette.map(color => ({ ...color }));
        newPalette.splice(paletteIndex, 1);
        onPaletteChange(newPalette);
    };

    const paletteElements = palette.map((color, paletteIndex) => (
        <div key={ `palette-picker-${paletteIndex}` } className='w-fit pt-2' >
            <div className='relative'>
                <div 
                    className='border-text size-10 border-2 hover:cursor-pointer'
                    style={ { backgroundColor: `#${colorToHexString(color)}` } }
                    onClick={ () => setCurrentOpenPickerIndex(paletteIndex) }
                    aria-description='Change color'
                    title='Change color'
                />
                <div
                    className='bg-background border-text absolute -right-1 -top-1 flex size-5 border-2 hover:cursor-pointer'
                    onClick={ () => handleRemoveColor(paletteIndex) }
                    aria-description='Remove color'
                    title='Remove color'
                >
                    <div className='bg-text m-auto size-2 bg-clip-[url(/static/icons/crosshair.svg)]' />
                </div>
            </div>
            { paletteIndex === currentOpenPickerIndex && (
                <ColorPicker
                    onPickColor={ (color) => handlePickColor(color, paletteIndex) }
                    initialColor={ color }
                    onClose={ () => setCurrentOpenPickerIndex(undefined) }
                />
            ) }
        </div>
    ));

    const newColorElement = (
        <div key='palette-picker-new' className='w-full pt-2 sm:w-fit' >
            <div
                className='border-text h-10 w-full border-2 hover:cursor-pointer sm:size-10'
                aria-description='Add a new color'
                title='Add a new color'
                onClick={ () => setCurrentOpenPickerIndex(-1) }
            >
                <div className='bg-text m-auto h-full w-4 bg-clip-[url(/static/icons/add.svg)]' aria-hidden={ true }/>
            </div>
            { currentOpenPickerIndex === -1 && (
                <ColorPicker
                    onPickColor={ (newColor) => {
                        onPaletteChange([ ...palette.map((color) => ({ ...color })), newColor ]);
                        setCurrentOpenPickerIndex(undefined);
                    } }
                    initialColor={ BLACK }
                    onClose={ () => setCurrentOpenPickerIndex(undefined) }
                />
            ) }
        </div>
    );

    const defaultPalettesDropdownElement = (
        <Dropdown 
            id={ 'default-palettes-dropdown' }
            toggleElement={ (
                <div
                    className='border-text h-10 w-full border-2 hover:cursor-pointer sm:size-10'
                    aria-description='Choose from default palettes'
                    title='Choose from default palettes'
                >
                    <div className='bg-text m-auto h-full w-4 bg-clip-[url(/static/icons/dropdown.svg)]' aria-hidden={ true }/>
                </div>
            ) }
            menuOpenToggleElement={ (
                <div
                    className='border-text h-10 w-full border-2 hover:cursor-pointer sm:size-10'
                    aria-description='Close default palettes menu'
                    title='Close default palettes menu'
                >
                    <div className='bg-text m-auto h-full w-4 bg-clip-[url(/static/icons/dropdown-open.svg)]' aria-hidden={ true }/>
                </div>
            ) }
            containerClassName='relative'
            menuClassName='bg-background border-text left-0 z-50 my-2 flex flex-col space-y-0 border-2 border-dotted max-h-128 overflow-y-auto'
        >
            { DEFAULT_PALETTE_OPTIONS.map(({ name, palette }) => (
                <DefaultPaletteOption
                    name={ name }
                    palette={ palette }
                    onClick={ () => onPaletteChange(palette) }
                    key={ `default-palette-option-${name}` }
                />
            )) }
        </Dropdown>
    );

    return (
        <div className='relative flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
            <div className='pt-2'>{ defaultPalettesDropdownElement }</div>
            { newColorElement }
            <div className='flex w-full flex-row space-x-2 space-y-0 overflow-x-auto'>
                { paletteElements }
            </div>
        </div>
    );
};

export default PalettePicker;

