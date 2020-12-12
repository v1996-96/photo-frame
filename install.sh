#!/bin/bash

# Устанавливаем менеджер процессов
npm ls -g pm2 || npm install pm2@latest -g;

# Подтягиваем зависимости
cd ./client && npm install

cd ../server && npm install
