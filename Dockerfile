FROM node:23.10.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]