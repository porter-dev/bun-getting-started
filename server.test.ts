import { afterAll, expect, test } from "bun:test";
import { createServer } from "./server";

const server = createServer(0);

afterAll(() => server.stop());

test("GET / confirms the app is running", async () => {
  const response = await fetch(new URL("/", server.url));

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ message: "Hello from Bun on Porter!" });
});

test("GET /healthz returns 200", async () => {
  const response = await fetch(new URL("/healthz", server.url));

  expect(response.status).toBe(200);
  expect(await response.text()).toBe("ok");
});
