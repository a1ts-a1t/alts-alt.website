import { buildLocalSocketUrl, isStaticEnvironment } from "./env";

export interface LocalSocketConfig<T> {
  path: `/${string}`;
  onMessage: (data: T) => void;
  onError?: () => void;
}

export const openLocalSocket = <T>({
  path,
  onMessage,
  onError,
}: LocalSocketConfig<T>) => {
  if (isStaticEnvironment()) {
    onError?.();
    return undefined;
  }

  const socket = new WebSocket(buildLocalSocketUrl(path));

  socket.addEventListener("message", (event) => {
    try {
      onMessage(JSON.parse(event.data as string) as T);
    } catch {
      // ignore malformed payloads; keep the last good state
    }
  });

  socket.addEventListener("error", () => {
    socket.close();
    onError?.();
  });
};
