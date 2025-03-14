FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src 

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "src/index.js"]