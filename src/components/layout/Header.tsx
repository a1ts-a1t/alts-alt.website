import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onToggleDarkMode: () => void;
    isDarkMode: boolean;
    onToggleHighContrastMode: () => void;
    isHighContrastMode: boolean;
    onToggleReducedMotionMode: () => void;
    isReducedMotionMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
    onToggleDarkMode,
    onToggleHighContrastMode,
    onToggleReducedMotionMode,
    isDarkMode,
    isHighContrastMode,
    isReducedMotionMode,
}) => {
    const [ isNavbarOpen, setIsNavbarOpen ] = useState<boolean>(false);
    const [ isConfigMenuOpen, setIsConfigMenuOpen ] = useState<boolean>(false);
    const configMenuButtonRef = useRef<HTMLButtonElement>(null);
    const configMenuRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (navbarRef.current === null) {
            return;
        }

        const handleClick = (event: Event) => {
            if (!navbarRef.current?.contains(event.target as Node)) {
                setIsNavbarOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        if (configMenuButtonRef.current === null || configMenuRef.current === null) {
            return;
        }

        const handleClick = (event: Event) => {
            if (
                !configMenuButtonRef.current?.contains(event.target as Node)
                    && !configMenuRef.current?.contains(event.target as Node)
            ) {
                setIsConfigMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleNavbarLinkClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsNavbarOpen(false);
    };
    
    const darkModeIcon = isDarkMode
        ? (
            <div
                className='bg-text h-full w-5 bg-clip-[url(/static/icons/dark-mode.svg)]'
                aria-description='Toggle light mode'
                title='Toggle light mode'
            />
        ) : (
            <div
                className='bg-text h-full w-5 bg-clip-[url(/static/icons/light-mode.svg)]'
                aria-description='Toggle dark mode'
                title='Toggle dark mode'
            />
        );

    const highContrastModeIcon = isHighContrastMode
        ? (
            <div
                className='bg-text h-full w-5 bg-clip-[url(/static/icons/high-contrast.svg)]'
                aria-description='Toggle high contrast mode off'
                title='Toggle high contrast mode off'
            />
        ) : (
            <div
                className='bg-text h-full w-5 bg-clip-[url(/static/icons/low-contrast.svg)]'
                aria-description='Toggle high contrast mode on'
                title='Toggle high contrast mode on'
            />
        );

    const reducedMotionModeIcon = isReducedMotionMode
        ? (
            <div
                className='bg-text h-full w-5 bg-clip-[url(/static/icons/reduced-motion.svg)]'
                aria-description='Toggle reduced motion mode off'
                title='Toggle reduced motion mode off'
            />
        ) : (
            <div
                className='bg-text h-full w-5 bg-clip-[url(/static/icons/no-reduced-motion.svg)]'
                aria-description='Toggle reduced motion mode on'
                title='Toggle reduced motion mode on'
            />
        );

    return (
        <div className='flex-none py-10'>
            <div className='hidden flex-row space-x-12 md:flex'>
                <Link className="text-primary block h-fit font-bold hover:underline hover:underline-offset-2" to="/">
                    <span className="inline-block">alts-alt.</span>
                    <span className="inline-block">neocities.org!</span>
                </Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/links'>/links</Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/projects'>/projects</Link>
                <div className='flex grow flex-row justify-end gap-x-2'>
                    <button onClick={ onToggleDarkMode }>{ darkModeIcon }</button>
                    <button onClick={ onToggleHighContrastMode }>{ highContrastModeIcon }</button>
                    <button onClick={ onToggleReducedMotionMode }>{ reducedMotionModeIcon }</button>
                </div>
            </div>
            <div className="flex flex-row justify-between md:hidden">
                <div className='basis-1/4'>
                    <button
                        className='block h-full'
                        ref={ navbarRef }
                        onClick={ () => setIsNavbarOpen(!isNavbarOpen) }
                        title={ isNavbarOpen ? 'Close navigation menu' : 'Open navigation menu' }
                    >
                        { isNavbarOpen
                            ? (
                                <div
                                    className='bg-text h-full w-5 bg-clip-[url(/static/icons/open-folder.svg)]'
                                    aria-description='Close navigation menu'
                                />
                            ) : (
                                <div
                                    className='bg-text h-full w-5 bg-clip-[url(/static/icons/closed-folder.svg)]'
                                    aria-description='Open navigation menu'
                                />
                            )
                        }
                    </button>
                </div>
                <Link className="text-primary h-fit basis-1/2 text-center font-bold" to="/">
                    <span className="inline-block">alts-alt.</span>
                    <span className="inline-block">neocities.org!</span>
                </Link>
                <div className="basis-1/4">
                    <button
                        className="ml-auto block h-full"
                        ref={ configMenuButtonRef }
                        onClick={ () => setIsConfigMenuOpen(!isConfigMenuOpen) }
                        title={ isConfigMenuOpen ? 'Close configuration menu' : 'Open configuration menu' }
                    >
                        { isConfigMenuOpen
                            ? (
                                <div
                                    className='bg-text h-full w-5 bg-clip-[url(/static/icons/config-menu-open.svg)]'
                                    aria-description='Close navigation menu'
                                />
                            ) : (
                                <div
                                    className='bg-text h-full w-5 bg-clip-[url(/static/icons/config-menu-closed.svg)]'
                                    aria-description='Open navigation menu'
                                />
                            )
                        }
                    </button>
                </div>
            </div>
            <div
                className={ isNavbarOpen
                    ? 'bg-background border-text absolute z-50 my-2 flex w-2/5 flex-col space-y-0 border-2 border-dotted align-middle'
                    : 'hidden' }
            >
                <Link onClick={ handleNavbarLinkClick } to='/' className='border-text border-b-2 border-dotted p-2'>$HOME</Link>
                <Link onClick={ handleNavbarLinkClick } to='/links' className='border-text border-b-2 border-dotted p-2'>/links</Link>
                <Link onClick={ handleNavbarLinkClick } to='/projects' className='border-text border-dotted p-2'>/projects</Link>
            </div>
            <div
                className={ isConfigMenuOpen
                    ? 'bg-background border-text absolute right-0 z-50 my-2 flex w-11/12 flex-col space-y-0 border-2 border-dotted align-middle'
                    : 'hidden' }
                ref={ configMenuRef }
            >
                <div className='border-text flex cursor-pointer flex-row items-center gap-x-2 border-b-2 border-dotted p-2' onClick={ onToggleDarkMode }>
                    <div className='h-5'>{ darkModeIcon }</div>
                    <div>{ isDarkMode ? 'Toggle light mode' : 'Toggle dark mode' }</div>
                </div>
                <div className='border-text flex cursor-pointer flex-row items-center gap-x-2 border-b-2 border-dotted p-2' onClick={ onToggleHighContrastMode }>
                    <div className='h-5'>{ highContrastModeIcon }</div>
                    <div>{ isHighContrastMode ? 'Toggle high contrast mode off' : 'Toggle high contrast mode on' }</div>
                </div>
                <div className='flex cursor-pointer flex-row items-center gap-x-2 p-2' onClick={ onToggleReducedMotionMode }>
                    <div className='h-5'>{ reducedMotionModeIcon }</div>
                    <div>{ isReducedMotionMode ? 'Toggle reduced motion mode off' : 'Toggle reduced motion mode on' }</div>
                </div>
            </div>
        </div>
    );
};

export default Header;

