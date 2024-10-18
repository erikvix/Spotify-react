import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), viteBasicSslPlugin()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});