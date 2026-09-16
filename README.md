# alts-alt.website

This repository contains the source code for [alts-alt.online](https://alts-alt.online). This website is also hosted on [my Neocities](https://alts-alt.neocities.org).

## deploying

The site builds to two targets, selected by the `PUBLIC_TARGET` environment variable:

- `npm run build` — `PUBLIC_TARGET=neocities`: plain static site in `dist/`, no outbound fetching.
- `npm run build:server` — `PUBLIC_TARGET=vps`: full Astro build with the `@astrojs/node` standalone adapter, producing `dist/server/entry.mjs` + `dist/client/`.

CI (`.github/workflows/deploy.yml`, on push to `main`) builds both artifacts and deploys:

- `build` → [Neocities](https://alts-alt.neocities.org) via `NEOCITIES_API_TOKEN`.
- `server` (the whole `dist/` plus `package.json` and `package-lock.json`) → rsynced to `~/alts-alt/server` on the VPS via `SSH_PRIVATE_KEY`, `HOST_NAME`, and `USERNAME` secrets, then restarted by running `~/alts-alt/entrypoint.sh` on the host.

The node standalone bundle is not self-contained (server deps are externalized), so the VPS entrypoint contract is:

```sh
cd ~/alts-alt/server && npm ci --omit=dev && node dist/server/entry.mjs
```

with `HOST`/`PORT` env vars supported (e.g. `HOST=127.0.0.1 PORT=4321`), requiring node ≥ 22.12 on the VPS. The reverse proxy points site traffic at it while rocket keeps serving `/api` and `/ws`.
