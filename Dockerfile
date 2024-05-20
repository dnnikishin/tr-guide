FROM node:alpine

WORKDIR /home/node/app
COPY dist/ /home/node/app
RUN npm i joi
RUN npm i --production

CMD ["node", "src/main.js"]

EXPOSE 5000
