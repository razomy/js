FROM mhart/alpine-node:14
WORKDIR /usr/server
COPY ../.. .
COPY ./web/dist ./public
RUN npm ci --only=production
CMD ["node", "server.js"]
