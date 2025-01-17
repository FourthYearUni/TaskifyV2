#!/bin/sh
php artisan key:generate
php artisan migrate

docker build -t taskify/api:v2.0.0 .