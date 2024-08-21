FROM node:21 as build
WORKDIR /app
COPY package*.json ./
COPY package-lock*.json ./
COPY tsconfig*.json ./
COPY tsconfig.build*.json ./
COPY prisma ./
RUN npm install
RUN npm install -g prisma
COPY . .
RUN prisma generate
RUN npm run build
FROM node:21
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
EXPOSE 3000
ENV NODE_ENV=env
ENV TZ=America/Bogota
CMD [ "npm", "run", "start:prod" ]