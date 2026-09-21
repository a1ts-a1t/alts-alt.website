import { serverFetch } from "~/lib/server";

export const fetchIsTwitchLive = async (): Promise<boolean> => {
  const { data, status, error } = await serverFetch<{ is_live: boolean }>({
    path: "/api/twitch",
  });

  if (error || data === undefined) {
    return false;
  }

  if (status !== undefined && status >= 400) {
    return false;
  }

  return data.is_live;
};
