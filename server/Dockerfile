FROM node:lts-alpine

RUN mkdir /home/app
WORKDIR /home/app

COPY . .

RUN npm cache clean --force
RUN npm install

CMD [ "node", "server.js" ]
