FROM node:18.17.1

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install --force

RUN npm rebuild node-sass


CMD ["npm", "start"]