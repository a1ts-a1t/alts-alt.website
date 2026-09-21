import { SERVER_ORIGIN } from "astro:env/server";

import { isStaticEnvironment } from "./env";

export enum LocalFetchError {
  ENVIRONMENT, // not an environment that is valid to fetch in
  TIMEOUT, // the request exceeded its deadline
  NETWORK, // the request never completed (dns, connection, tls)
  MALFORMED_RESPONSE, // the response body was not parseable as json
  UNKNOWN,
}

export interface LocalFetchConfig {
  path: `/${string}`;
  timeout?: number;
}

export interface LocalFetchResults<T> {
  data?: T;
  status?: number;
  error?: LocalFetchError;
}

export const localFetch = async <T>({
  path,
  timeout,
}: LocalFetchConfig): Promise<LocalFetchResults<T>> => {
  if (isStaticEnvironment()) {
    return { error: LocalFetchError.ENVIRONMENT };
  }

  try {
    const response = await fetch(new URL(path, SERVER_ORIGIN), {
      signal: AbortSignal.timeout(timeout ?? 5000),
    });

    const body = (await response.json()) as T;

    return {
      data: body,
      status: response.status,
    };
  } catch (e) {
    if (
      e instanceof Error &&
      (e.name === "TimeoutError" || e.name === "AbortError")
    ) {
      return { error: LocalFetchError.TIMEOUT };
    }

    if (e instanceof SyntaxError) {
      return { error: LocalFetchError.MALFORMED_RESPONSE };
    }

    if (e instanceof TypeError) {
      return { error: LocalFetchError.NETWORK };
    }

    return { error: LocalFetchError.UNKNOWN };
  }
};
