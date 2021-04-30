FROM node:14-alpine

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000 -g

COPY package.json .
COPY yarn.lock .

RUN yarn global add @nestjs/cli
RUN yarn install
RUN yarn build

RUN rm -rf /usr/src/app/node_modules
RUN yarn install --production

COPY . .

CMD [ "yarn", "start:prod" ]
