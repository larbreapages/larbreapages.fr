# Build

FROM node:10.23-alpine AS build

WORKDIR /app

COPY . /app

RUN npm install && npm rebuild node-sass

RUN npm run build

# Production

FROM node:10.23-alpine

COPY --from=build /app/public /app

RUN npm i -g serve

WORKDIR /app

ENV NODE_ENV=production

CMD ["serve","-p", "5000"]

EXPOSE 5000
