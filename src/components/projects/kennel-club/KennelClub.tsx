import React, { useCallback, useEffect, useState } from 'react';
import ImageSuspense from '../../common/ImageSuspense';
import { KennelJson } from './types';
import { Creature } from './Creature';

export const KennelClub: React.FC = () => {
    const [ isError, setIsError ] = useState<boolean>(false);
    const [ kennel, setKennel ] = useState<KennelJson | undefined>(undefined);
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

    useEffect(() => {
        const ws = new WebSocket('wss://alts-alt.online/ws/kennel-club');
        ws.addEventListener('message', (e) => {
            setKennel(JSON.parse(e.data) as KennelJson);
        });

        ws.addEventListener('error', () => {
            setIsError(true);
            ws.close();
        });

        return () => ws.close();
    }, []);

    if (isError) {
        return (
            <div className='border-text flex aspect-square size-full flex-col items-center justify-center border-2'>
                <ImageSuspense alt="Kennel Club webring represented by a series of creatures in a container" src="https://alts-alt.online/api/kennel-club/img" />
            </div>
        );
    }

    if (kennel === undefined) {
        return (
            <div className='border-text bg-disabled flex aspect-square size-full flex-col items-center justify-center border-2'>
                <div>{ 'Loading Kennel Club...' }</div>
            </div>
        );
    }

    return (
        <div id="kennel" className='border-text relative aspect-square w-full border-2' ref={ kennelRef }>
            { kennel.map((creature) => (
                <Creature
                    key={ creature.id }
                    creature={ creature }
                    kennelWidth={ kennelWidth }
                    kennelHeight={ kennelHeight }
                />
            )) }
        </div>
    );
};

