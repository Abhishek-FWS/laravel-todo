#!/bin/sh
set -e

# Laravel cache & migrations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
php artisan migrate --force || true
php artisan storage:link || true

# Start Nginx + PHP-FPM
exec php-fpm -F