import { defineConfig } from "vite";

export default defineConfig({
  // This ensures GitHub Pages maps your styles, layout, and images to your subfolder path
  base: "/sleepoutsidewdd330/", 
  
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        // Standard relative paths from the project root folder
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