# Use an official Node LTS runtime as a parent image
FROM node:18.10-alpine as base
LABEL maintainer="jbc@akrops.com"

RUN mkdir -p /home/node/app
# Copying package files first to avoid installing dependencies unless layer changes
COPY ["package.json", "package-lock.json", "/home/node/app/"]
WORKDIR /home/node/app
RUN npm i
COPY . /home/node/app
RUN chown -R node:node /home/node/app
USER node:node


FROM base as dev
EXPOSE 8080
CMD npm run srv


FROM base as build
ARG VUE_APP_SB_TOKEN
RUN npm run build


FROM nginx:1.23-alpine as prod
EXPOSE 80
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /home/node/app/dist /usr/share/nginx/html
