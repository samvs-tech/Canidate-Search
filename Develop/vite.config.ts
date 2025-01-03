import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./env",
  plugins: [react()],
  server: {
    port: process.env.PORT || 4371, // Use the Render-provided port or fallback to 3000
    host: '0.0.0.0', // Listen on all network interfaces
  },
  preview: {
    port: process.env.PORT || 4371, // Same for preview mode
    host: '0.0.0.0',
  },
});