FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY ["package.json", "/usr/src/app/"]
RUN npm i

COPY . .

EXPOSE 3001
