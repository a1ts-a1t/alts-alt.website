import { buildEventsUrl, isStaticEnvironment } from "./env";

export interface EventSourceConfig<T> {
  path: `/${string}`;
  onMessage: (data: T) => void;
  onError?: () => void;
}

export const openEventSource = <T>({
  path,
  onMessage,
  onError,
}: EventSourceConfig<T>) => {
  if (isStaticEnvironment()) {
    onError?.();
    return undefined;
  }

  const eventSource = new EventSource(buildEventsUrl(path));

  eventSource.addEventListener("message", (event) => {
    try {
      onMessage(JSON.parse(event.data as string) as T);
    } catch {
      // ignore malformed payloads; keep the last good state
    }
  });

  eventSource.addEventListener("error", () => {
    if (eventSource.readyState === EventSource.CLOSED) {
      onError?.();
    }
  });
};
