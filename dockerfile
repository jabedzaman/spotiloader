FROM node:18

WORKDIR /usr/src/app

ARG SPOTIFY_CLIENT_ID
ARG SPOTIFY_CLIENT_SECRET
ARG API_KEY

ENV SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET
ENV API_KEY=$API_KEY

COPY package*.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build:api

CMD [ "yarn", "start:api:prod" ]