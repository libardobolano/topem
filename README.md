# Prueba tecnica topem

## Tecnologias
***
### Backend
* php 8.1
* Laravel 9
* docker
* mysql-8

### frontend
* node  14.17.5
* vue 5.0.08

## Installation backend
***
* docker compose build
* docker compose up -d
* docker compose exec composer install
* docker compose exec app php artisan migrate:fresh --seed
* docker compose exec app php artisan passport:install
* docker compose exec app key:generate


## Installation frontend
***
* npm install


## usage
