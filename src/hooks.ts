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
 * React hook returning whether the environment can call fetch or not.
 * @return true if the environment can call fetch, false otherwise
 */
export const useCanFetch = (): boolean => {
    return !window.location.hostname.includes('neocities');
};

/**
 * React hook for standardizing fetching.
 * If there is no response and it is not loading, there
 * was some non-API related issue (ie, the environment does not allow fetching)
 * @return [response attributes, isLoading]
 */
export const useFetch = (url: string): [{ body: string; status: number } | undefined, boolean] => {
    const [ response, setResponse ] = useState<{ body: string; status: number } | undefined>(undefined);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setResponse(undefined);

        fetch(url)
            .then(async (response) => {
                const body = await response.text();
                setResponse({
                    body,
                    status: response.status,
                });
            })
            .finally(() => setIsLoading(false));
    }, [ url ]);

    if (!useCanFetch()) {
        return [ undefined, false ];
    }

    return [ response, isLoading ];
};
