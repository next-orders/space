FROM --platform=linux/amd64 node:20-alpine AS base
RUN apk update && apk add --no-cache libc6-compat

ARG PROJECT=api

FROM base as builder
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npx nx@latest build ${PROJECT}

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist .

WORKDIR /app/apps/${PROJECT}

EXPOSE 4001
CMD ["node", "main"]
