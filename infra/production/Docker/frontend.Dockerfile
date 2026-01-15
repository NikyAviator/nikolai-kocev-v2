# --- Build step ---
FROM node:current-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Runtime step ---
FROM nginx:alpine
# envsubst for rendering templates at container start
RUN apk add --no-cache bash gettext

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

# Template -> we will render it on startup
COPY infra/production/Docker/nginx.prod.conf.template /etc/nginx/templates/app.conf.template

# Default entrypoint in official nginx image will execute /docker-entrypoint.d/*.sh
# Render template to /etc/nginx/conf.d/default.conf before nginx starts
COPY --chown=root:root <<'EOF' /docker-entrypoint.d/10-render-templates.sh
#!/usr/bin/env sh
set -eu
: "${BACKEND_BASE:?BACKEND_BASE is required}"
: "${API_SHARED_SECRET:?API_SHARED_SECRET is required}"
envsubst '${BACKEND_BASE} ${API_SHARED_SECRET}' \
  < /etc/nginx/templates/app.conf.template \
  > /etc/nginx/conf.d/default.conf
EOF

RUN chmod +x /docker-entrypoint.d/10-render-templates.sh

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
