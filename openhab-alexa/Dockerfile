#FROM node:carbon
FROM arm32v7/node

WORKDIR /usr/app/

COPY package*.json ./
RUN npm install --only=production

COPY dist dist

EXPOSE 8080

CMD [ "node", "dist/bundle.js" ]