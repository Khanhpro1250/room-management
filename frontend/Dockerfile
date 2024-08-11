FROM node:16.20.0 AS node-build
WORKDIR /app

COPY package.json ./

RUN yarn
COPY . .
RUN yarn run build

FROM node:16.20.0 AS frontend
WORKDIR /app
RUN npm install -g serve
COPY --from=node-build /app/build /app
EXPOSE 3000
ENTRYPOINT ["/bin/bash", "-c", "serve -s /app"]