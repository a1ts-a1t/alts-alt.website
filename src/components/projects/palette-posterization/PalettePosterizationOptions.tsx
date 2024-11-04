import React, { useCallback } from 'react';
import { COLOR_METRIC_TO_SOURCE, COLOR_REDUCER_TO_SOURCE, ColorMetricType, ColorReducerType } from './utils';
import Dropdown from '../../common/Dropdown';
import { Stringable } from '../../common/types';

interface PalettePosterizationOptionsProps {
    currentColorMetric: ColorMetricType;
    onColorMetricSelect: (colorMetricType: ColorMetricType) => void;
    currentRenderedColorReducer: ColorReducerType;
    onRenderedColorReducerSelect: (renderedColorReducerType: ColorReducerType) => void;
}

const PalettePosterizationOptions: React.FC<PalettePosterizationOptionsProps> = ({
    currentColorMetric,
    onColorMetricSelect,
    currentRenderedColorReducer,
    onRenderedColorReducerSelect,
}) => {

    const createOptionElements = useCallback(<T extends Stringable>(
        options: T[], currentOption: T, onOptionSelect: (t: T) => void,
    ) => (
        options.map(option => (
            <div
                key={ `${option}-dropdown-option` } 
                className='flex h-6 min-w-max flex-row justify-between gap-x-4 hover:cursor-pointer'
                onClick={ () => onOptionSelect(option) }
            >
                <div>{ option.toString() }</div>
                <div
                    className={ option === currentOption ? 'bg-text h-full w-4 bg-clip-[url(/static/icons/checkmark.svg)]' : 'w-4' }
                    aria-hidden={ option !== currentOption }
                    aria-description={ option === currentOption ? 'Selected option' : undefined }
                />
            </div>
        ))
    ), []);

    const createToggleElement = useCallback((renderedTitle: string, htmlTitle: string, isMenuOpen: boolean) => (
        <div
            className='flex h-6 max-w-min flex-row gap-x-3 hover:cursor-pointer hover:underline hover:underline-offset-2'
            title={ htmlTitle }
            aria-description={ htmlTitle }
        >
            <div className='min-w-max'>{ renderedTitle }</div>
            <div
                className={
                    isMenuOpen 
                        ? 'bg-text h-full w-3 bg-clip-[url(/static/icons/dropdown-open.svg)]'
                        : 'bg-text h-full w-3 bg-clip-[url(/static/icons/dropdown.svg)]'
                }
            />
        </div>
    ), []);

    const colorMetricToggleElement = createToggleElement(currentColorMetric, 'Select a color metric', false);
    const menuOpenColorMetricToggleElement = createToggleElement(currentColorMetric, 'Close color metric options', true);
    const colorMetricOptionElements = createOptionElements<ColorMetricType>(
        Object.getOwnPropertyNames(COLOR_METRIC_TO_SOURCE) as ColorMetricType[],
        currentColorMetric,
        onColorMetricSelect,
    );

    const renderedColorReducerToggleElement = createToggleElement(currentRenderedColorReducer, 'Select a color metric', false);
    const menuOpenRenderedColorReducerToggleElement = createToggleElement(currentRenderedColorReducer, 'Close color metric options', true);
    const renderedColorReducerOptionElements = createOptionElements<ColorReducerType>(
        Object.getOwnPropertyNames(COLOR_REDUCER_TO_SOURCE) as ColorReducerType[],
        currentRenderedColorReducer,
        onRenderedColorReducerSelect,
    );

    return (
        <div className='flex w-full flex-col justify-between text-sm sm:flex-row sm:text-base'>
            <Dropdown
                id={ 'color-metric-select' }
                menuClassName='bg-background border-text left-0 z-50 my-2 flex flex-col space-y-0 border-2 border-dotted'
                toggleElement={ colorMetricToggleElement }
                menuOpenToggleElement={ menuOpenColorMetricToggleElement }
            >
                { colorMetricOptionElements }
            </Dropdown>
            <Dropdown
                id={ 'rendered-color-reducer-select' }
                menuClassName='bg-background border-text sm:right-0 sm:left-auto left-0 z-50 my-2 flex flex-col space-y-0 border-2 border-dotted'
                toggleElement={ renderedColorReducerToggleElement }
                menuOpenToggleElement={ menuOpenRenderedColorReducerToggleElement }
            >
                { renderedColorReducerOptionElements }
            </Dropdown>
        </div>
    );
};

export default PalettePosterizationOptions;

