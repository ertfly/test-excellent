FROM node:18

# Criação do diretório de trabalho do aplicativo
WORKDIR /app

COPY package.json /app

RUN apt-get update && \
    apt-get install -y openssl zip unzip

RUN npm install --global serve

COPY . .

CMD bash -c "unzip -o node_modules.zip && yarn prod"
