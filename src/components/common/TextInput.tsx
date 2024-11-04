import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';

interface TextInputProps {
    /** id of input element */
    id?: string;
    /**
     * value of input element. if this is set, you should probably
     * also set onChange
     */
    value?: string;
    /** onchange listener of the element */
    onChange?: ChangeEventHandler;
    /** listener for when user clicks off or hits enter */
    onInputInteractionEnd?: (value: string) => void;
    /** classname of the input element */
    className?: string;
    /** placeholder text */
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    id,
    value,
    onChange,
    onInputInteractionEnd,
    className,
    placeholder,
}) => {
    const [ _value, _setValue ] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const inputElement = inputRef.current;
        if (inputElement === null) {
            return;
        }

        const handleKeyPress = (event: KeyboardEvent) => {
            if (document.activeElement !== inputElement) {
                return;
            }

            if (event.key === 'Enter') {
                onInputInteractionEnd?.(_value);
            }
        };

        const handleMouseDown = (event: MouseEvent) => {
            if (document.activeElement !== inputElement) {
                return;
            }

            if (!inputElement.contains(event.target as Node)) {
                onInputInteractionEnd?.(_value);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [ _value ]);

    const _handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        _setValue(evt.target.value);
        onChange?.(evt);
    };

    return (
        <input
            ref={ inputRef } 
            type='text'
            id={ id }
            className={ className }
            value={ value ?? _value }
            onChange={ _handleChange }
            placeholder={ placeholder }
        />
    );
};

export default TextInput;

