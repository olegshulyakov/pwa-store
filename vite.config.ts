import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  publicDir: "public",
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeManifestIcons: true,
      manifestFilename: "manifest.json",
      manifest: {
        name: "Does It PWA",
        short_name: "Does It PWA",
        description: "List of compatable Progressive Web Applications",
        start_url: ".",
        orientation: "any",
        display: "standalone",
        background_color: "#0046fa",
        theme_color: "#0046fa",
        lang: "en",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        categories: ["store", "productivity", "utilities"],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: (options) => {
              return ["image"].includes(options.request.destination);
            },
            handler: "CacheFirst",
            options: {
              cacheName: "assets",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
