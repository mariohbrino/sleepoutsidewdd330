import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env file from src directory
  const env = loadEnv(mode, resolve(__dirname, "src"), "");

  return {
    root: "src/",

    base: env.VITE_BASE_URL || "/",

    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          cart: resolve(__dirname, "src/cart/index.html"),
          checkout: resolve(__dirname, "src/checkout/index.html"),
          product: resolve(__dirname, "src/product_pages/index.html"),
          product_listing: resolve(__dirname, "src/product_listing/index.html"),
        },
      },
    },
  };
});
