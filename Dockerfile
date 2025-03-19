FROM node:22

RUN apt-get update && apt-get install -y redis-server

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 8080 6379

CMD redis-server --daemonize yes && npm start
