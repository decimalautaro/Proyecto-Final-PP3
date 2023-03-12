FROM node:alpine3.14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install glob rimraf

RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

COPY . .
