# Bun on Porter

A minimal Bun HTTP server, compiled to a single binary and ready to deploy on Porter.

## What's inside

| Component | Version | Notes |
| --- | --- | --- |
| Bun | 1.4.3 | `Bun.serve` with built in routing, compiled with `bun build --compile` |
| TypeScript | 7.0.2 | Type checking only, Bun runs TypeScript directly |
| Runtime image | debian:13-slim | Runs the compiled binary as a non-root user |

| Method | Path | Response |
| --- | --- | --- |
| GET | `/` | JSON message confirming the app is running |
| GET | `/healthz` | `200 ok`, used by the Porter health check |

## Run locally

```sh
bun install
bun test
bun run start
```

The server listens on `$PORT`, or `3000` when it is not set. Use `bun run dev` to restart on file changes.

With Docker:

```sh
docker build -t bun-getting-started . && docker run -p 3000:3000 bun-getting-started
```

## Deploy on Porter

Porter does not have a Bun buildpack, so this repo builds with the included `Dockerfile`. It runs the tests, compiles the app to a standalone binary, and copies only that binary into a slim runtime image.

### From the dashboard

1. Fork this repo.
2. In https://dashboard.porter.run, create a new app from your GitHub repo.
3. Porter reads `porter.yaml`, builds the Dockerfile, and opens a PR adding a GitHub Actions workflow.
4. Merge the PR. Every push to `main` redeploys the app.

See https://docs.porter.run/applications/deploy/deploy-from-github-repo for details.

### From the CLI

Install the CLI (https://docs.porter.run/cli/installation), then:

```sh
porter auth login
porter apply -f porter.yaml
```

## Configuration

`porter.yaml` defines a single `web` service:

- `build` uses `method: docker` with the root `Dockerfile`.
- `run: /app/server` starts the compiled binary, matching the Dockerfile `CMD`.
- `port: 3000` matches the app's default port.
- `cpuCores: 0.25` and `ramMegabytes: 256` are enough for this app. Raise them as it grows.
- `healthCheck` probes `/healthz`.

| Name | Required | Description |
| --- | --- | --- |
| `PORT` | No | Port to listen on. Defaults to `3000`, which matches `porter.yaml`. |

Full reference: https://docs.porter.run/applications/configuration-as-code/reference

## Learn more

- https://docs.porter.run/getting-started/quickstart
- https://docs.porter.run/applications/configuration-as-code/overview
- https://docs.porter.run/applications/configure/environment-groups
- https://docs.porter.run/addons/datastores
- https://docs.porter.run/preview-environments/overview
- https://github.com/porter-dev/starters
