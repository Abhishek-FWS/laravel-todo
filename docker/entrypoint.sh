#!/bin/sh
set -e

# Copy the .env file if it doesn't exist (assuming environment variables are injected or .env is mounted)
# But typically for Coolify, env vars are injected at runtime.
# If using file-based env, we might need:
# if [ ! -f .env ]; then
#     cp .env.example .env
# fi

# run artisan commands
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in background
php-fpm -D

# Start Nginx in foreground
nginx -g "daemon off;"
