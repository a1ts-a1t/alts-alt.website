import React, { useMemo } from 'react';
import { useTitle } from '../hooks';
import Chatbox from '../components/home/Chatbox';
import { Link, useLocation } from 'react-router-dom';

const Error404: React.FC = () => {
    useTitle('alts-alt | Page Not Found');

    const dateString = useMemo(() => {
        return (new Date()).toUTCString();
    }, []);

    const pathname = useLocation().pathname;

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex h-9 w-full items-center justify-center'>
                <div className='text-disabled'>{ dateString }</div>
            </div>
            <Chatbox content={ <span className='text-secondary'>joined the room</span> } />
            <Chatbox content={ `sorry!! i don't think "${pathname}" exists yet...` } />
            <Chatbox
                content={ (
                    <span>
                        <span>if you think something should be here, lmk on </span>
                        <Link
                            to='https://twitter.com/alts_alt_'
                            className='text-enabled hover:underline hover:underline-offset-2'
                        >
                            twitter
                        </Link>
                        <span>!</span>
                    </span>
                ) }
            />
        </div>
    );
};

export default Error404;
