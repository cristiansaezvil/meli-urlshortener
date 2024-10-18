FROM node:16

RUN apt-get update && apt-get install -y redis-server

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

CMD redis-server --daemonize yes && npm run start:prod
