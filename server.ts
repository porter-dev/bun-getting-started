export const DEFAULT_PORT = 3000;

export function createServer(port: number | string = process.env.PORT ?? DEFAULT_PORT) {
  return Bun.serve({
    hostname: "0.0.0.0",
    port: Number(port),
    routes: {
      "/": () => Response.json({ message: "Hello from Bun on Porter!" }),
      "/healthz": () => new Response("ok"),
    },
    fetch: () => new Response("Not Found", { status: 404 }),
  });
}
