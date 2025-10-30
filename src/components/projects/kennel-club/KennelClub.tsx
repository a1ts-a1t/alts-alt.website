import React, { useCallback, useState } from 'react';
import { useFetch } from '../../../hooks';
import ImageSuspense from '../../common/ImageSuspense';
import { KennelJson } from './types';
import { Creature } from './Creature';

export const KennelClub: React.FC = () => {
    const [ response, isLoading ] = useFetch('https://alts-alt.online/api/kennel-club');
    const [ kennelWidth, setKennelWidth ] = useState<number>(0);
    const [ kennelHeight, setKennelHeight ] = useState<number>(0);

    const resizeObserver = new ResizeObserver((entries) => {
        const resizedElement = entries.at(0);
        if (resizedElement === undefined) {
            return;
        }

        if (resizedElement.contentRect) {
            setKennelWidth(resizedElement.contentRect.width);
            setKennelHeight(resizedElement.contentRect.width);
        }
    });
    
    const kennelRef = useCallback((node: HTMLDivElement): () => void => {
        if (node !== null) {
            setKennelWidth(node.getBoundingClientRect().width);
            setKennelHeight(node.getBoundingClientRect().height);

            resizeObserver.observe(node);
            return () => resizeObserver.unobserve(node);
        }

        return () => { };
    }, []);

    const isError = (response === undefined && !isLoading)
        || (response !== undefined && response.status >= 400);

    if (isError) {
        return (
            <ImageSuspense alt="Kennel Club" src="https://alts-alt.online/api/kennel-club/img" />
        );
    }

    if (isLoading || response === undefined) {
        return (
            <div className='bg-disabled flex size-full flex-col items-center justify-center'>
                <div>{ 'Loading Kennel Club...' }</div>
            </div>
        );
    }

    const kennel: KennelJson = JSON.parse(response.body);

    return (
        <div id="kennel" className='border-text relative aspect-square w-full border-2' ref={ kennelRef }>
            { kennel.map((creature) => (
                <Creature key={ creature.id } creature={ creature } kennelWidth={ kennelWidth } kennelHeight={ kennelHeight } />
            )) }
        </div>
    );
};

