import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 5174,
      protocol: "ws",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5058",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
