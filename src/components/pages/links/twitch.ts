import { localFetch } from "~/lib/fetch";

export const fetchIsTwitchLive = async (): Promise<boolean> => {
  const { data, status, error } = await localFetch<{ is_live: boolean }>({
    url: "/api/twitch",
  });

  if (error || data === undefined) {
    return false;
  }

  if (status !== undefined && status >= 400) {
    return false;
  }

  return data.is_live;
};
