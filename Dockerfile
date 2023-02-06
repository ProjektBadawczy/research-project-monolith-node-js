FROM node:18

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["nodemon", "index.ts"]