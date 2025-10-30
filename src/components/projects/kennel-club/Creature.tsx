import React, { useEffect, useState } from 'react';
import { CreatureJson, Rect } from './types';
import { Link } from 'react-router-dom';

interface CreatureProps {
    creature: CreatureJson;
    kennelWidth: number;
    kennelHeight: number;
}

export const Creature: React.FC<CreatureProps> = ({ creature, kennelWidth, kennelHeight }) => {
    const [ rect, setRect ] = useState<Rect>({ left: 0, top: 0, width: 0, height: 0 });

    useEffect(() => {
        const width = creature.radius * kennelWidth;
        const height = creature.radius * kennelHeight;

        const left = creature.position.x * kennelWidth - width;
        const top = creature.position.y * kennelHeight - height;

        const minDimension = Math.min(width, height);

        setRect({
            left,
            top,
            // square result
            width: minDimension,
            height: minDimension,
        });
    }, [ creature, kennelWidth, kennelHeight ]);

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
            <img src={ `https://alts-alt.online${creature.sprite_path}` } alt={ `${creature.id} sprite` } />
        </Link>
    );
};
