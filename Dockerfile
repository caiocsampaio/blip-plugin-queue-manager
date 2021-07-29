FROM node:16-alpine3.11

COPY . /app

WORKDIR /app

RUN yarn

ENV PORT=80

EXPOSE 80

ENTRYPOINT [ "yarn" ]

CMD ["start"]