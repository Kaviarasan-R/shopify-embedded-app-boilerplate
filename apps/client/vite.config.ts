// @ts-nocheck
import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config({ path: "../../.env" });

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.SERVER_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.SHOPIFY_APP_URL
  ? process.env.SHOPIFY_APP_URL?.replace(/https?:\/\//, "")
  : "localhost";

let hmrConfig: object;

if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
    serverInitialState: () => null,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: parseInt(process.env.CLIENT_PORT),
    clientPort: 443,
    serverInitialState: () => null,
  };
}

const isNgrokUrl = process.env.SHOPIFY_APP_URL?.includes("ngrok");

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
      SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL,
      SHOPIFY_APP_ORIGIN: process.env.SHOPIFY_APP_URL?.replace(
        /https:\/\//,
        ""
      ),
    },
  },
  server: {
    host: "localhost",
    port: process.env.CLIENT_PORT,
    hmr: hmrConfig,
    proxy: {
      ...(isNgrokUrl
        ? { "^/(/|(\\?.*)?$)": proxyOptions }
        : { "^(/|(\\?.*)?$)": proxyOptions }),
      ...(isNgrokUrl
        ? { "^/api(/|(\\?.*)?$)": proxyOptions }
        : { "^api(/|(\\?.*)?$)": proxyOptions }),
    },
  },
  build: {
    outDir: "../../dist/client",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
