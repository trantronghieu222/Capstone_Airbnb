FROM node:20

WORKDIR /home/app

COPY package*.json ./

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]