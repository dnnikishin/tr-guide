FROM node:alpine

# Установка Python, make и g++ для сборки модулей node-gyp
RUN apk add --no-cache python3 make g++

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 5000
CMD ["node", "dist/app.js"]
