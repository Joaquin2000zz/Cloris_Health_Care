#!/usr/bin/env bash
nvm install stable
nvm alias default stable
npm install --save express
npm run build
read -p "username:" project
gcloud config set project $project
gcloud app deploy app.yaml
