#!/bin/bash
. /opt/nvm/nvm.sh
cd /var/lib/museum/backend/
nvm use 8.11.3
cp .env.production .env
npm install joi
npm install --production
node src/main.js
