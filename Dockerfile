FROM oven/bun:1.4.3 AS build
WORKDIR /src
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun test && bun run build

FROM debian:13-slim
RUN useradd --system --uid 10001 --no-create-home app
WORKDIR /app
COPY --from=build /src/app /app/server
USER app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["/app/server"]
