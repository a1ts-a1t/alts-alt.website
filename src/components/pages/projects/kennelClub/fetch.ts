import { serverFetch } from "~/lib/server";
import type { KennelState } from "./utils";

export const fetchKennelSpritePaths = async (): Promise<`/${string}`[]> => {
  const { data, status, error } = await serverFetch<KennelState>({
    path: "/api/kennel-club",
  });

  if (error || data === undefined || (status !== undefined && status >= 400)) {
    return [];
  }

  return data.flatMap((creature) => creature.sprite_paths);
};
