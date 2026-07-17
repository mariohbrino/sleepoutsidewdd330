HEAD;
// src/js/product.js

import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
origin / main;

// 1. Get the product ID from the URL
const productId = getParam("product");

// 2. Create an instance of the ProductData class
const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

HEAD;
// 3. Create an instance of the ProductDetails class
const product = new ProductDetails(productId, dataSource);

// 4. Initialize the page
loadHeaderFooter();
origin / main;
product.init();
