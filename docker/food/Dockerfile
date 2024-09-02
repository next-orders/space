ARG NODE=node:20.17.0-alpine

################# Base builder ##############

FROM $NODE AS builder
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build --filter @next-orders/food

################# App ##############

FROM $NODE
WORKDIR /app
COPY --from=builder /app/apps/food/.output .

ARG VERSION=nightly
ENV VERSION=${VERSION}
ENV NODE_ENV=production

EXPOSE 3000

CMD ["/app/server/index.mjs"]
