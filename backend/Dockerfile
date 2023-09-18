FROM node:18-alpine as build

ARG db_url
ENV DATABASE_URL=$db_url

WORKDIR ./app/backend

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY --chown=node:node . .

RUN npm run build

FROM node:18-alpine

WORKDIR ./app/backend

COPY --chown=node:node --from=build ./app/backend/node_modules ./node_modules
COPY --chown=node:node --from=build ./app/backend/package*.json ./
COPY --chown=node:node --from=build ./app/backend/dist ./dist
COPY --chown=node:node --from=build ./app/backend/prisma ./prisma

EXPOSE 3000

USER node

CMD [ "npm", "run", "start:prisma" ]