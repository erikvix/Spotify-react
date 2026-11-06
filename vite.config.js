import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), viteBasicSslPlugin()],

  // Spotify rejects "localhost" redirect URIs as insecure; serve on the
  // loopback IP so the default redirect (origin + /home) is accepted.
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});