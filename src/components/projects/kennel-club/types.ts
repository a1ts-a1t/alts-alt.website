export interface CreatureJson {
    id: string;
    radius: number;
    url: string;
    position: {
        x: number;
        y: number;
    };
    sprite_path: string;
}

export type KennelJson = CreatureJson[];

export interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}

