// @ts-nocheck
import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: process.env.CLIENT_PORT,
  },
  build: {
    outDir: "../../dist/client",
  },
  define: {
    "process.env": {
      CLIENT_PORT: process.env.CLIENT_PORT,
      SERVER_PORT: process.env.SERVER_PORT,
      HOST_URL: process.env.HOST_URL,
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
