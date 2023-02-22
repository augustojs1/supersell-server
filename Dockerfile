FROM node:16-bullseye-slim

WORKDIR /usr/app

COPY package.json ./

COPY prisma ./

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start"]
