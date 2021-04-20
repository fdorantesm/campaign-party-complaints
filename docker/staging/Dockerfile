FROM node:14-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn config set network-timeout 600000 -g
RUN yarn global add @nestjs/cli

RUN yarn install

COPY --chown=node:node .env .
COPY --chown=node:node src .
COPY --chown=node:node nest-cli.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node tsconfig.build.json .

RUN yarn build
# RUN yarn create rimraf node_modules
# RUN yarn install --production

ENTRYPOINT [ "yarn", "start:prod" ]
