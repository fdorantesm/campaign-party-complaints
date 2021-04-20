FROM node:14

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000 -g

COPY package.json .
COPY yarn.lock .

RUN yarn global add @nestjs/cli
RUN yarn install

COPY . .

# COPY src src
# COPY test test
# COPY nest-cli.json .
# COPY tsconfig.json .
# COPY tsconfig.build.json .

RUN yarn build
