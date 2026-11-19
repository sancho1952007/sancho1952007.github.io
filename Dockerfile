# -------------------------
# Stage 1: Dependencies
# -------------------------
FROM oven/bun:1.4.5@sha256:3aa040e5445efa09d75bb428a64ba50db13e2b3ac9b6b0c7f145615f62b2ee18 AS deps
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun ci


# -------------------------
# Stage 2: Build
# -------------------------
FROM oven/bun:1.4.5@sha256:3aa040e5445efa09d75bb428a64ba50db13e2b3ac9b6b0c7f145615f62b2ee18 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build



# -------------------------
# Stage 3: Production Runner
# -------------------------
FROM oven/bun:1.4.5@sha256:3aa040e5445efa09d75bb428a64ba50db13e2b3ac9b6b0c7f145615f62b2ee18 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# --chown avoids a separate RUN chown layer
COPY --chown=bun:bun --from=builder /app/out ./out
COPY --chown=bun:bun --from=builder /app/server.js ./server.js

# Copy the cache purge script
COPY --chown=bun:bun cache-purge.js ./cache-purge.js

USER bun
EXPOSE 3000
CMD ["sh", "-c", "bun cache-purge.js && exec bun server.js"]