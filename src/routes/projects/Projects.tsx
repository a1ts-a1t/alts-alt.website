import React, { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import Chatbox from '../../components/home/Chatbox';
import Window from '../../components/common/Window';
import ImageSuspense from '../../components/common/ImageSuspense';
import { DarkModeContext } from '../../components/contexts';
import { useTitle } from '../../hooks';

const Projects: React.FC = () => {

    const isDarkMode = useContext(DarkModeContext);
    const dateString = useMemo(() => (new Date()).toUTCString(), []);

    useTitle('alts-alt | Projects');

    return (
        <div className='flex w-full flex-col gap-y-6'>
            <div className='flex h-9 w-full items-center justify-center text-center'>
                <div className='text-disabled'>{ dateString }</div>
            </div>
            <Chatbox content={ <span className='text-secondary'>joined the room</span> } />
            <Chatbox content={ 'here’s some stuff i\'ve worked on in my free time' } />
            <Chatbox content='check it out !!' />
            <div className='flex flex-col gap-4 md:grid md:grid-cols-2'>
                <Window
                    title='Pixel SVG Maker'
                    optionsBar='A web app for exporting pixel art to SVG'
                    controlButtons={ [
                        <Link to='/projects/pixel-svg-maker' key='pixel-svg-link'>
                            <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                        </Link>,
                    ] }
                >
                    <Link to='/projects/pixel-svg-maker' className='h-64'>
                        <ImageSuspense
                            src={
                                isDarkMode
                                    ? '/static/images/project-previews/pixel-svg-maker-preview-dark.png'
                                    : '/static/images/project-previews/pixel-svg-maker-preview.png'
                            }
                            alt='Pixel SVG Maker preview'
                            className='size-full object-cover object-top'
                        />
                    </Link>
                </Window>
                <Window
                    title='Palette Posterizer'
                    optionsBar='A web app for customizable posterization'
                    controlButtons={ [
                        <Link to='/projects/palette-posterizer' key='palette-posterizer-link'>
                            <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                        </Link>,
                    ] }
                >
                    <Link to='/projects/palette-posterizer' className='h-64'>
                        <ImageSuspense
                            src={
                                isDarkMode
                                    ? '/static/images/project-previews/palette-posterization-preview-dark.png'
                                    : '/static/images/project-previews/palette-posterization-preview.png'
                            }
                            alt='Palette Posterizer preview'
                            className='size-full object-cover object-center'
                        />
                    </Link>
                </Window>
            </div>
        </div>
    );
};

export default Projects;

