import React, { useState } from 'react';
import PalettePicker from './PalettePicker';
import { RgbColor } from '../../common/colorUtils';
import { ColorMetricType, ColorReducerType } from './utils';
import ImageUploader from '../../common/ImageUploader';
import PalettePosterizationOptions from './PalettePosterizationOptions';
import WebGlCanvas from './WebGlCanvas';

const PalettePosterization: React.FC = () => {
    const [ palette, setPalette ] = useState<RgbColor[]>([]);
    const [ colorMetric, setColorMetric ] = useState<ColorMetricType>(ColorMetricType.EUCLIDEAN_RGB);
    const [ renderedColorReducer, setRenderedColorReducer ] = useState<ColorReducerType>(ColorReducerType.PALETTE);
    const [ image, setImage ] = useState<undefined | HTMLImageElement>(undefined);

    return (
        <div className='flex flex-col space-y-2'>
            { image !== undefined && (
                <PalettePosterizationOptions 
                    onColorMetricSelect={ setColorMetric }
                    currentColorMetric={ colorMetric }
                    onRenderedColorReducerSelect={ setRenderedColorReducer }
                    currentRenderedColorReducer={ renderedColorReducer }
                />
            ) }
            { image === undefined && (
                <ImageUploader
                    onImageLoad={ setImage }
                />
            ) }
            <WebGlCanvas image={ image } palette={ palette } colorMetric={ colorMetric } colorReducer={ renderedColorReducer } />
            { image !== undefined && (
                <PalettePicker
                    onPaletteChange={ (newPalette) => setPalette(newPalette) }
                    palette={ palette }
                />
            ) }
        </div>
    );
};

export default PalettePosterization;

