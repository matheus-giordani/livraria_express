FROM node:16.18-alpine

WORKDIR /usr/app
VOLUME /usr/app
COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 3000

