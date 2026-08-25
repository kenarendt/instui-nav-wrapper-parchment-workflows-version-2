import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// Dev-server only: index.html in the project root is the built, self-contained
// page. Redirect "/" to the live dev entry so `npm run dev` never serves that
// stale build by mistake.
const devRootRedirect = {
  name: "dev-root-redirect",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/" || req.url === "/index.html") {
        res.writeHead(302, { Location: "/dev.html" });
        res.end();
        return;
      }
      next();
    });
  },
};

// The dev entry lives in dev.html so the built, self-contained page can own
// index.html. base: "./" keeps any URLs relative; viteSingleFile inlines all
// JS and CSS into a single HTML file that runs straight from the file://
// protocol (no local server needed).
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile(), devRootRedirect],
  server: { open: "/dev.html" },
  build: {
    rollupOptions: { input: resolve(root, "dev.html") },
  },
});
