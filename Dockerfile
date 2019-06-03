FROM node:12-alpine

RUN npm install -g yarn

# Needed for usermod
RUN apk add shadow

RUN mkdir /sdsa-checkin-kiosk
RUN chown -R node /sdsa-checkin-kiosk
RUN usermod -d /sdsa-checkin-kiosk node

USER node
WORKDIR /sdsa-checkin-kiosk
