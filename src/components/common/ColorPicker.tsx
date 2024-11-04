import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Slider from './Slider';
import TextInput from './TextInput';
import { RgbColor, colorToHexString, colorToRgbString, hexStringToColor } from './colorUtils';

interface ColorPickerProps {
    initialColor: RgbColor;
    onPickColor: (color: RgbColor) => void;
    onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    initialColor,
    onPickColor,
    onClose,
}) => {
    const [ red, setRed ] = useState<number>(0);
    const [ green, setGreen ] = useState<number>(0);
    const [ blue, setBlue ] = useState<number>(0);

    const [ currentHexValue, setCurrentHexValue ] = useState<string>('');
    const [ hexValue, setHexValue ] = useState<string>('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current === null) {
            return;
        }

        const handleClick = (event: Event) => {
            if (!ref.current?.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        setRed(initialColor.red);
        setGreen(initialColor.green);
        setBlue(initialColor.blue);
        const hexString = colorToHexString(initialColor);
        setCurrentHexValue(hexString);
        setHexValue(hexString);
    }, [ initialColor ]);


    const handleHexInputInteractionEnd = (value: string) => {
        const color = hexStringToColor(value);
        
        if (color !== undefined) {
            setRed(color.red);
            setGreen(color.green);
            setBlue(color.blue);
            const newHexString = colorToHexString(color);
            setCurrentHexValue(newHexString);
            setHexValue(newHexString);
            return;
        }

        setCurrentHexValue(hexValue);
    };

    const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentHexValue(event.target.value);
    };

    useEffect(() => {
        setCurrentHexValue(colorToHexString({ red, green, blue }));
    }, [ red, green, blue ]);

    return (
        <div ref={ ref } className='bg-background text-text outline-text absolute bottom-0 z-10 flex w-80 flex-col gap-y-4 p-4 font-bold outline outline-2'>
            <div
                className='border-text h-12 w-full border-2 bg-clip-content p-2'
                style={ { backgroundColor: colorToRgbString({ red, green, blue}) } }
            />
            <div className='flex basis-4/6 flex-col gap-y-2'>
                <div className='flex flex-row justify-between'>
                    <Slider
                        min={ 0 }
                        max={ 255 }
                        id='red-slider'
                        step={ 1 }
                        value={ red }
                        containerStyle={ { width: '75%', height: '4px', margin: 'auto 0' } }
                        barStyle={ { background: `linear-gradient(90deg, ${colorToRgbString({ red: 0, green, blue })} 0%, ${colorToRgbString({ red: 255, green, blue})} 100%)`, cursor: 'pointer' } }
                        thumbStyle={ { height: '12px', width: '12px', aspectRatio: '1 / 1', maskImage: 'url("/static/icons/crosshair.svg")', maskRepeat: 'no-repeat', WebkitMaskImage: 'url("/static/icons/crosshair.svg")', WebkitMaskRepeat: 'no-repeat', top: '-4px' } }
                        onChange={ (value) => setRed(value) }
                    />
                    <label htmlFor='red-slider'>Red</label>
                </div>
                <div className='flex flex-row justify-between'>
                    <Slider
                        min={ 0 }
                        max={ 255 }
                        id='green-slider'
                        step={ 1 }
                        value={ green }
                        containerStyle={ { width: '75%', height: '4px', margin: 'auto 0' } }
                        barStyle={ { background: `linear-gradient(90deg, ${colorToRgbString({ red, green: 0, blue })} 0%, ${colorToRgbString({ red, green: 255, blue})} 100%)`, cursor: 'pointer' } }
                        thumbStyle={ { height: '12px', width: '12px', aspectRatio: '1 / 1', maskImage: 'url("/static/icons/crosshair.svg")', maskRepeat: 'no-repeat', WebkitMaskImage: 'url("/static/icons/crosshair.svg")', WebkitMaskRepeat: 'no-repeat', top: '-4px' } }
                        onChange={ (value) => setGreen(value) }
                    />
                    <label htmlFor='green-slider'>Green</label>
                </div>
                <div className='flex flex-row justify-between'>
                    <Slider
                        min={ 0 }
                        max={ 255 }
                        id='blue-slider'
                        step={ 1 }
                        value={ blue }
                        containerStyle={ { width: '75%', height: '4px', margin: 'auto 0' } }
                        barStyle={ { background: `linear-gradient(90deg, ${colorToRgbString({ red, green, blue: 0 })} 0%, ${colorToRgbString({ red, green, blue: 255 })} 100%)`, cursor: 'pointer' } }
                        thumbStyle={ { height: '12px', width: '12px', aspectRatio: '1 / 1', maskImage: 'url("/static/icons/crosshair.svg")', maskRepeat: 'no-repeat', WebkitMaskImage: 'url("/static/icons/crosshair.svg")', WebkitMaskRepeat: 'no-repeat', top: '-4px' } }
                        onChange={ (value) => setBlue(value) }
                    />
                    <label htmlFor='blue-slider'>Blue</label>
                </div>
                <div className='flex flex-row justify-between gap-x-2'>
                    <div className='flex w-9/12 flex-row align-baseline'>
                        <div className='border-text h-full w-5 border-2 border-r-0 text-center'>#</div>
                        <TextInput
                            id='hex-input'
                            className='bg-background border-text grow border-2 border-l-0 pr-2 text-right font-normal'
                            onInputInteractionEnd={ handleHexInputInteractionEnd }
                            value={ currentHexValue }
                            onChange={ handleHexChange }
                        />
                    </div>
                    <label htmlFor='hex-input'>Hex</label>
                </div>
            </div>
            <div className='flex flex-row justify-between gap-x-2'>
                <button className='text-disabled hover:underline hover:underline-offset-2' onClick={ onClose }>Cancel</button>
                <button className='text-enabled hover:underline hover:underline-offset-2' onClick={ () => onPickColor({ red, green, blue }) }>Set Color</button>
            </div>
        </div>
    );
};

export default ColorPicker;

