import { createServerFn } from "@tanstack/react-start";

const PY_BASE = process.env.SERVER_URL || "http://127.0.0.1:8000";

const login = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data: { username, password } }) => {
    const res = await fetch(`${PY_BASE}/auth/garmin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Garmin login failed: ${res.status} ${text}`);
    }
    return (await res.json()) as {
      sessionId: string;
      expiresInSeconds: number;
    };
  });

export { login };
