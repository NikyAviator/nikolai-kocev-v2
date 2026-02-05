# Dockerfile for DEVELOPMENT
FROM node:current-alpine as build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# --- Runtime (Nginx) ---
FROM nginx:alpine

# 1. Serve built frontend
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/frontend/dist .

# 2. Template - nginx will auto-envsubst to /etc/nginx/conf.d/default.conf
COPY infra/production/Docker/nginx.prod.template.conf /etc/nginx/templates/default.conf.template

# 3. Expose the same port used by the service
EXPOSE 8080

# 4. Use the default entrypoint + CMD so envsubst runs automatically
CMD ["nginx", "-g", "daemon off;"]
