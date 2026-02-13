# Dockerfile for PRODUCTION
# --- Build step ---
FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Runtime step ---
FROM nginx:stable-alpine
# envsubst for rendering templates at container start
RUN apk add --no-cache gettext

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy template to a neutral location (not /etc/nginx/templates/)
COPY infra/production/Docker/nginx.prod.template.conf /etc/nginx/app.conf.template

# Inject env vars into the nginx config template at container start
COPY --chown=root:root <<'EOF' /docker-entrypoint.d/10-render-templates.sh
#!/usr/bin/env sh
set -eu
: "${BACKEND_BASE:?BACKEND_BASE is required}"
: "${API_SHARED_SECRET:?API_SHARED_SECRET is required}"
envsubst '${BACKEND_BASE} ${API_SHARED_SECRET}' \
  < /etc/nginx/app.conf.template \
  > /etc/nginx/conf.d/default.conf
EOF

RUN chmod +x /docker-entrypoint.d/10-render-templates.sh

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
