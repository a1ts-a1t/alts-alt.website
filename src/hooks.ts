import { useEffect, useState } from 'react';

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
 * React hook for fetching, retrieving the response, error, and load state.
 * @param {string} url the url as a string to fetch from
 * @param {RequestInit | undefined} options the options to be used for the fetch
 * @returns {[Response | null, unknown | null, boolean]} response state.
 */
export const useFetch = (
    url: string, options?: RequestInit,
): [ Response | null, unknown | null, boolean ] => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ response, setResponse ] = useState<Response | null>(null);
    const [ error, setError ] = useState<unknown | null>(null);

    useEffect(() => {
        setIsLoading(false);
        fetch(url, options)
            .then(setResponse)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, []);

    return [ response, error, isLoading ];
};

