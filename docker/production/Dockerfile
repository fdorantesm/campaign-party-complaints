FROM node:14-alpine

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000 -g

COPY package.json .
COPY yarn.lock .

RUN yarn global add @nestjs/cli nexe
RUN yarn install

COPY . .

RUN yarn build
RUN yarn postbuild

RUN rm -rf src dist node_modules

CMD [ "yarn", "start" ]
