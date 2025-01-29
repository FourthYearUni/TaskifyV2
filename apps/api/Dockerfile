FROM public.ecr.aws/lts/ubuntu:20.04_stable

ENV DEBIAN_FRONTEND=noninteractive


WORKDIR /opt/app

COPY ./setup.sh /usr/local/bin/setup.sh
RUN chmod +x /usr/local/bin/setup.sh

RUN apt update

RUN apt install -y \
    lsb-release  \
    ca-certificates  \
    gnupg2 \
    libmysqlclient-dev \
    software-properties-common \
    default-mysql-client \
    && apt clean

RUN add-apt-repository ppa:ondrej/php


RUN apt-get install -y \
    libzip-dev \
    unzip \
    curl \
    git \
    php8.2 \
    php8.2-cli \
    php8.2-fpm \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-zip \
    php8.2-mysql \
    php8.2-pdo \
    php8.2-pdo-mysql \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN npm install
RUN composer install
# RUN php artisan migrate

EXPOSE 8000

ENTRYPOINT ["setup.sh"]