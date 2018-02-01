FROM node:carbon

WORKDIR /usr/app/

COPY package*.json ./
RUN npm install --only=production

COPY dist dist

EXPOSE 8080

CMD [ "node", "dist/index.js" ]