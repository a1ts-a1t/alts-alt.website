import { PUBLIC_TARGET } from "astro:env/client";

export const isStaticEnvironment = () => PUBLIC_TARGET === "neocities";
