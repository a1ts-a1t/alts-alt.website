import { useEffect } from 'react';

/**
 * React hook for setting page title.
 * @param {string} title the title to set the page to
 */
export const useTitle = (title: string) => {
    useEffect(() => {
        const currentTitle = document.title;
        document.title = title;
        return () => {
            document.title = currentTitle;
        };
    }, []);
};

/**
 * React hook returning whether the environment can call fetch or not.
 * @return true if the environment can call fetch, false otherwise
 */
export const useCanFetch = (): boolean => {
    return !window.location.hostname.includes('neocities');
};
