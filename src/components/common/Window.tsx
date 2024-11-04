import React from 'react';

interface WindowProps {
    draggable?: boolean;
    containerStyle?: React.CSSProperties;
    /** list of buttons (top right of window). should have key props! */
    controlButtons?: React.ReactElement[];
    optionsBar?: React.ReactNode;
    children: React.ReactNode;
    title: string;
    /** url for the window's icon (to the left of the title). in the usual bg clip style */
    iconUrl?: string;
}

const Window: React.FC<WindowProps> = ({
    containerStyle,
    optionsBar,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not implemented yet
    draggable = false,
    title,
    controlButtons = [],
    children,
    iconUrl,
}) => {
    const iconStyle: React.CSSProperties = {
        maskImage:  `url(${iconUrl})`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskImage: `url(${iconUrl})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        WebkitMaskPositionY: 'center',
        WebkitMaskPositionX: 'center',
    };

    return (
        <div className='border-text flex h-fit flex-col border-2' style={ containerStyle }>
            <div className='border-text flex w-full flex-row justify-between border-b-2 p-2'>
                <div className='flex flex-row'>
                    { iconUrl && <div className='bg-text min-h-4 min-w-4' style={ iconStyle } /> }
                    <div>{ title }</div>
                </div>
                <div className='flex flex-row items-center'>
                    { controlButtons }
                </div>
            </div>
            <div className='border-text text-disabled w-full border-b-2 px-2 py-1 text-sm'>
                { optionsBar }
            </div>
            { children }
        </div>
    );
};

export default Window;
