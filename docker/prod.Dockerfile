FROM node:16.15.1

WORKDIR /app

COPY ./app/package.json ./app/yarn.lock ./app/.yarnrc.yml ./

RUN corepack enable

RUN yarn

COPY ./app .

RUN yarn graphql

RUN yarn build

CMD ["yarn", "start"]