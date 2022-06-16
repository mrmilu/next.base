FROM node:16.15.1

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack enable

RUN yarn

COPY . .

CMD ["yarn", "dev"]