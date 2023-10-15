FROM node:18

WORKDIR /usr/src/app

ARG SPOTIFY_CLIENT_ID
ARG SPOTIFY_CLIENT_SECRET
ARG API_KEY
ARG APP_PORT


ENV SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET
ENV API_KEY=$API_KEY
ENV APP_PORT=$APP_PORT

COPY package*.json yarn.lock tsconfig.json ./
RUN mkdir ./packages/api
COPY packages/api/package*.json tsconfig.json ./packages/api/

RUN yarn

COPY . .

RUN yarn build:api

EXPOSE $APP_PORT

CMD [ "yarn", "start:api:prod" ]