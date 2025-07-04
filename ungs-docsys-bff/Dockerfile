FROM node:22.14.0

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@11.2.0 && npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]