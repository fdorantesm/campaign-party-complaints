FROM node:14-alpine

RUN npm i -g @nestjs/cli

USER node
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm build

ENTRYPOINT [ "npm", "run", "start:dev"]
