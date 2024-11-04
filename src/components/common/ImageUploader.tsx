import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextInput from './TextInput';

interface ImageUploaderProps {
    onImageLoadStart?: () => void;
    onImageLoad: (image: HTMLImageElement) => void;
    onImageLoadError?: (image: HTMLImageElement, errorEvent: Event) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageLoad,
    onImageLoadError,
    onImageLoadStart,
}) => {
    const imageFileInputRef = useRef<HTMLInputElement>(null);
    const [ urlTextValue, setUrlTextValue ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (isLoading && onImageLoadStart) {
            onImageLoadStart();
        }
    }, [ isLoading ]);

    const handleUrlUpload = () => {
        setIsLoading(true);
        const image = new Image();
        
        image.addEventListener('load', () => {
            setIsLoading(false);
            onImageLoad(image);
        }, false);

        image.addEventListener('error', (event) => {
            setIsLoading(false);
            onImageLoadError?.(image, event);
        }, false);

        image.crossOrigin = 'anonymous';
        image.src = urlTextValue.includes('://') ? urlTextValue : `//${urlTextValue}`;
    };

    const handleFileUpload = (event: ChangeEvent) => {
        const file = (event.target as HTMLInputElement).files?.item(0) ?? undefined;
        if (file === undefined) {
            return;
        }

        setIsLoading(true);
        const image = new Image();

        image.addEventListener('load', () => {
            setIsLoading(false);
            onImageLoad(image);
        }, false);

        image.addEventListener('error', (event) => {
            setIsLoading(false);
            onImageLoadError?.(image, event);
        }, false);

        const fileReader = new FileReader();

        fileReader.addEventListener('error', (event) => {
            setIsLoading(false);
            onImageLoadError?.(image, event);
        }, false);

        fileReader.addEventListener('load', (event) => {
            const result = fileReader.result;
            if (result === null) {
                setIsLoading(false);
                onImageLoadError?.(image, event);
                return;
            }

            image.src = result.toString();
        });

        fileReader.readAsDataURL(file);
    };

    return (
        <div className='border-text flex h-64 w-full border-2'>
            <div className='my-auto flex h-fit w-full flex-col gap-y-4'>
                { isLoading ? (
                    <div className='mx-auto'>
                        <button disabled={ true } className='text-disabled'>Browse files</button>
                    </div>
                ) : (
                    <div className='mx-auto'>
                        <button
                            className='text-enabled hover:cursor-pointer hover:underline hover:underline-offset-2'
                            onClick={ () => imageFileInputRef.current?.click() }
                        >
                                Browse files
                        </button>
                        <input
                            type='file'
                            accept='image/*'
                            ref={ imageFileInputRef }
                            className='hidden'
                            aria-hidden={ false }
                            onChange={ handleFileUpload }
                            multiple={ false }
                        />
                    </div>
                ) }
                <div className='text-disabled mx-auto text-sm'>~~~ or ~~~</div>
                <div className='mx-auto flex max-w-4/5 flex-row gap-x-2'>
                    <TextInput 
                        value={ urlTextValue }
                        onChange={ (event) => setUrlTextValue((event.target as HTMLInputElement).value) }
                        className='bg-background border-text w-96 border-2 px-1 placeholder:text-disabled'
                        placeholder='Upload from URL'
                    />
                    { isLoading ? (
                        <button disabled={ true } className='text-disabled'>Upload</button>
                    ) : (
                        <button
                            onClick={ handleUrlUpload }
                            className='text-enabled hover:underline hover:underline-offset-2'
                        >
                            Upload
                        </button>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
