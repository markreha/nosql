FROM node:10.20.1-alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
RUN npm --global install nodemon

VOLUME /usr/src/app
EXPOSE 3000

CMD ["npm", "run", "start"]