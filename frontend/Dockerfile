FROM node:18-alpine AS build
WORKDIR /app

# ==== ĐỔI PROXY Ở ĐÂY ====
ENV http_proxy=http://rb-proxy-apac.bosch.com:8080 \
    https_proxy=http://rb-proxy-apac.bosch.com:8080 \
    HTTP_PROXY=http://rb-proxy-apac.bosch.com:8080 \
    HTTPS_PROXY=http://rb-proxy-apac.bosch.com:8080 \
    no_proxy=localhost,127.0.0.1 \
    NO_PROXY=localhost,127.0.0.1

COPY package.json ./
RUN npm install --legacy-peer-deps && \
    npm install ajv@^8 --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]

