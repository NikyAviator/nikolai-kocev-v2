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

# Copy entrypoint script from file (no heredoc!)
COPY infra/production/Docker/10-render-templates.sh \
     /docker-entrypoint.d/10-render-templates.sh

RUN chmod +x /docker-entrypoint.d/10-render-templates.sh

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
