import React from 'react';
import PalettePosterization from '../../components/projects/palette-posterization/PalettePosterization';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks';

const PalettePosterizationPage: React.FC = () => {
    useTitle('alts-alt | Palette Posterization');

    return (
        <div className='flex w-full flex-col gap-y-8'>
            <PalettePosterization />
            <div className='w-full text-center'>~~~</div>
            <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-secondary text-2xl'>What is this?</h2>
                <p>The idea behind this project was to make a play on posterization with custom paletting. Posterization works by rounding color values in the pixels of an image such that we&apos;re left with a smaller set of final colors used. The point of this project was to give users the ability to pick that smaller set of final colors (let&apos;s say a palette) and control over how the rounding happens.</p>
                <p>We control the later with two processes. First, a metric function defines the distance between two colors. The color in the palette that an image is closest to will be the color that that image pixel is rounded to. Then, a reducer function defines what pixel color to render depending on the present image pixel color and the chosen color from the palette.</p>
                <p>As always, if you end up using this and run into issues, let me know on <Link className='text-enabled hover:underline hover:underline-offset-2' target='_blank' rel='noopener noreferrer' to='https://github.com/a1ts-a1t/alts-alt.neocities.org/issues'>github</Link>.</p>
                <p>Happy posterizing!</p>
            </div>
        </div>
    );
};

export default PalettePosterizationPage;

