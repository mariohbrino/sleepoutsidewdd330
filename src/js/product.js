import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

// set the data source
const dataSource = new ProductData("tents");

// get ID from URL
const productId = getParam("product");

// the class instance
const product = new ProductDetails(productId, dataSource);

// handle add to cart now.
product.init();
