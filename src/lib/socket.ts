import { buildSocketUrl, isStaticEnvironment } from "./env";

export interface SocketConfig<T> {
  path: `/${string}`;
  onMessage: (data: T) => void;
  onError?: () => void;
}

export const openSocket = <T>({
  path,
  onMessage,
  onError,
}: SocketConfig<T>) => {
  if (isStaticEnvironment()) {
    onError?.();
    return undefined;
  }

  const socket = new WebSocket(buildSocketUrl(path));

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
