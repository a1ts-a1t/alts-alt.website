export const int = Math.floor;

export const frac = (val: number) => val - Math.floor(val);

export const clamp = (val: number, min?: number, max?: number) => {
    if (min !== undefined && val < min) {
        return min;
    }

    if (max != undefined && val > max) {
        return max;
    }

    return val;
};

