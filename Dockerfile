# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# -------------------------- build --------------------------
FROM base AS build

COPY . /usr/src/app
WORKDIR /usr/src/app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@spotiloader/api --prod /prod/api
RUN pnpm deploy --filter=@spotiloader/web --prod /prod/web

# ------------------------ api-runner ------------------------
FROM base AS api-runner

ENV NODE_ENV=production
COPY --from=build /prod/api /prod/api
COPY --from=build /usr/src/app/apps/api/dist /prod/api/dist
WORKDIR /prod/api
EXPOSE 8080
ENV PORT=8080

CMD [ "node", "dist/index.mjs" ]

