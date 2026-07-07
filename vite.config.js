import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// base: "./" keeps any URLs relative; viteSingleFile inlines all JS and CSS
// into a single dist/index.html that runs directly from the file:// protocol
// (no local server needed).
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
});
