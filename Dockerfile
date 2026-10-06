FROM node:24-alpine
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 3001
CMD ["sh", "-c", "npx prisma db init && npx prisma db migrate --advance-ref db && npm start"]