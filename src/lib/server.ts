import { SERVER_ORIGIN } from "astro:env/server";

import { isStaticEnvironment } from "./env";

export enum ServerFetchError {
  ENVIRONMENT, // not an environment that is valid to fetch in
  TIMEOUT, // the request exceeded its deadline
  NETWORK, // the request never completed (dns, connection, tls)
  MALFORMED_RESPONSE, // the response body was not parseable as json
  UNKNOWN,
}

export interface ServerFetchConfig {
  path: `/${string}`;
  timeout?: number;
}

export interface ServerFetchResults<T> {
  data?: T;
  status?: number;
  error?: ServerFetchError;
}

export const serverFetch = async <T>({
  path,
  timeout,
}: ServerFetchConfig): Promise<ServerFetchResults<T>> => {
  if (isStaticEnvironment()) {
    return { error: ServerFetchError.ENVIRONMENT };
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
      return { error: ServerFetchError.TIMEOUT };
    }

    if (e instanceof SyntaxError) {
      return { error: ServerFetchError.MALFORMED_RESPONSE };
    }

    if (e instanceof TypeError) {
      return { error: ServerFetchError.NETWORK };
    }

    return { error: ServerFetchError.UNKNOWN };
  }
};
