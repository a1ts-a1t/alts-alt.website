import { PUBLIC_TARGET } from "astro:env/client";

export const canFetch = () => PUBLIC_TARGET === "vps";
