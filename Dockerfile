FROM mcr.microsoft.com/playwright:v1.39.0-jammy

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm ci

ENTRYPOINT ["./docker-entrypoint.sh"]