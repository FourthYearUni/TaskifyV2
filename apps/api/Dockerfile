FROM php:8.2-apache

WORKDIR /opt/app

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    curl \
    git \
    && docker-php-ext-install pdo pdo_mysql zip \
    && docker-php-ext-enable pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN npm install
RUN composer install


EXPOSE 8000

ENTRYPOINT composer run dev