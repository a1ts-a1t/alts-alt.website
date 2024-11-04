import { useEffect } from 'react';

/**
 * React hook for setting page title.
 * @param title the title to set the page to
 */
export const useTitle = (title: string) => {
    useEffect(() => {
        const currentTitle = document.title;
        document.title = title;
        return () => {
            document.title = currentTitle;
        };
    }, [ title ]);
};

