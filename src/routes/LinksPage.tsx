import React, { useContext, useMemo } from 'react';
import Chatbox from '../components/home/Chatbox';
import { useTitle } from '../hooks';
import { Link } from 'react-router-dom';
import { DarkModeContext, HighContrastModeContext} from '../components/contexts';

interface LinkPreviewProps {
    name: string;
    href: string;
    imgSrc: string;
    color?: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({
    name,
    href,
    imgSrc,
    color,
}) => {
    const styleProperties: React.CSSProperties = {
        maskImage: `url("${imgSrc}")`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
        backgroundColor: color,
    };

    return (
        <Link
            className="border-text relative flex h-24 items-center border-2 hover:cursor-pointer sm:h-36"
            to={ href }
            rel="noopener noreferrer"
            target="_blank"
            aria-description={ `Link to ${name}` }
            title={ `Link to ${name}` }
        >
            <div className="mx-auto">
                <div>
                    <div className="bg-text m-2 h-8 sm:h-10" style={ styleProperties } />
                </div>
                <div className="flex justify-center">
                    <div className="m-auto w-fit sm:text-xl">{ name.toLowerCase() }</div>
                </div>
            </div>
        </Link>
    );
};
const LinksPage: React.FC = () => {
    useTitle('alts-alt | Links');
    const isDarkMode = useContext<boolean>(DarkModeContext);
    const isHighContrastMode = useContext<boolean>(HighContrastModeContext);

    const dateString = useMemo(() => {
        return (new Date()).toUTCString();
    }, []);

    return (
        <div className='flex flex-col gap-y-12'>
            <div className='flex flex-col gap-y-6'>
                <div className='flex h-9 w-full items-center justify-center text-center'>
                    <div className='text-disabled'>{ dateString }</div>
                </div>
                <Chatbox content={ <span className='text-secondary'>joined the room</span> } />
                <Chatbox content={ 'here are all the places on the internet you can find me!' } />
                <Chatbox content={ '(that aren\'t this website haha...)' } />
                <Chatbox content={ 'come say hiii :3' } />
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                <LinkPreview
                    name="Twitter"
                    href="https://twitter.com/alts_alt_"
                    imgSrc="/static/icons/twitter.svg"
                    color={ isHighContrastMode && !isDarkMode ? '#1C9BEB' : '#1DA1F2' }
                />
                <LinkPreview
                    name="Twitch"
                    href="https://twitch.tv/alts_alt_"
                    imgSrc="/static/icons/twitch.svg"
                    color={ isHighContrastMode && isDarkMode ? '#764DC4' : '#6441A5' }
                />
                <LinkPreview
                    name="Throne"
                    href="https://throne.com/alts_alt"
                    imgSrc="/static/icons/throne.svg"
                    color="#D221AF"
                />
                <LinkPreview
                    name="PO Box"
                    href="/static/files/po-box.txt"
                    imgSrc="/static/icons/mailbox.svg"
                />
                <LinkPreview
                    name="GitHub"
                    href="https://github.com/a1ts-a1t"
                    imgSrc="/static/icons/github.svg"
                />
                <LinkPreview
                    name="Bluesky"
                    href="https://bsky.app/profile/altsalt.bsky.social"
                    imgSrc="/static/icons/bluesky.svg"
                    color="#0085FF"
                />
                <LinkPreview
                    name="Archidekt"
                    href="https://www.archidekt.com/u/alts_alt_"
                    imgSrc="/static/icons/archidekt.svg"
                    color={ isHighContrastMode && !isDarkMode ? '#D18400' : '#F79C01' }
                />
                <LinkPreview
                    name="Email"
                    href="mailto:unrelatedalt@gmail.com"
                    imgSrc="/static/icons/mail.svg"
                />
            </div>
        </div>
    );
};

export default LinksPage;
