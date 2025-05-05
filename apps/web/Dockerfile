ARG NODE_VERSION=20
ARG APP_DIRNAME=web
ARG PROJECT=@mm-app/web

# 1. Alpine image
FROM node:${NODE_VERSION}-slim AS slim

# Setup pnpm and turbo on the slim base
FROM slim AS base
RUN corepack enable
RUN npm install -g corepack@latest
RUN npm install turbo@2.5.2 --global
RUN pnpm config set store-dir ~/.pnpm-store

# 2. Prune projects
FROM base AS pruner
ARG PROJECT

WORKDIR /app

# Copy entire repository to prune
COPY . .

# Generate a partial monorepo with a pruned lockfile for the target workspace
RUN turbo prune --scope=${PROJECT} --docker

# 3. Build the project
FROM base AS builder
ARG PROJECT
ARG APP_DIRNAME

ENV CI=true

WORKDIR /app

# Copy lockfile and package.json from pruned monorepo
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/full/ ./
COPY ./apps/${APP_DIRNAME}/.env ./apps/${APP_DIRNAME}/.env

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --no-frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED=1

# Build the specified project
RUN ls -la
RUN pnpm build --filter=${PROJECT}

# 4. Final image - runner stage to run the application
FROM base AS runner
ARG APP_DIRNAME

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /app

# Copy built artifacts from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_DIRNAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_DIRNAME}/.next/static ./apps/${APP_DIRNAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_DIRNAME}/public ./apps/${APP_DIRNAME}/public

ARG PORT=5000
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["node", "apps/web/server.js"]
# CMD ["ls", "-la", "-R"]