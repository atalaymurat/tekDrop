FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g nodemon
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

USER node
 

CMD ["npm", "run", "start"]
