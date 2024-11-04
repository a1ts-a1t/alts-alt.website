import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface DropdownProps {
    /** id of dropdown menu, applied to the container of the whole component */
    id: string;
    /** any class name to be applied for the container of the whole dropdown */
    containerClassName?: string;
    /** any class name to be applied for the container of all children in the dropdown */
    menuClassName?: string;
    /** any class name to be applied for the container of each child in the dropdown */
    menuItemClassName?: string;
    /** elements in the dropdown. if it's an array, each child will be rendered in its own container */
    children: ReactNode;
    /** the element that triggers the drop down on click */
    toggleElement: ReactNode;
    /** the element that renders when the menu is open that can trigger the menu */
    menuOpenToggleElement?: ReactNode;
    /** flag to close the menu when an option is selected. defaults to true */
    closeOnOptionSelect?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    id,
    containerClassName,
    menuClassName,
    menuItemClassName,
    children,
    toggleElement,
    menuOpenToggleElement,
    closeOnOptionSelect = true,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);
    const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);

    useEffect(() => {
        const menu = menuRef.current;
        const toggle = toggleRef.current;
        if (menu === null || toggle === null) {
            return;
        }

        const handleClick = (event: Event) => {
            if (isMenuOpen && !toggle.contains(event.target as Node) && !menu.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [ isMenuOpen ]);
    
    const childrenElement = Array.isArray(children) ? (
        children.map((child, idx) => (
            <div
                key={ `${id}-dropdown-${idx}` }
                className={ menuItemClassName ?? (idx === 0 ? 'p-2' : 'border-text border-t-2 border-dotted p-2') }
                onClick={ closeOnOptionSelect ? () => setIsMenuOpen(false) : undefined }
            >
                { child }
            </div>
        ))
    ) : children;

    return (
        <div id={ id } className={ containerClassName ?? 'relative w-fit' }>
            <div ref={ toggleRef } onClick={ () => setIsMenuOpen(!isMenuOpen) }>
                { (isMenuOpen && menuOpenToggleElement) ? menuOpenToggleElement : toggleElement }
            </div>
            <div className={ isMenuOpen ? (menuClassName ?? 'bg-background border-text left-0 z-50 my-2 flex flex-col space-y-0 border-2 border-dotted') : 'hidden' } style={ { position: 'absolute' } } ref={ menuRef } >
                { childrenElement }
            </div>
        </div>
    );
};

export default Dropdown;

