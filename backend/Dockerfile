FROM node:alpine

ENV PORT=8080

WORKDIR /actionhero

COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

CMD ["node", "./dist/server.js"]
EXPOSE $PORT