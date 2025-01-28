# Builder
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

RUN npm run build
RUN npm prune --production

# start
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 80

CMD ["npm", "start"]