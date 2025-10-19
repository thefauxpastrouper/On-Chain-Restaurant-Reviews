import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {
            compilationMode: "annotation",
            target: "18",
          }]
        ]
      }
    })
  ],
  build: {
    // Production optimizations
    minify: mode === "production" ? "esbuild" : false,
    sourcemap: mode !== "production",
    rollupOptions: {
      output: {
        // Optimize chunk splitting
        manualChunks: {
          vendor: ["react", "react-dom"],
          solana: ["@solana/web3.js", "@coral-xyz/anchor"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-popover", "@radix-ui/react-select"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
    // Enable tree shaking
    treeshake: true,
  },
  // Environment-specific configurations
  define: {
    __DEV__: mode === "development",
    __PROD__: mode === "production",
    global: "globalThis",
  },
  // Load environment variables
  envPrefix: "",
  // Add polyfills for Node.js globals
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
    },
  },
  // Configure polyfills
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@solana/web3.js",
      "@coral-xyz/anchor",
      "react-router-dom",
      "@tanstack/react-query",
      "buffer",
    ],
  },
}));
