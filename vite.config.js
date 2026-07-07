import { defineConfig } from "vite";

export default defineConfig({
  // Change this from "/sleepoutsidewdd330/" to "./"
  base: "./", 
  
  root: "src/",

  build: {
    outDir: "../docs",
    rollupOptions: {
      input: {
        main: "src/index.html",
        cart: "src/cart/index.html",
        checkout: "src/checkout/index.html",
        product1: "src/product_pages/cedar-ridge-rimrock-2.html",
        product2: "src/product_pages/marmot-ajax-3.html",
        product3: "src/product_pages/northface-alpine-3.html",
        product4: "src/product_pages/northface-talus-4.html",
      },
    },
  },
});