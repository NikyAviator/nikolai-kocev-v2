#!/usr/bin/env sh
set -eu
: "${BACKEND_BASE:?BACKEND_BASE is required}"
: "${API_SHARED_SECRET:?API_SHARED_SECRET is required}"
envsubst '${BACKEND_BASE} ${API_SHARED_SECRET}' \
  < /etc/nginx/app.conf.template \
  > /etc/nginx/conf.d/default.conf