#!/usr/bin/env sh
 
rm -rf dist
rm $PWD/ansible/roles/server/files/docker-compose.yaml
rm $PWD/ansible/roles/server/files/init.sql
 
npm run build
cp .env dist
cp .env.production dist
cp scripts/start_backend.sh dist
cp package.json dist
cp tsconfig.build.json dist
cp tsconfig.json dist
cp docker-compose.yaml $PWD/ansible/roles/server/files
cp docker/env/app.env $PWD/ansible/roles/server/files
cp docker/env/postgres.env $PWD/ansible/roles/server/files
cp init.sql $PWD/ansible/roles/server/files