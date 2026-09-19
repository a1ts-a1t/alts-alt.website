import { PUBLIC_TARGET } from "astro:env/client";

export const canFetch = () => PUBLIC_TARGET === "vps";

export enum LocalFetchError {
  ENVIRONMENT, // not an environment that is valid to fetch in
  TIMEOUT, // the request exceeded its deadline
  NETWORK, // the request never completed (dns, connection, tls)
  MALFORMED_RESPONSE, // the response body was not parseable as json
  UNKNOWN,
}

export interface LocalFetchConfig {
  url: `/${string}`;
  timeout?: number;
}

export interface LocalFetchResults<T> {
  data?: T;
  status?: number;
  error?: LocalFetchError;
}

// TODO: figure out how to get this to work given that they're both on the same server
// we definitely don't need a round trip
const LOCAL_FETCH_ROOT_PATH = "https://alts-alt.online";

export const localFetch = async <T>({
  url,
  timeout,
}: LocalFetchConfig): Promise<LocalFetchResults<T>> => {
  if (!canFetch()) {
    return { error: LocalFetchError.ENVIRONMENT };
  }

  const fullUrl = `${LOCAL_FETCH_ROOT_PATH}${url}`;

  let status: number | undefined;

  try {
    const response = await fetch(fullUrl, {
      signal: AbortSignal.timeout(timeout ?? 5000),
    });

    status = response.status;
    const body = (await response.json()) as T;

    return {
      data: body,
      status,
    };
  } catch (e) {
    if (
      e instanceof Error &&
      (e.name === "TimeoutError" || e.name === "AbortError")
    ) {
      return { status, error: LocalFetchError.TIMEOUT };
    }

    if (e instanceof SyntaxError) {
      return { status, error: LocalFetchError.MALFORMED_RESPONSE };
    }

    if (e instanceof TypeError) {
      return { status, error: LocalFetchError.NETWORK };
    }

    return { status, error: LocalFetchError.UNKNOWN };
  }
};
