FROM node:lts

WORKDIR /app

COPY . .
RUN npm install --legacy-peer-deps

EXPOSE 8080
EXPOSE 6006
CMD [ "npm", "run", "storybook" ]