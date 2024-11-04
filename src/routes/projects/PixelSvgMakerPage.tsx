import React from 'react';
import PixelSvgMaker from '../../components/projects/pixel-svg-maker/PixelSvgMaker';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks';

const PixelSvgMakerPage: React.FC = () => {
    useTitle('alts-alt | Pixel SVG Maker');

    return (
        <div className='flex w-full flex-col gap-y-8'>
            <PixelSvgMaker />
            <div className='w-full text-center'>~~~</div>
            <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-secondary text-2xl'>What is this?</h2>
                <p>While making this website, I&apos;ve been trying to make all my own pixel art icons. In an attempt to keep asset bundle size small while keeping resolution high, I wanted to make all my icons SVGs. (Let&apos;s ignore the fact that having them be icons means that they can be lower resolution and whatever.) Looking online, I had a hard time finding a pixel art engine that let you export to SVG, so I decided to make one on my own.</p>
                <p>This is not meant to be a fully featured pixel art engine by any stretch of the imagination, but it provides just enough functionality for me to at least make my icons way faster than I did before. If it happens to be something that is useful to you, that&apos;s fantastic! If it ends up being so useful to you that you get annoyed at how few features there are, I encourage you to create a feature request on <Link className='text-enabled hover:underline hover:underline-offset-2' target='_blank' rel='noopener noreferrer' to='https://twitter.com/alts_alt_'>twitter</Link>.</p>
                <p>Happy pixel art-ing!</p>
            </div>
        </div>
    );
};

export default PixelSvgMakerPage;

