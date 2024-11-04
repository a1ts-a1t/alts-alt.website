import React, { useEffect, useState } from 'react';

interface ImageSuspenseProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    errorFallback?: React.ReactNode;
}


const ImageSuspense: React.FC<ImageSuspenseProps> = ({
    src: srcUrl,
    alt,
    fallback,
    errorFallback,
    ...imgProps
}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isLoadingError, setIsLoadingError ] = useState<boolean>(false);

    useEffect(() => {
        if (srcUrl === undefined) {
            setIsLoadingError(true);
            return;
        }

        const loadImagePromise = new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.src = srcUrl;
            image.onload = () => resolve();
            image.onerror = () => reject();
        });
        
        loadImagePromise.then(() => {
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
            setIsLoadingError(true);
        });
    }, [ srcUrl ]);

    if (isLoading) {
        return fallback ?? (
            <div className='bg-disabled flex size-full flex-col items-center justify-center'>
                <div>{ 'Loading image...' }</div>
                <div>{ alt && `[${alt}]` }</div>
            </div>
        );
    }

    if (isLoadingError) {
        return errorFallback ?? (
            <div className='bg-disabled flex size-full flex-col items-center justify-center'>
                <div>{ 'Error loading image' }</div>
                <div>{ alt && `[${alt}]` }</div>
            </div>
        );
    }

    return (<img { ...{ ...imgProps, src: srcUrl } } />);
};

export default ImageSuspense;

