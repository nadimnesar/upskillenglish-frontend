FROM node:20.10.0
LABEL authors="nadimnesar"

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]