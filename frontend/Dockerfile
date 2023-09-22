FROM node:18-alpine as build

WORKDIR ./app/frontend

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./

RUN npm ci

COPY --chown=node:node ./src src/
COPY --chown=node:node ./public public/

RUN npm run build

FROM node:18-alpine

WORKDIR ./app/frontend

COPY --from=build --chown=node:node ./app/frontend/build/ ./build/

COPY --chown=node:node ./server ./server/

RUN cd server && npm ci

EXPOSE 8080

USER node

CMD [ "node", "./server/index.js" ]