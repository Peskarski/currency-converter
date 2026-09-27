import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, type ProxyOptions } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.VITE_CURRENCY_BEACON_API_KEY;

  if (!apiKey) {
    throw new Error("CURRENCY_BEACON_API_KEY is missing. Copy .env.example to .env and set it.");
  }

  const apiProxy: Record<string, ProxyOptions> = {
    "/api": {
      target: "https://api.currencybeacon.com",
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, "/v1"),
      headers: { Authorization: `Bearer ${apiKey}` },
    },
  };

  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
      },
    },
    server: { proxy: apiProxy },
    preview: { proxy: apiProxy },
  };
});
