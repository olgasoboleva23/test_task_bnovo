FROM node:19-alpine

RUN mkdir /home/app
WORKDIR /home/app

COPY . .

RUN npm cache clean --force
RUN npm install

CMD ["npm", "run", "dev"]
