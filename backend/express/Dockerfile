FROM node:18-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -g nodemon

COPY . .

ENV NODE_ENV=development

EXPOSE 4000

CMD ["nodemon", "src/server.js"]
