FROM node:22-bookworm-slim

ARG WEBSITE_PORT=4321
ARG SERVER_PORT=8000
ARG SERVER_HOST=server

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=${WEBSITE_PORT} \
    SERVER_ORIGIN=http://${SERVER_HOST}:${SERVER_PORT}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm pkg delete scripts.prepare \
	&& npm ci --omit=dev \
	&& npm cache clean --force

COPY dist ./dist

USER node

EXPOSE ${WEBSITE_PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
	CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/').then(r => process.exit(r.status < 500 ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/server/entry.mjs"]
