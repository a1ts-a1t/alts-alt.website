import React, { useContext, useMemo } from 'react';
import { DarkModeContext, HighContrastModeContext } from '../contexts';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const isDarkMode = useContext<boolean>(DarkModeContext);
    const isHighContrastMode = useContext<boolean>(HighContrastModeContext);
    
    const heartIconUrl = useMemo(() => {
        if (isDarkMode && isHighContrastMode) {
            return '/static/icons/heart-dark-high-contrast-mode.svg';
        }

        if (isDarkMode) {
            return '/static/icons/heart-dark-mode.svg';
        }

        if (isHighContrastMode) {
            return '/static/icons/heart-high-contrast-mode.svg';
        }

        return '/static/icons/heart.svg';
    }, [ isDarkMode, isHighContrastMode ]);

    return (
        <div className='text-disabled mt-4 flex w-full flex-none flex-col content-center gap-y-4 p-6 text-sm'>
            <div className='mx-auto w-fit'>---</div>
            <div className='mx-auto flex w-fit flex-row gap-x-2 align-middle'>
                <div>made with</div>
                <img className='size-5' src={ heartIconUrl } alt='Love' />
                <div className='hidden sm:block'>and a 16oz oat milk latte</div>
                <div className='block sm:hidden'>and a coffee</div>
            </div>
            <div className='mx-auto flex w-fit flex-row gap-x-4 align-middle'>
                <Link
                    to='https://twitter.com/alts_alt_'
                    target='_blank'
                    rel="noopener noreferrer"
                    className='bg-disabled size-5 bg-clip-[url("/static/icons/twitter.svg")] hover:bg-text'
                    aria-description='Link to my Twitter page'
                />
                <Link
                    to='https://www.twitch.tv/alts_alt_'
                    target='_blank'
                    rel="noopener noreferrer"
                    className='bg-disabled size-5 bg-clip-[url("/static/icons/twitch.svg")] hover:bg-text'
                    aria-description='Link to my Twitch page'
                />
                <Link
                    to='mailto:unrelated@gmail.com'
                    target='_blank'
                    rel="noopener noreferrer"
                    className='bg-disabled size-5 bg-clip-[url("/static/icons/mail.svg")] hover:bg-text'
                    aria-description='Link to email me'
                />
            </div>
        </div>
    );
};

export default Footer;
