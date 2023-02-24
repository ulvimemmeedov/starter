FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD [ "node", "src/bin/www.js" ]

ENTRYPOINT [ "node", "src/bin/www.js" ]
