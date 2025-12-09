# Stage 1: Build Frontend Assets
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Application
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    icu-dev

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for caching
COPY composer.json composer.lock ./

# Install dependencies
# Install dependencies without running scripts (depends on artisan which isn't copied yet)
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Copy application files
COPY . .

# Run composer scripts (now that artisan is copied)
RUN composer dump-autoload --optimize

# Copy built assets from build stage
COPY --from=build /app/public/build ./public/build

# Setup Nginx
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Setup PHP-FPM
RUN rm -rf /usr/local/etc/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/zzz-custom.conf

# Setup Entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port
EXPOSE 80

# Start
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
