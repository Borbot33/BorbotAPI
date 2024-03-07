FROM node:alpine as base

WORKDIR /BorbotAPI

COPY package.json ./

RUN rm -rf node_modules && npm i

COPY . .

CMD ["node", "."]
