import React from 'react';

export interface ChatboxProps {
    username?: string;
    content: string | React.JSX.Element | React.JSX.Element[];
}

const Chatbox: React.FC<ChatboxProps> = ({
    username = 'alts_alt_',
    content,
}: ChatboxProps) => {
    return (
        <div className='flex w-full flex-row flex-nowrap items-end space-x-4'>
            <div className='text-primary shrink-0'>{ `${username}:` }</div>
            <div>{ content }</div>
        </div>
    );
};

export default Chatbox;
