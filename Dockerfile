# Stage 1
FROM node:16-alpine3.14 as builder

WORKDIR /home/node
ADD . .

RUN yarn install

# Stage 2
FROM node:16-alpine3.14

WORKDIR /home/node
COPY --chown=node:node --from=builder /home/node .

USER node
HEALTHCHECK  --start-period=10s --interval=1m --timeout=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080 || exit 1

ENV HOST 0.0.0.0

EXPOSE 8080

CMD ["yarn", "start"]