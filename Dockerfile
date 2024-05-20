FROM node:16-buster

# Установка Python, make, g++ и libvips-dev для сборки sharp
RUN apt-get update && apt-get install -y python3 make g++ libvips-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 5000
CMD ["node", "dist/src/main.js"]
