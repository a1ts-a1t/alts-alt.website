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

    return (
        <Link
            key={ creature.id }
            className="absolute"
            to={ creature.url }
            rel="noopener noreferrer"
            target="_blank"
            aria-description={ `Link to ${creature.display_name}` }
            title={ `Link to ${creature.id}` }
            style={ { ...rect } }
        >
            <img className="size-full object-cover" src={ `https://alts-alt.online${creature.sprite_path}` } alt={ `${creature.display_name} sprite` } />
        </Link>
    );
};
