# -------------------------
# Stage 1: Dependencies
# -------------------------
FROM oven/bun:1.3.11@sha256:0733e50325078969732ebe3b15ce4c4be5082f18c4ac1a0f0ca4839c2e4e42a7 AS deps
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun ci


# -------------------------
# Stage 2: Build
# -------------------------
FROM oven/bun:1.3.11@sha256:0733e50325078969732ebe3b15ce4c4be5082f18c4ac1a0f0ca4839c2e4e42a7 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

ARG CF_CACHE_PURGE_API_KEY
ARG CF_CACHE_PURGE_ZONE_ID
RUN if [ -n "$CF_CACHE_PURGE_API_KEY" ] && [ -n "$CF_CACHE_PURGE_ZONE_ID" ]; then \
  echo "Purging Cloudflare cache for sancho.sg-app.com..." && \
  CF_CACHE_PURGE_API_KEY=$CF_CACHE_PURGE_API_KEY CF_CACHE_PURGE_ZONE_ID=$CF_CACHE_PURGE_ZONE_ID bun -e " \
    const purgeRes = await fetch('https://api.cloudflare.com/client/v4/zones/' + process.env.CF_CACHE_PURGE_ZONE_ID + '/purge_cache', { \
      method: 'POST', \
      headers: { 'Authorization': 'Bearer ' + process.env.CF_CACHE_PURGE_API_KEY, 'Content-Type': 'application/json' }, \
      body: JSON.stringify({ hosts: ['sancho.sg-app.com'] }) \
    }); \
    if (purgeRes.ok) console.log('Cache purged successfully'); \
    else console.error('Failed to purge cache:', await purgeRes.text()); \
  "; \
fi

# -------------------------
# Stage 3: Production Runner
# -------------------------
FROM oven/bun:1.3.11@sha256:0733e50325078969732ebe3b15ce4c4be5082f18c4ac1a0f0ca4839c2e4e42a7 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# --chown avoids a separate RUN chown layer
COPY --chown=bun:bun --from=builder /app/out ./out
COPY --chown=bun:bun --from=builder /app/server.js ./server.js

USER bun
EXPOSE 3000
CMD ["bun", "server.js"]