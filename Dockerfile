FROM node:23.2.0-alpine3.20

WORKDIR /app
COPY ./src .
EXPOSE 3001

CMD ["npm", "run", "dev"]
