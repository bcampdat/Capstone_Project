import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    global: "window", // https://vitejs.dev/guide/env-and-mode.html#env-files
  },
});
