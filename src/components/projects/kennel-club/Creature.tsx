import React, { useEffect, useRef, useState } from 'react';
import { CreatureJson, Rect } from './types';
import { Link } from 'react-router-dom';

interface CreatureProps {
    creature: CreatureJson;
    kennelWidth: number;
    kennelHeight: number;
    onError: () => void;
}

export const Creature: React.FC<CreatureProps> = ({ creature, kennelWidth, kennelHeight, onError }) => {
    const [ rect, setRect ] = useState<Rect>({ left: 0, top: 0, width: 0, height: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const canvasCreatureRadius = creature.radius * Math.min(kennelWidth, kennelHeight);
        const left = creature.position.x * kennelWidth - canvasCreatureRadius;
        const top = kennelHeight - creature.position.y * kennelHeight - canvasCreatureRadius;
        const canvasCreatureDiameter = 2 * canvasCreatureRadius;

        setRect({
            left,
            top,
            width: canvasCreatureDiameter,
            height: canvasCreatureDiameter,
        });
    }, [ creature, kennelWidth, kennelHeight ]);

    // refresh image
    useEffect(() => {
        const url = `https://alts-alt.online${creature.sprite_path}`;
        fetch(url, { cache: 'reload', mode: 'no-cors' })
            .then(() => {
                if (imageRef.current === null) {
                    return;
                }

                imageRef.current.src = url;
            })
            .catch(() => onError())
    }, [ creature ]);

    return (
        <Link
            key={ creature.id }
            className="absolute"
            to={ creature.url }
            rel="noopener noreferrer"
            target="_blank"
            aria-description={ `Link to ${creature.id} website` }
            title={ `Link to ${creature.id} website` }
            style={ { ...rect } }
        >
            <img className="size-full object-cover" ref={ imageRef } alt={ `${creature.id} sprite` } />
        </Link>
    );
};
