#!/bin/sh
set -e

# Laravel caches & migrations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
php artisan migrate --force || true
php artisan storage:link || true

# Start NGINX in background
nginx

# Start PHP-FPM in foreground (PID 1)
exec php-fpm -F
