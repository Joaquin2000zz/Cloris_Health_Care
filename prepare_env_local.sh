#!/usr/bin/env bash
sudo apt-get update
sudo apt-get install -y nodejs
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install
npm start
