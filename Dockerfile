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

# Create a script to purge cache at runtime
RUN echo " \n\
if (process.env.CF_CACHE_PURGE_API_KEY && process.env.CF_CACHE_PURGE_ZONE_ID) { \n\
  console.log('Purging Cloudflare cache for sancho.sg-app.com...'); \n\
  fetch('https://api.cloudflare.com/client/v4/zones/' + process.env.CF_CACHE_PURGE_ZONE_ID + '/purge_cache', { \n\
    method: 'POST', \n\
    headers: { 'Authorization': 'Bearer ' + process.env.CF_CACHE_PURGE_API_KEY, 'Content-Type': 'application/json' }, \n\
    body: JSON.stringify({ hosts: ['sancho.sg-app.com'] }) \n\
  }).then(async res => { \n\
    if (res.ok) console.log('Cache purged successfully'); \n\
    else console.error('Failed to purge cache:', await res.text()); \n\
  }).catch(err => console.error('Error purging cache:', err)); \n\
} \n\
" > /app/purge.js

USER bun
EXPOSE 3000
CMD ["sh", "-c", "bun /app/purge.js && exec bun server.js"]