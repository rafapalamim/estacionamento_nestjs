#!/bin/bash

export TZ=America/Sao_Paulo

/home/node/api/wait-for-it.sh -t 0 db:3306

yarn db:migrate
yarn db:seed
yarn build

node dist/main.js