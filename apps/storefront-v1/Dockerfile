FROM --platform=linux/amd64 node:20-alpine AS base
RUN apk update && apk add --no-cache libc6-compat

ARG PROJECT=storefront-v1

FROM base as builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV DATA_CACHE_DISABLED 1

COPY . .
RUN npm ci
RUN npx nx@latest build ${PROJECT}

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/${PROJECT}/next.config.js .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/public ./apps/${PROJECT}/public

WORKDIR /app/apps/${PROJECT}

EXPOSE 3000
CMD ["node", "server.js"]
