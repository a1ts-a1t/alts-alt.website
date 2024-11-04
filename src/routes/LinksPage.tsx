import React, { useMemo } from 'react';
import Chatbox from '../components/home/Chatbox';
import { useTitle } from '../hooks';
import { Link } from 'react-router-dom';

interface LinkPreviewProps {
    name: string;
    href: string;
    imgSrc: string;
    color: string;
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
            className="border-text relative flex h-24 w-full flex-row border-2 hover:cursor-pointer sm:h-36"
            to={ href }
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="size-24 sm:size-36">
                <div className="bg-text m-auto h-full w-8 sm:w-12" style={ styleProperties } />
            </div>
            <div className="absolute flex size-full justify-center">
                <div className="m-auto w-fit text-xl">{ name }</div>
            </div>
        </Link>
    );
};

const LinksPage: React.FC = () => {
    useTitle('alts-alt');

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
            <div className='flex flex-col gap-y-6'>
                <LinkPreview
                    name="twitter"
                    href="https://twitter.com/alts_alt_"
                    imgSrc="/static/icons/twitter.svg"
                    color="#1DA1F2"
                />
                <LinkPreview
                    name="twitch"
                    href="https://twitch.tv/alts_alt_"
                    imgSrc="/static/icons/twitch.svg"
                    color="#6441A5"
                />
                <LinkPreview
                    name="bluesky"
                    href="https://bsky.app/profile/altsalt.bsky.social"
                    imgSrc="/static/icons/bluesky.svg"
                    color="#0085FF"
                />
                <LinkPreview
                    name="archidekt"
                    href="https://www.archidekt.com/u/alts_alt_"
                    imgSrc="/static/icons/archidekt.svg"
                    color="#F79C01"
                />
            </div>
        </div>
    );
};

export default LinksPage;
