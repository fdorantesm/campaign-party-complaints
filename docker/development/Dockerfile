FROM node:14-alpine

RUN yarn global add @nestjs/cli
RUN mkdir -p /home/node

WORKDIR /home/node

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install

USER node

RUN mkdir app

USER root
# COPY --chown=node:node . ./app/

# RUN ln -s ./node_modules ./app/
RUN chown node:node -R node_modules
RUN mkdir -p app/node_modules
RUN chown node:node -R app
# RUN cp -r node_modules/* ./app/node_modules
COPY --chown=node:node . ./app/
# RUN ln -s node_modules/* app/node_modules/

RUN sh /home/node/app/scripts/modules.sh

WORKDIR /home/node/app

USER node


ENTRYPOINT [ "yarn", "start:dev"]
